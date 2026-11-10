import test from 'node:test';import assert from 'node:assert/strict';import {DatabaseSync} from 'node:sqlite';import {readFileSync,readdirSync} from 'node:fs';import {createHmac} from 'node:crypto';
import {submitEnquiry} from '../../lib/contact.mjs';
import {syncEnquiry} from '../../lib/portal-delivery.mjs';
function fixture(){
 const db=new DatabaseSync(':memory:');
 const dir=new URL('../../drizzle/',import.meta.url);
 for(const f of readdirSync(dir).filter(f=>f.endsWith('.sql')).sort())db.exec(readFileSync(new URL(f,dir),'utf8').replaceAll('--> statement-breakpoint',''));
 const DB={prepare(sql){return {bind(...args){return {
   async first(){return db.prepare(sql).get(...args)},
   async all(){return {results:db.prepare(sql).all(...args)}},
   async run(){return {meta:{changes:db.prepare(sql).run(...args).changes}}}
 };}};}};
 return {db,env:{DB,PUBLIC_SITE_URL:'http://localhost:4183',ACCRUEHR_ENQUIRY_URL:'http://localhost:8081/api/public/website-enquiries',ACCRUEHR_ENQUIRY_SECRET:'local-test-key-not-production-123456789'}};
}

const data={name:'QA Visitor',email:'fixture@example.invalid',phone:'',type:'AccrueHR registration',organization:'Fixture organization',employeeRange:'21–50',message:'Please discuss registration with our team.',consent:'on',website:''};
const request=(body=data,origin='http://localhost:4183')=>new Request('http://localhost:4183/api/enquiries',{method:'POST',headers:{Host:'localhost:4183',Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
const original=globalThis.fetch;
test.afterEach(()=>{globalThis.fetch=original});
test('registration, support and feedback are saved and delivered with signed payloads',async()=>{const {db,env}=fixture();let sent=0;globalThis.fetch=async(url,options)=>{assert.equal(String(url),env.ACCRUEHR_ENQUIRY_URL);assert.equal(options.headers['X-Accrue-Signature'],createHmac('sha256',env.ACCRUEHR_ENQUIRY_SECRET).update(options.headers['X-Accrue-Timestamp']+'.'+options.body).digest('hex'));const e=JSON.parse(options.body);assert.match(e.message,/Fixture organization/);sent++;return Response.json({reference:e.reference,received:true})};for(const type of ['AccrueHR registration','AccrueHR support','AccrueHR feedback']){const response=await submitEnquiry(request({...data,type}),env);assert.equal(response.status,201);assert.equal((await response.json()).portalDelivery.status,'sent')}assert.equal(sent,3);assert.equal(db.prepare("select count(*) as n from enquiries where portal_state='sent'").get().n,3);db.close()});
test('outage retains enquiry and retries the same reference without duplicate rows',async()=>{const {db,env}=fixture();globalThis.fetch=async()=>{throw Error('offline')};const response=await submitEnquiry(request(),env);const result=await response.json();assert.equal(result.portalDelivery.status,'pending');globalThis.fetch=async(_,options)=>Response.json({reference:JSON.parse(options.body).reference,received:true});assert.equal((await syncEnquiry(env,result.reference)).status,'sent');assert.equal(db.prepare('select count(*) as n from enquiries').get().n,1);assert.equal(db.prepare('select portal_attempts as n from enquiries').get().n,2);db.close()});
test('unconfigured portal keeps a durable pending copy',async()=>{const {db,env}=fixture();delete env.ACCRUEHR_ENQUIRY_SECRET;const r=await submitEnquiry(request(),env);assert.equal(r.status,201);assert.equal((await r.json()).portalDelivery.status,'pending');assert.equal(db.prepare('select count(*) as n from enquiries').get().n,1);db.close()});
test('invalid origin, missing consent, short message and missing organization are rejected',async()=>{const {db,env}=fixture();assert.equal((await submitEnquiry(request(data,'https://other.invalid'),env)).status,403);for(const changes of [{consent:''},{message:'a'},{organization:''},{employeeRange:'bad'}])assert.equal((await submitEnquiry(request({...data,...changes}),env)).status,400);assert.equal(db.prepare('select count(*) as n from enquiries').get().n,0);db.close()});
test('ordinary project enquiry does not go to the HR portal',async()=>{const {db,env}=fixture();let sent=false;globalThis.fetch=async()=>{sent=true;throw Error('Unexpected')};const r=await submitEnquiry(request({...data,type:'Web application'}),env);assert.equal(r.status,201);assert.equal((await r.json()).portalDelivery.status,'not_applicable');assert.equal(sent,false);db.close()});
test('fake success acknowledgement is not treated as delivery',async()=>{const {db,env}=fixture();globalThis.fetch=async()=>Response.json({reference:'wrong',received:true});const r=await submitEnquiry(request(),env);assert.equal((await r.json()).portalDelivery.status,'pending');db.close()});
