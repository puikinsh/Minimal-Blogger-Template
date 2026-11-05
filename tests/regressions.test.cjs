const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, path.basename(root) + '.xml'), 'utf8');
const runtime = [...source.matchAll(/<script\b([^>]*?)(?<!\/)>([\s\S]*?)<\/script>/g)].map(m=>m[2])
  .find(code=>code.includes('function colorlibLimitUrl'));
const init = [...source.matchAll(/<script\b([^>]*?)(?<!\/)>([\s\S]*?)<\/script>/g)].map(m=>m[2])
  .find(code=>code.includes('colorlibNumberedPager({') || code.includes('colorlibInfinitePager({'));
const helpers = vm.createContext({URL, location:{href:'https://example.com/',origin:'https://example.com'}});
vm.runInContext(runtime, helpers);

test('label limits preserve queries, fragments, explicit limits and external URLs',()=>{
  const target = new URL(helpers.colorlibLimitUrl('/search/label/Travel%20%26%20Food?m=1#posts',7));
  assert.equal(target.pathname,'/search/label/Travel%20%26%20Food');
  assert.equal(target.searchParams.get('m'),'1');
  assert.equal(target.searchParams.get('max-results'),'7');
  assert.equal(target.hash,'#posts');
  assert.equal(new URL(helpers.colorlibLimitUrl('/search/label/Travel?max-results=20',7)).searchParams.get('max-results'),'20');
  assert.equal(helpers.colorlibLimitUrl('https://other.example/search/label/Travel',7),'https://other.example/search/label/Travel');
  assert.equal(helpers.colorlibLimitUrl('http://[',7),'http://[');
});

test('feed text escapes markup and both attribute quote styles',()=>{
  assert.equal(helpers.colorlibText('<img src=x onerror="alert(1)">\' &'), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;&#39; &amp;');
  assert.equal(helpers.colorlibText(null),'');
});

test('numbered navigation never uses document.write or overwrites native controls',()=>{
  assert.ok(init);
  assert.ok(!/document\.write|function finddatepost|function looppagecurrentg|function loophalaman/.test(source));
  assert.ok(!/l\.colorlibLimitUrl/.test(source));
  assert.ok(source.includes('.jsonEscaped/>'));
  assert.ok(!/<meta\b[^>]*property=['"]og:/.test(source));
});

const chrome=process.env.CHROME_BIN || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/chromium-browser'].find(fs.existsSync);
function browser(script,width){
  const scratch=fs.mkdtempSync(path.join(require('node:os').tmpdir(),'blogger-regression-'));
  try {
    let css=source.split('<b:skin><![CDATA[')[1].split(']]></b:skin>')[0];
    const variables={};
    for(const m of css.matchAll(/<Variable\b[^>]*name="([^"]+)"[^>]*\bvalue="([^"]*)"[^>]*\/>/g))variables[m[1]]=m[2];
    css=css.replace(/\$\(([^)]+)\)|\$([\w.]+)/g,(_,a,b)=>variables[a||b]||'#2942ee');
    const fixture='<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src \'none\';script-src \'unsafe-inline\';style-src \'unsafe-inline\';img-src data:"><style>'+css+'</style></head><body><script>'+script+'</script></body></html>';
    const file=path.join(scratch,'fixture.html');
    fs.writeFileSync(file,'<!doctype html><body><iframe id="frame" style="border:0;width:'+width+'px;height:900px"></iframe><script>var f=document.getElementById("frame");f.srcdoc='+JSON.stringify(fixture).replace(/</g,'\\u003c')+';setInterval(function(){var d=f.contentDocument;if(d&&d.body){document.body.dataset.result=d.body.dataset.result||"pending";var error=d.querySelector("#failure");if(error&&!document.querySelector("#failure"))document.body.appendChild(error.cloneNode(true));}},10);</script>');
    const r=spawnSync(chrome,['--headless','--disable-gpu','--no-first-run','--disable-background-networking','--disable-component-update','--disable-sync','--no-default-browser-check','--window-size=1200,1000','--virtual-time-budget=3000','--user-data-dir='+path.join(scratch,'profile'),'--dump-dom',require('node:url').pathToFileURL(file).href],{encoding:'utf8',timeout:30000,maxBuffer:3*1024*1024});
    assert.equal(r.status,0,r.error?.message||r.stderr);
    const fail=r.stdout.match(/<pre id="failure">([\s\S]*?)<\/pre>/);
    assert.ok(/<body[^>]*data-result="passed"/.test(r.stdout),fail?fail[1]:'Fixture did not finish');
  } finally {fs.rmSync(scratch,{recursive:true,force:true});}
}

for(const variant of (root.includes('Shutter-')?['number','infinite']:['number']))for(const width of [320,1200])test('production pagination and post layout '+variant+' at '+width+'px',{skip:!chrome},()=>browser(`
(function(location){
var config;
${runtime}
var productionNumbered=typeof colorlibNumberedPager==='function'?colorlibNumberedPager:null,productionInfinite=typeof colorlibInfinitePager==='function'?colorlibInfinitePager:null;
colorlibNumberedPager=function(c){config=c;config.kind='numbered';};
colorlibInfinitePager=function(c){config=c;config.kind='infinite';};
var perPage=7,perpage=7,postperpage=7,pagit=${JSON.stringify(variant)};
${init}
if(!config){pagit='infinite';${init}}
function check(ok,msg){if(!ok)throw Error(msg);}
function settle(){return new Promise(function(resolve){setTimeout(resolve,0);});}
var mode='valid',calls=[],responseHTML='';
function fetch(url){calls.push(url);return Promise.resolve({ok:mode!=='http-error',json:function(){if(mode==='invalid-json')return Promise.reject(Error('bad JSON'));return Promise.resolve({feed:{openSearch$totalResults:{$t:'70'},entry:Array.from({length:8},function(_,i){return {published:{$t:new Date(Date.UTC(2026,10,5,12)-(mode==='ties'?0:i*60000)).toISOString()}};})}});},text:function(){return Promise.resolve(responseHTML);}});}
function posts(){return Array.from({length:7},function(_,i){return '<div class="grid-item post-outer"><article class="ajax_pickup post article"><h2 class="post-title"><a href="/2026/post'+i+'.html">Post '+i+'</a></h2><time datetime="2026-11-05T10:00:00Z"></time></article></div>';}).join('');}
function markup(){
 var n=config.pager==='#shutter-pager',p=posts();
 if(config.container==='.ajaxed')p=Array.from({length:7},function(_,i){return '<article class="post col-md-6"><h2>Post '+i+'</h2><time datetime="2026-11-05T10:00:00Z"></time></article>';}).join('');
 if(config.container==='.ajax_pickup')p='<article class="article col-sm-12"><h2>Hero</h2></article><div class="whiter padd container"><div class="row">'+Array.from({length:6},function(_,i){return '<article class="article col-lg-6"><h2>Post '+i+'</h2></article>';}).join('')+'</div></div>';
 var container=n?'<div class="grid-wrapper">'+p+'</div>':config.container==='.ajaxed'?'<div class="ajaxed row">'+p+'</div>':config.container==='.ajax_pickup'?'<div class="ajax_pickup"><div class="row">'+p+'</div></div>':'<div class="blog-posts '+(config.posts.includes('post-outer')?'hfeed':'row')+'">'+p+'</div>';
 // Magazine rows sit inside a guttered outer container; PhotoMag/Simplify own their edge gutters.
 var outer=!n&&config.container!=='.ajaxed'&&config.container!=='.ajax_pickup'?' class="container" style="padding:0 15px;max-width:100%;box-sizing:border-box"':'';
 return '<div id="Blog1"'+outer+'>'+container+'<div role="navigation" id="'+(n?'shutter-pager':'blog-pager')+'"><a class="'+(n?'shutter-newer-link':'blog-pager-newer-link')+'" href="https://example.com/">Newer Posts</a><a class="'+(n?'shutter-older-link':'blog-pager-older-link')+'" href="https://example.com/search?updated-max=2026-11-01T10:00:00Z&amp;max-results=7">Older Posts</a></div></div>';
}
(async function(){
 document.body.innerHTML=markup();
 var pager=document.querySelector(config.pager),original=pager.querySelector(config.older),href=original.href;
 if(config.kind==='numbered'){
   productionNumbered(config);await settle();
   check(pager.querySelectorAll('.colorlib-numbers').length===1,'numbers inside native bar');
   check(document.querySelectorAll('[role=navigation]').length===1,'one pager');
   check(original.href===href,'native URL preserved');
   check(pager.querySelectorAll('button[aria-label="Page 10"]').length===1,'one last page target');
   check(!pager.querySelector('a[href="#"]'),'buttons for async actions');
   pager.querySelector('button').click();await settle();
   var jump=new URL(location.href);check(jump.pathname==='/search'&&jump.hash==='#PageNo=2'&&jump.searchParams.get('max-results')==='7'&&jump.searchParams.get('updated-max')==='2026-11-05T12:00:00.000Z','valid jump keeps complete feed timestamp and page size');
   pager.querySelector('.colorlib-numbers').remove();location.href='https://example.com/';productionNumbered(config);await settle();
   mode='ties';pager.querySelector('button').click();await settle();
   check(!pager.querySelector('.colorlib-numbers')&&original.href===href,'ambiguous jump falls back');
   calls=[];productionNumbered(config);await settle();check(!pager.querySelector('.colorlib-numbers'),'known ties offer native only');
   for(var query of ['?max-results=7&q=travel','?max-results=7&reverse-paginate=true','?updated-max=stamp']){calls=[];location.href='https://example.com/search'+query;productionNumbered(config);await settle();check(!calls.length,'native search/cursor page');}
   location.href='https://example.com/';mode='http-error';productionNumbered(config);await settle();check(!pager.querySelector('.colorlib-numbers')&&original.href===href,'HTTP failure preserves native');
   mode='invalid-json';productionNumbered(config);await settle();check(!pager.querySelector('.colorlib-numbers'),'invalid JSON preserves native');
   mode='valid';location.href='https://example.com/search/label/Travel%20%26%20Food?m=1';productionNumbered(config);await settle();check(calls[calls.length-1].includes('/-/Travel%20%26%20Food?'),'encoded label scope');
 }else{
   // Theme callbacks are separately syntax checked; this fixture exercises real import/navigation code.
   var callbackPosts=0;config.after=function(root,posts){callbackPosts=posts.length;};
   productionInfinite(config);check(original.hidden,'only replace Older control after enhancing');
   responseHTML=markup().replace('2026-11-01','2026-10-01').replaceAll('/2026/post','/2026/loaded');
   pager.querySelector('button').click();await settle();
   check(document.querySelector(config.container).querySelectorAll('article').length===14,'append all posts including nested grid wrappers');
   check(callbackPosts>0,'theme initialization receives only newly appended wrappers');
   check(original.href.includes('2026-10-01'),'advance fallback URL only after success');
   check(pager.querySelector('a').textContent==='Newer Posts','preserve newer navigation');
   responseHTML='<html><body>Error page</body></html>';pager.querySelector('button').click();await settle();
   check(!original.hidden&&pager.querySelector('button').hidden,'invalid response restores native');
   check(document.querySelector(config.container).querySelectorAll('article').length===14,'invalid response adds nothing');
   document.body.innerHTML=markup();pager=document.querySelector(config.pager);original=pager.querySelector(config.older);mode='http-error';productionInfinite(config);pager.querySelector('button').click();await settle();check(!original.hidden,'HTTP failure restores native');
   document.body.innerHTML=markup();pager=document.querySelector(config.pager);original=pager.querySelector(config.older);mode='valid';productionInfinite(config);responseHTML=markup();pager.querySelector('button').click();await settle();check(!original.hidden,'repeated cursor restores native');
 }
 var content=document.createElement('div');content.className='post-body';content.style.width='280px';content.innerHTML='<p>'+('longword'.repeat(60))+'</p><pre>'+('code '.repeat(100))+'</pre><iframe width="1000" height="200"></iframe><table><tr><td>'+('wide'.repeat(100))+'</td></tr></table>';document.body.appendChild(content);
 check(content.scrollWidth<=content.clientWidth+1,'post content fits narrow column');
 if(${JSON.stringify(root.includes('PhotoMag-'))}){var footer=document.createElement('div');footer.className='row cpyr';footer.textContent='Copyright';document.body.appendChild(footer);}
 check(document.documentElement.scrollWidth<=innerWidth,'outer post grid fits viewport: '+JSON.stringify(Array.from(document.querySelectorAll('body *')).filter(function(e){return e.getBoundingClientRect().right>innerWidth;}).slice(0,4).map(function(e){return {tag:e.tagName,class:e.className,right:e.getBoundingClientRect().right};})));
 document.body.dataset.result='passed';
})().catch(function(e){var pre=document.createElement('pre');pre.id='failure';pre.textContent=e.stack;document.body.appendChild(pre);document.body.dataset.result='failed';});
})({href:'https://example.com/',origin:'https://example.com'});
`,width));
