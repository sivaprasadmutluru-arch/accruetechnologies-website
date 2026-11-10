import {env} from '../lib/runtime.ts';
import {syncPendingEnquiries} from '../lib/portal-delivery.mjs';
const results=await syncPendingEnquiries(env);
console.log(JSON.stringify({processed:results.length,sent:results.filter(r=>r.status==='sent').length,pending:results.filter(r=>r.status!=='sent').length}));
