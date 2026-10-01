import {copyFile,access,cp,rm} from 'node:fs/promises';
await copyFile(new URL('../src/core.js',import.meta.url),new URL('../public/core.js',import.meta.url));
for(const name of ['index.html','app.js','style.css','favicon.svg','og.svg'])await access(new URL(`../public/${name}`,import.meta.url));
await rm(new URL('../dist/',import.meta.url),{recursive:true,force:true});
await cp(new URL('../public/',import.meta.url),new URL('../dist/',import.meta.url),{recursive:true});
console.log('Static assets ready.');
