import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHar,sanitizeHar,reportHtml,reportMarkdown,summary,MAX_BYTES} from '../src/core.js';
import {execFileSync} from 'node:child_process';
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const canary='NEVER_EXPORT_THIS_CANARY_ABC123';
const fixture=()=>({[canary]:canary,log:{version:'1.2',pages:[{title:canary}],entries:[{startedDateTime:'2026-07-01T10:10:10Z',time:123,request:{method:'POST',url:`https://user:${canary}@private.test/customer/${canary}?token=${canary}#${canary}`,headers:[{name:canary,value:canary}],cookies:[{name:canary,value:canary}],postData:{text:canary},comment:canary,_unknown:canary},response:{status:503,statusText:canary,headers:[{name:'Set-Cookie',value:canary}],cookies:[{name:canary,value:canary}],content:{text:canary,mimeType:`${canary}/secret`,size:200},redirectURL:canary,bodySize:200,_anything:canary},timings:{wait:100,receive:23,_custom:canary},_extras:canary,serverIPAddress:canary,comment:canary}]}});
test('strict output and all reports contain no source canary',()=>{
  const input=fixture(),before=JSON.stringify(input);const result=sanitizeHar(input);
  for(const out of [JSON.stringify(result),reportHtml(result),reportMarkdown(result)])assert.ok(!out.includes(canary));
  assert.equal(JSON.stringify(input),before);assert.equal(result.har.log.entries[0].response.status,503);assert.equal(result.har.log.entries[0].time,123);
  assert.equal(result.receipt.headersRemoved,2);assert.equal(result.receipt.cookiesRemoved,2);assert.equal(result.receipt.bodiesRemoved,2);
});
test('unknown fields never travel to minimal capture',()=>{
  const out=sanitizeHar(fixture()).har.log.entries[0];assert.deepEqual(Object.keys(out).sort(),['cache','request','response','startedDateTime','time','timings'].sort());
  assert.equal(out.response.content.mimeType,'application/octet-stream');assert.deepEqual(out.request.headers,[]);
});
test('host/path aliases are consistent across repeated requests',()=>{
  const input=fixture();input.log.entries.push(structuredClone(input.log.entries[0]));input.log.entries[1].request.url='https://private.test/customer/other';
  input.log.entries.push(structuredClone(input.log.entries[0]));const entries=sanitizeHar(input).har.log.entries;
  assert.equal(entries[0].request.url,entries[2].request.url);assert.notEqual(entries[0].request.url,entries[1].request.url);assert.match(entries[1].request.url,/host-1/);
});
test('endpoint policy retains only origin/path and warns in reports',()=>{
  const r=sanitizeHar(fixture(),{keepEndpoints:true});const url=r.har.log.entries[0].request.url;
  assert.ok(url.includes('/customer/'));assert.ok(!url.includes('?'));assert.ok(!url.includes('@'));assert.match(reportMarkdown(r),/review before sharing/);
});
test('non-http schemes and corrupt URLs are replaced',()=>{
  for(const url of ['javascript:alert(1)','file:///secret','data:text/html,test','not a url']){const f=fixture();f.log.entries[0].request.url=url;const r=sanitizeHar(f);assert.equal(r.receipt.invalidUrls,1);assert.match(r.har.log.entries[0].request.url,/unparsed.invalid/);}
});
test('non-numeric metadata cannot leak strings; enum fields restricted',()=>{
  const f=fixture();f.log.entries[0].time=canary;f.log.entries[0].request.method=canary;f.log.entries[0].response.status=canary;f.log.entries[0].timings.wait=canary;assert.ok(!JSON.stringify(sanitizeHar(f)).includes(canary));
});
test('real timestamps are normalized, offsets preserved',()=>{
  const f=fixture();f.log.entries.push(structuredClone(f.log.entries[0]));f.log.entries[1].startedDateTime='2026-07-01T10:10:11Z';const e=sanitizeHar(f).har.log.entries;assert.equal(e[0].startedDateTime,'2000-01-01T00:00:00.000Z');assert.equal(Date.parse(e[1].startedDateTime)-Date.parse(e[0].startedDateTime),1000);
});
test('HTML escapes retained URL input and includes no script',()=>{
  const f=fixture();f.log.entries[0].request.url='https://example.test/"/><script>alert(1)</script>';const html=reportHtml(sanitizeHar(f,{keepEndpoints:true}));assert.ok(!html.includes('<script>'));assert.match(html,/default-src 'none'/);
});
test('invalid JSON/structure and limits produce safe errors',()=>{
  for(const input of ['bad','{}','{"log":{"entries":null}}'])assert.throws(()=>parseHar(input));
  assert.throws(()=>parseHar(' '.repeat(MAX_BYTES+1)),/20 MiB/);assert.throws(()=>sanitizeHar({log:{entries:Array(10001).fill({})}}),/10,000/);
  assert.throws(()=>sanitizeHar({log:{entries:[null]}}),/Request 1/);
});
test('empty captures are valid, reproducible and finite',()=>{const f={log:{entries:[]}};assert.deepEqual(summary(sanitizeHar(f)),{requests:0,failed:0,slowest:0,bodyBytes:0});assert.deepEqual(sanitizeHar(f),sanitizeHar(f));});
test('CLI exports with same policy and refuses overwrite',()=>{
  const dir=mkdtempSync(join(tmpdir(),'harborstrip-test-'));try{const input=join(dir,'source.har'),output=join(dir,'out.har');writeFileSync(input,JSON.stringify(fixture()));execFileSync(process.execPath,['scripts/cli.js',input,output]);assert.deepEqual(JSON.parse(readFileSync(output,'utf8')),sanitizeHar(fixture()).har);assert.throws(()=>execFileSync(process.execPath,['scripts/cli.js',input,output],{stdio:'pipe'}));assert.ok(!readFileSync(output,'utf8').includes(canary));}finally{rmSync(dir,{recursive:true,force:true});}
});
