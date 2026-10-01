#!/usr/bin/env node
import {readFile,writeFile,stat} from 'node:fs/promises';
import {parseHar,sanitizeHar,reportHtml,reportMarkdown,MAX_BYTES} from '../src/core.js';
const args=process.argv.slice(2);
if(args.length<2 || args.includes('--help')){
  console.log('Usage: node scripts/cli.js input.har output.har [--endpoints] [--html|--markdown|--receipt]\nOutput refuses to overwrite an existing file. Strict aliases are default.');
  process.exit(args.includes('--help')?0:1);
}
try{
  const flags=args.slice(2);
  if(flags.some(f=>!['--endpoints','--html','--markdown','--receipt'].includes(f))||flags.filter(f=>['--html','--markdown','--receipt'].includes(f)).length>1)throw new Error('Use a single output format and known flags.');
  if((await stat(args[0])).size>MAX_BYTES)throw new Error('Input exceeds 20 MiB.');
  const result=sanitizeHar(parseHar(await readFile(args[0],'utf8')),{keepEndpoints:flags.includes('--endpoints')});
  const out=flags.includes('--html')?reportHtml(result):flags.includes('--markdown')?reportMarkdown(result):JSON.stringify(flags.includes('--receipt')?result.receipt:result.har,null,2);
  await writeFile(args[1],out,{flag:'wx'});
  console.log(`Prepared ${result.receipt.requests} requests using ${result.receipt.policy}. Review the output before sharing.`);
}catch(err){console.error(err.code==='EEXIST'?'Output already exists. Choose a new filename.':err.message);process.exitCode=1;}
