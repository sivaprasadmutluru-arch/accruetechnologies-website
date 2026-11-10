import {env} from '@/lib/runtime';
import {adminIdentity,apiJson,sameOrigin} from '@/lib/admin-auth';
import {syncPendingEnquiries} from '@/lib/portal-delivery.mjs';
export async function POST(request:Request){if(!await adminIdentity())return apiJson({error:'Admin access required.'},403);if(!sameOrigin(request))return apiJson({error:'Submit from this website.'},403);await env.DB.prepare("UPDATE enquiries SET portal_state='pending',portal_attempts=0,portal_next_attempt_at=0 WHERE category LIKE 'AccrueHR %' AND portal_state!='sent' AND (portal_state!='sending' OR portal_next_attempt_at<=?)").bind(Date.now()).run();return apiJson({results:await syncPendingEnquiries(env)});}
