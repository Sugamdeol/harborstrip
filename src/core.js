export const MAX_BYTES = 20 * 1024 * 1024;
export const MAX_ENTRIES = 10000;
const methods = new Set(['GET','POST','PUT','PATCH','DELETE','HEAD','OPTIONS','CONNECT','TRACE']);
const protocols = new Set(['HTTP/1.0','HTTP/1.1','HTTP/2','HTTP/2.0','HTTP/3']);
const number = (v, fallback = -1) => typeof v === 'number' && Number.isFinite(v) && v >= -1 && v <= 1e12 ? v : fallback;
const object = v => v && typeof v === 'object' && !Array.isArray(v);
const list = v => Array.isArray(v) ? v : [];
const httpVersion = v => protocols.has(v) ? v : 'HTTP/1.1';
const category = v => {
  if(typeof v !== 'string') return 'application/octet-stream';
  const type=v.split(';')[0].trim().toLowerCase();
  return ['application/json','text/html','text/css','text/plain','application/javascript','text/javascript','image/png','image/jpeg','image/webp','image/svg+xml','font/woff2','video/mp4','audio/mpeg'].includes(type) ? type : 'application/octet-stream';
};
export function parseHar(text) {
  if(new TextEncoder().encode(text).length > MAX_BYTES) throw new Error('This capture exceeds 20 MiB. Export a shorter recording.');
  let data;
  try { data=JSON.parse(text); } catch { throw new Error('Could not read JSON. Export a HAR from your browser Network panel and try again.'); }
  if(!object(data) || !object(data.log) || !Array.isArray(data.log.entries)) throw new Error('Expected a HAR with log.entries. Export a new network capture.');
  if(data.log.entries.length>MAX_ENTRIES) throw new Error('This capture exceeds 10,000 requests. Export a shorter recording.');
  return data;
}
export function sanitizeHar(input, {keepEndpoints=false}={}) {
  if(!object(input) || !object(input.log) || !Array.isArray(input.log.entries)) throw new Error('Expected a HAR with log.entries.');
  if(input.log.entries.length>MAX_ENTRIES) throw new Error('Too many requests. Limit is 10,000.');
  const hosts=new Map(), paths=new Map();
  const receipt={policy:keepEndpoints?'reviewed-endpoints':'strict-aliases',requests:input.log.entries.length,headersRemoved:0,cookiesRemoved:0,bodiesRemoved:0,urlPartsRemoved:0,invalidUrls:0,customFieldsRemoved:0};
  const dates=input.log.entries.map(e=>object(e)&&typeof e.startedDateTime==='string'?Date.parse(e.startedDateTime):NaN).filter(Number.isFinite);
  const base=dates.length?Math.min(...dates):0;
  const countExtras=(obj,known)=>{if(object(obj))receipt.customFieldsRemoved+=Object.keys(obj).filter(k=>!known.includes(k)).length;};
  countExtras(input,['log']);countExtras(input.log,['version','creator','entries','pages']);
  const entries=input.log.entries.map((entry,index)=>{
    if(!object(entry)||!object(entry.request)||!object(entry.response)) throw new Error(`Request ${index+1} is missing request/response objects. Export a new HAR.`);
    const req=entry.request,res=entry.response;
    countExtras(entry,['startedDateTime','time','request','response','timings','cache','pageref','serverIPAddress','connection','comment']);
    countExtras(req,['method','url','httpVersion','cookies','headers','queryString','postData','headersSize','bodySize','comment']);
    countExtras(res,['status','statusText','httpVersion','cookies','headers','content','redirectURL','headersSize','bodySize','comment']);
    receipt.headersRemoved+=list(req.headers).length+list(res.headers).length;
    receipt.cookiesRemoved+=list(req.cookies).length+list(res.cookies).length;
    receipt.bodiesRemoved+=(req.postData!=null?1:0)+(object(res.content)&&res.content.text!=null?1:0);
    let url=`https://unparsed.invalid/request-${index+1}`;
    try{
      const parsed=new URL(typeof req.url==='string'?req.url:'');
      if(!['http:','https:'].includes(parsed.protocol)) throw new Error();
      receipt.urlPartsRemoved+=(parsed.search?1:0)+(parsed.hash?1:0)+(parsed.username||parsed.password?1:0);
      if(keepEndpoints) url=parsed.origin+parsed.pathname;
      else{
        if(!hosts.has(parsed.host))hosts.set(parsed.host,hosts.size+1);
        const key=parsed.origin+parsed.pathname;
        if(!paths.has(key))paths.set(key,paths.size+1);
        url=`https://host-${hosts.get(parsed.host)}.invalid/path-${paths.get(key)}`;
      }
    }catch{receipt.invalidUrls++;}
    const elapsed=typeof entry.startedDateTime==='string'?Date.parse(entry.startedDateTime)-base:0;
    const offset=Number.isFinite(elapsed)&&elapsed>=0?Math.min(elapsed,31536000000):0;
    const timings={};
    for(const key of ['blocked','dns','connect','send','wait','receive','ssl'])timings[key]=number(entry.timings?.[key]);
    const status=number(res.status,0);
    return {
      startedDateTime:new Date(Date.UTC(2000,0,1)+offset).toISOString(),time:number(entry.time,0),
      request:{method:methods.has(req.method)?req.method:'GET',url,httpVersion:httpVersion(req.httpVersion),cookies:[],headers:[],queryString:[],headersSize:number(req.headersSize),bodySize:number(req.bodySize)},
      response:{status:Number.isInteger(status)&&status>=0&&status<=599?status:0,statusText:'',httpVersion:httpVersion(res.httpVersion),cookies:[],headers:[],content:{size:number(res.content?.size,0),mimeType:category(res.content?.mimeType)},redirectURL:'',headersSize:number(res.headersSize),bodySize:number(res.bodySize)},
      cache:{},timings
    };
  });
  const har={log:{version:'1.2',creator:{name:'Harborstrip',version:'0.1.0'},entries}};
  return {har,receipt};
}
export function summary(result){
  const entries=result.har.log.entries;
  return {requests:entries.length,failed:entries.filter(e=>e.response.status===0||e.response.status>=400).length,slowest:Math.max(0,...entries.map(e=>e.time)),bodyBytes:entries.reduce((n,e)=>n+Math.max(0,e.response.bodySize),0)};
}
export function reportMarkdown(result){
  const escape=v=>String(v).replace(/[\r\n|`]/g,' ').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const rows=result.har.log.entries.map((e,i)=>`| ${i+1} | ${e.request.method} | ${escape(e.request.url)} | ${e.response.status} | ${e.time} |`);
  return `# Harborstrip network packet\n\nPolicy: ${result.receipt.policy}\n\nCaptured headers, cookies, payloads and custom fields are omitted. Status, size, relative timing and request order remain. ${result.receipt.policy==='reviewed-endpoints'?'Hostnames and paths remain: review before sharing.':'Hosts and paths use consistent aliases.'}\n\n## Removal receipt\n\n${Object.entries(result.receipt).map(([k,v])=>`- ${k}: ${v}`).join('\n')}\n\n## Requests\n\n| # | Method | Endpoint | Status | Duration (ms) |\n|---|---|---|---|---|\n${rows.join('\n')}\n\nPrepared with Harborstrip. This packet is minimized, not a guarantee of anonymity.\n`;
}
export function reportHtml(result){
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const rows=result.har.log.entries.map((e,i)=>`<tr><td>${i+1}</td><td>${e.request.method}</td><td>${esc(e.request.url)}</td><td>${e.response.status}</td><td>${e.time} ms</td></tr>`).join('');
  return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'"><title>Harborstrip network packet</title><style>body{font:16px system-ui;color:#252824;background:#f5f2eb;margin:32px;line-height:1.6}h1{font-family:Georgia}table{border-collapse:collapse;width:100%}td,th{padding:12px;border-bottom:1px solid #cecfc4;text-align:left;overflow-wrap:anywhere}section{overflow-x:auto}pre{white-space:pre-wrap}footer{margin-top:32px}</style><h1>Outgoing network packet</h1><p>Prepared with Harborstrip. Policy: ${esc(result.receipt.policy)}. ${result.receipt.policy==='reviewed-endpoints'?'Hostnames and paths remain: review before sharing.':'Hosts and paths use consistent aliases.'}</p><p>Captured headers, cookies and payloads are omitted. Timing, status, size and request order remain. This is minimization, not a guarantee of anonymity.</p><h2>Removal receipt</h2><pre>${esc(JSON.stringify(result.receipt,null,2))}</pre><h2>Requests</h2><section><table><thead><tr><th>#</th><th>Method</th><th>Endpoint</th><th>Status</th><th>Duration</th></tr></thead><tbody>${rows}</tbody></table></section><footer>No scripts, remote assets or captured content included.</footer></html>`;
}
