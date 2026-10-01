import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const allowed=new Set(['index.html','style.css','app.js','core.js','favicon.svg','og.svg','og.png','robots.txt','sitemap.xml']);
const types={html:'text/html',css:'text/css',js:'text/javascript',svg:'image/svg+xml',png:'image/png',txt:'text/plain',xml:'application/xml'};
const server=createServer(async(req,res)=>{
  try{
    const path=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html';
    if(!['GET','HEAD'].includes(req.method)||!allowed.has(path)){res.writeHead(404);res.end('Not found');return;}
    const data=await readFile(new URL(`../public/${path}`,import.meta.url));
    res.writeHead(200,{'Content-Type':types[path.split('.').pop()]+'; charset=utf-8','X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});
    res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(404);res.end('Not found');}
});
server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Harborstrip running on local port 4173'));
