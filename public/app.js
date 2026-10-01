import {parseHar,sanitizeHar,summary,reportHtml,reportMarkdown,MAX_BYTES} from './core.js';
const $=id=>document.getElementById(id);
let source=null,result=null,page=0,revision=0,isDemo=false;
const pageSize=30;
const status=(message,error=false)=>{$('status').textContent=message;$('status').classList.toggle('error',error);};
const sample={log:{version:'1.2',entries:Array.from({length:9},(_,i)=>({
  startedDateTime:new Date(Date.UTC(2026,0,1,0,0,0,i*110)).toISOString(),
  time:[120,87,420,63,2100,92,310,760,44][i],
  request:{method:i===4?'POST':'GET',url:`https://${i>5?'assets':'api'}.demo.invalid/${['app','profile','orders','settings','checkout','health','image','bundle','font'][i]}?token=SYNTHETIC_SECRET_ONLY`,headers:[{name:'Authorization',value:'Bearer SYNTHETIC_DEMO_ONLY'},{name:'X-Demo',value:'illustration'}],cookies:[{name:'demo-session',value:'SYNTHETIC_DEMO_ONLY'}],postData:i===4?{text:'{"email":"synthetic@example.invalid"}'}:undefined},
  response:{status:i===4?503:i===7?404:200,headers:[{name:'Set-Cookie',value:'synthetic'}],content:{text:'SYNTHETIC_PAYLOAD',size:5000,mimeType:i>5?'image/png':'application/json'},bodySize:5000},
  timings:{wait:i===4?1800:30,receive:10},_debug:'SYNTHETIC_CUSTOM'
}))}};
function recompute(){
  if(!source)return;
  result=sanitizeHar(source,{keepEndpoints:document.querySelector('input[name=policy]:checked').value==='endpoints'});
  const stats=summary(result);
  $('results').hidden=false;$('empty').hidden=true;$('reset').disabled=false;
  $('packet-title').textContent=isDemo?'Synthetic demo packet':'Network packet';
  $('count').textContent=stats.requests;$('headers').textContent=result.receipt.headersRemoved;$('bodies').textContent=result.receipt.bodiesRemoved;$('failed').textContent=stats.failed;
  $('policy-warning').hidden=result.receipt.policy==='strict-aliases';
  $('receipt-label').textContent=result.receipt.policy==='strict-aliases'?'Strict aliases applied · Original values omitted':'Host and path retained · Review required';
  const json=JSON.stringify(result.har,null,2);
  $('size').textContent=`${new TextEncoder().encode(json).length.toLocaleString()} outgoing bytes`;
  $('json').textContent=json.slice(0,300000);
  $('preview-note').textContent=json.length>300000?'Preview limited to 300,000 characters. Save the HAR to inspect the complete packet.':'This is the complete outgoing HAR.';
  page=0;render();
}
function render(){
  if(!result)return;
  const query=$('search').value.toLowerCase();
  const entries=result.har.log.entries.map((e,index)=>({e,index})).filter(({e})=>(!query||e.request.url.toLowerCase().includes(query))&&(!$('failures').checked||e.response.status===0||e.response.status>=400));
  const pages=Math.max(1,Math.ceil(entries.length/pageSize));page=Math.max(0,Math.min(page,pages-1));
  const fragment=document.createDocumentFragment();
  for(const {e,index} of entries.slice(page*pageSize,(page+1)*pageSize)){
    const tr=document.createElement('tr');
    for(const [i,value] of [index+1,e.request.method,e.request.url,e.response.status||'No response',`${e.time} ms`].entries()){
      const td=document.createElement('td');td.textContent=String(value);
      if(i===2)td.className='url';if(i===3&&(e.response.status===0||e.response.status>=400))td.className='bad';
      if(i===4){td.className='duration';const meter=document.createElement('progress');meter.max=Math.max(1,summary(result).slowest);meter.value=Math.max(0,e.time);meter.setAttribute('aria-label',`Duration ${e.time} milliseconds`);td.append(meter);}
      tr.append(td);
    }fragment.append(tr);
  }
  $('rows').replaceChildren(fragment);$('no-matches').hidden=entries.length!==0;
  $('page').textContent=`Page ${page+1} of ${pages} · ${entries.length} requests`;$('prev').disabled=page===0;$('next').disabled=page===pages-1;
}
async function load(text,demo=false,request=++revision){
  status('Reading and minimizing your capture…');
  await new Promise(resolve=>requestAnimationFrame(resolve));
  if(request!==revision)return;
  try{const parsed=parseHar(text);const next=sanitizeHar(parsed);source=parsed;result=next;isDemo=demo;recompute();status(demo?'Synthetic example. All sample values are fictional.':'Capture processed locally. Review the outgoing packet before sharing.');}
  catch(error){source=null;result=null;$('results').hidden=true;$('empty').hidden=false;$('reset').disabled=true;$('packet-title').textContent='No capture loaded';$('rows').replaceChildren();$('json').textContent='';status(error.message,true);}
}
$('file').addEventListener('change',async()=>{
  const file=$('file').files[0];if(!file)return;
  if(!$('reset').disabled)$('reset').click();
  const request=++revision;
  if(file.size>MAX_BYTES){status('This file exceeds 20 MiB. Export a shorter recording.',true);return;}
  try{const text=await file.text();if(request===revision)await load(text,false,request);}catch{status('Could not read this file. Select it again or export a new HAR.',true);}
});
$('demo').addEventListener('click',()=>load(JSON.stringify(sample),true));
document.querySelectorAll('input[name=policy]').forEach(input=>input.addEventListener('change',()=>{ $('policy-warning').hidden=input.value!=='endpoints';recompute();}));
$('search').addEventListener('input',()=>{page=0;render();});$('failures').addEventListener('change',()=>{page=0;render();});
$('prev').addEventListener('click',()=>{page--;render();});$('next').addEventListener('click',()=>{page++;render();});
$('reset').addEventListener('click',()=>{revision++;source=null;result=null;isDemo=false;page=0;$('file').value='';$('search').value='';$('failures').checked=false;$('results').hidden=true;$('empty').hidden=false;$('reset').disabled=true;$('packet-title').textContent='No capture loaded';$('rows').replaceChildren();$('json').textContent='';status('Capture cleared from the working session.');});
$('theme').addEventListener('click',()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';$('theme').textContent=dark?'Light theme':'Dark theme';});
function download(kind){
  if(!result)return;
  const formats={har:[JSON.stringify(result.har,null,2),'application/json','network-clean.har'],html:[reportHtml(result),'text/html','network-report.html'],md:[reportMarkdown(result),'text/markdown','network-report.md'],receipt:[JSON.stringify(result.receipt,null,2),'application/json','removal-receipt.json']};
  const [data,type,name]=formats[kind];const url=URL.createObjectURL(new Blob([data],{type}));const anchor=document.createElement('a');anchor.href=url;anchor.download=name;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status(`${name} prepared. Review it before sharing.`);
}
for(const type of ['har','html','md','receipt'])$(`export-${type}`).addEventListener('click',()=>download(type));
