"""Safe updater: do not claim a complete train performance dataset from a webpage."""
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen

url = 'https://www.avantiwestcoast.co.uk/travel-information/live-train-status'
result = {'checked_at': datetime.now(timezone.utc).isoformat(), 'source': url,
          'source_reachable': False, 'data_status': 'unavailable',
          'message': 'Service-level data not available. No performance statistics calculated.'}
try:
    req = Request(url, headers={'User-Agent': 'HowCrapIsAvantiToday/2.0 (public information availability check)'})
    with urlopen(req, timeout=15) as response:
        result['source_reachable'] = response.status == 200
        result['message'] = ('Official status page reachable; structured service-level data not available.'
                             if result['source_reachable'] else 'Official status page unavailable.')
except Exception:
    result['message'] = 'Official status page could not be reached.'
Path('public/status.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
