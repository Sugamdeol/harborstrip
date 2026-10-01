import {chromium} from '@playwright/test';
import {spawn} from 'node:child_process';
import {mkdir,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const server=spawn(process.execPath,['scripts/server.js'],{stdio:['ignore','pipe','pipe']});
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',code=>reject(new Error(`Server exited: ${code}`)));});
let browser;
try{
  browser=await chromium.launch({headless:true,...(process.env.HARBORSTRIP_CHROMIUM?{executablePath:process.env.HARBORSTRIP_CHROMIUM,args:['--no-sandbox','--disable-dev-shm-usage']}: {})});const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));const sent=[];page.on('request',r=>sent.push(r.url()));
  await page.goto('http://127.0.0.1:4173');assert.ok(await page.getByLabel('Keep host and path',{exact:false}).isChecked());assert.ok(await page.locator('#policy-warning').isVisible());await page.getByRole('button',{name:'Load synthetic demo'}).click();
  await page.getByText('Synthetic demo packet',{exact:true}).waitFor();assert.equal(await page.locator('#rows tr').count(),9);assert.ok((await page.locator('#json').textContent()).includes('api.demo.invalid'));
  await page.getByLabel('Failures only').check();assert.equal(await page.locator('#rows tr').count(),2);
  await page.getByLabel('Failures only').uncheck();await page.locator('#search').fill('no-match');assert.equal(await page.locator('#rows tr').count(),0);assert.ok(await page.locator('#no-matches').isVisible());await page.locator('#search').fill('');
  await page.getByLabel('Keep host and path',{exact:false}).check();assert.ok(await page.locator('#policy-warning').isVisible());await page.getByLabel('Strict aliases',{exact:false}).check();
  await page.locator('#preview summary').click();assert.ok((await page.locator('#json').textContent()).includes('host-1.invalid'));await page.locator('#preview summary').click();
  for(const id of ['har','html','md','receipt']){
    const downloadPromise=page.waitForEvent('download');await page.locator(`#export-${id}`).click();const download=await downloadPromise;const contents=await readFile(await download.path(),'utf8');assert.ok(!contents.includes('SYNTHETIC_SECRET_ONLY'));assert.ok(!contents.includes('SYNTHETIC_PAYLOAD'));
  }
  await page.getByRole('button',{name:'Dark theme',exact:true}).click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');await page.getByRole('button',{name:'Light theme',exact:true}).click();
  for(const width of [360,390,768,1024,1440]){await page.setViewportSize({width,height:1000});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),`Overflow at ${width}`);await page.getByRole('button',{name:'Save clean HAR',exact:true}).scrollIntoViewIfNeeded();}
  await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>window.scrollTo(0,0));await mkdir('docs/media',{recursive:true});await page.screenshot({path:'docs/media/workspace.png',fullPage:true});
  await page.setViewportSize({width:390,height:1000});await page.screenshot({path:'docs/media/mobile.png',fullPage:true});
  await page.getByRole('button',{name:'Clear capture',exact:true}).click();assert.ok(await page.locator('#empty').isVisible());
  await page.locator('#file').setInputFiles({name:'bad.har',mimeType:'application/json',buffer:Buffer.from('{bad')});await page.locator('#status.error').waitFor();
  await page.getByRole('button',{name:'Load synthetic demo'}).click();await page.locator('#results').waitFor({state:'visible'});
  const large={log:{entries:Array.from({length:65},()=>({request:{method:'GET',url:'https://example.invalid/a'},response:{status:200},time:10}))}};
  await page.locator('#file').setInputFiles({name:'many.har',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(large))});await page.getByText('Network packet',{exact:true}).waitFor();assert.equal(await page.locator('#rows tr').count(),30);await page.getByRole('button',{name:'Next',exact:true}).click();assert.equal(await page.locator('#rows tr').count(),30);await page.getByRole('button',{name:'Next',exact:true}).click();assert.equal(await page.locator('#rows tr').count(),5);await page.getByRole('button',{name:'Previous',exact:true}).click();assert.equal(await page.locator('#rows tr').count(),30);
  await page.context().setOffline(true);await page.getByRole('button',{name:'Load synthetic demo'}).click();await page.getByText('Synthetic demo packet',{exact:true}).waitFor();assert.equal(await page.locator('#rows tr').count(),9);
  await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>document.activeElement!==document.body));
  assert.deepEqual(errors,[]);assert.ok(sent.every(url=>url.startsWith('http://127.0.0.1:4173/')));console.log('E2E passed: imports, policies, search, failure filter, 4 downloads, pagination, reset, themes, 5 widths, offline, no JS errors or external requests.');
}finally{await browser?.close();server.kill();}
