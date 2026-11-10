import {productTypes} from './enquiry-options.mjs';
const hex=bytes=>Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
export async function syncEnquiry(env,reference){
 if(!env.ACCRUEHR_ENQUIRY_URL||!env.ACCRUEHR_ENQUIRY_SECRET)return {status:'pending'};
 let url;try{url=new URL(env.ACCRUEHR_ENQUIRY_URL);if(url.protocol!=='https:'&&!(url.protocol==='http:'&&['localhost','127.0.0.1'].includes(url.hostname)))return {status:'pending'};}catch{return {status:'pending'};}
 const row=await env.DB.prepare('SELECT * FROM enquiries WHERE id=?').bind(reference).first();
 if(!row||!productTypes.includes(row.category))return {status:'not_applicable'};
 if(row.portal_state==='sent')return {status:'sent'};
 const now=Date.now();
 const claim=await env.DB.prepare("UPDATE enquiries SET portal_state='sending',portal_attempts=portal_attempts+1,portal_next_attempt_at=? WHERE id=? AND portal_state!='sent' AND portal_attempts<10 AND (portal_state!='sending' OR portal_next_attempt_at<=?)").bind(now+300000,reference,now).run();
 if(!claim.meta.changes)return {status:'pending'};
 const body=JSON.stringify({reference:row.id,name:row.name,email:row.email,phone:row.phone,category:row.category,message:row.message,createdAt:row.created_at,consentAt:row.consent_at});
 const timestamp=String(Math.floor(now/1000));const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(env.ACCRUEHR_ENQUIRY_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 let sent=false;try{
  const signature=hex(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(timestamp+'.'+body)));
  const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','X-Accrue-Timestamp':timestamp,'X-Accrue-Signature':signature},body,signal:AbortSignal.timeout(8000),redirect:'manual'});
  if(response.ok){const result=await response.json();sent=result.received===true&&result.reference===reference;}
 }catch{/* Saved locally; retry with the same reference. */}
 if(sent)await env.DB.prepare("UPDATE enquiries SET portal_state='sent',portal_synced_at=? WHERE id=?").bind(Date.now(),reference).run();
 else await env.DB.prepare("UPDATE enquiries SET portal_state='pending',portal_next_attempt_at=? WHERE id=?").bind(now+Math.min(3600000,60000*2**Math.min(row.portal_attempts,6)),reference).run();
 return {status:sent?'sent':'pending'};
}
export async function syncPendingEnquiries(env){
 const rows=await env.DB.prepare("SELECT id FROM enquiries WHERE category LIKE 'AccrueHR %' AND portal_state!='sent' AND portal_attempts<10 AND portal_next_attempt_at<=? ORDER BY created_at LIMIT 25").bind(Date.now()).all();
 const results=[];for(const row of rows.results)results.push({reference:row.id,...await syncEnquiry(env,row.id)});return results;
}
