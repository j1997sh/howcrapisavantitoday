import * as cheerio from 'cheerio';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
const SOURCE='https://www.avantiwestcoast.co.uk/travel-information/live-train-status';
async function update(){

 const res=await fetch(SOURCE,{headers:{'User-Agent':'Mozilla/5.0 (compatible; AvantiStatusDashboard/1.0)'},signal:AbortSignal.timeout(15000)});
 if(!res.ok)throw Error('Source returned '+res.status);
 const $=cheerio.load(await res.text());
 $('script,style,nav,header,footer').remove();
 const root=$('main').length?$('main'):$('body');
 const lines=root.text().split(/\n+/).map(x=>x.replace(/\s+/g,' ').trim()).filter(Boolean);
 const start=lines.findIndex(x=>x.includes("Find out if there's any disruption to your train"));
 const end=lines.findIndex((x,i)=>i>start&&(/Track My Train|Download our app/.test(x)));
 const relevant=lines.slice(Math.max(0,start+2),end>start?end:undefined);
 const entries=[];let current=null;
 for(const line of relevant){
  if(/^\d{2}:\d{2} .+ to .+ due \d{2}:\d{2}$/.test(line)){
   if(current)entries.push(current);
   current={title:line,details:[]};
  }else if(current){if(!/^Additional Information:|^We're really sorry|^If your train|^What are my travel options\?/.test(line))current.details.push(line)}
 }
 if(current)entries.push(current);
 const unique=[...new Map(entries.map(e=>[e.title,e])).values()];
 const items=unique.map(e=>{
  const description=e.details.join(' ').slice(0,650);
  const cancelled=/\b(cancelled|canceled|will be cancelled)\b/i.test(description);
  const minutes=[...description.matchAll(/(?:\b(\d+) minutes? late\b|\bdelayed by (\d+) minutes?\b)/gi)].map(m=>Number(m[1]||m[2]));
  return {title:e.title,description,status:cancelled?'cancelled':minutes.length?'delayed':/facilities|catering|toilet/i.test(description)?'facilities':'other',delayMinutes:minutes.length?Math.max(...minutes):0};
 });
 // These are disruption notices, NOT a full timetable. Never interpret absent trains as on time.
 const cache={updatedAt:new Date().toISOString(),source:SOURCE,items,counts:{cancelled:items.filter(x=>x.status==='cancelled').length,delayed:items.filter(x=>x.status==='delayed').length,facilities:items.filter(x=>x.status==='facilities').length},note:'Counts reflect notices shown on the Avanti live-status page, not all scheduled trains. No network-wide punctuality percentage can be calculated from this page.'};
 return cache;
}

try {const data=await update();await mkdir('public/data',{recursive:true});await writeFile('public/data/status.json',JSON.stringify(data,null,2)+'\n');console.log('Updated',data.items.length,'notices')}catch(e){console.error('Source unavailable:',e.message);process.exitCode=1}
