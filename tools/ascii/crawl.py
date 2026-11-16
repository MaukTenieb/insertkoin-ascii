"""Parcourt les écrans du clone et mesure, pour chaque image, sa taille d'affichage (échelle affichée/native) et son usage (DOM ou canvas)."""
import asyncio,json,sys,collections
CV=set()
from playwright.async_api import async_playwright
JS="""async()=>{const out=[];
const nat=u=>new Promise(r=>{const i=new Image();i.onload=()=>r([i.naturalWidth,i.naturalHeight]);i.onerror=()=>r(null);i.src=u;});
const vis=e=>{const r=e.getBoundingClientRect();return r.width>4&&r.height>4&&r.bottom>0&&r.right>0&&r.top<innerHeight&&r.left<innerWidth;};
for(const e of document.querySelectorAll('*')){if(!vis(e))continue;const r=e.getBoundingClientRect();
 if(e.tagName==='IMG'&&e.naturalWidth){out.push([e.currentSrc,r.width/e.naturalWidth,r.height/e.naturalHeight]);continue;}
 const cs=getComputedStyle(e);for(const pr of [cs.backgroundImage,cs.borderImageSource,cs.maskImage||'',cs.webkitMaskImage||'']){const ms=[...(pr||'').matchAll(/url\\("([^"]+)"\\)/g)];
 for(const m of ms){if(m[1].startsWith('data:'))continue;const n=await nat(m[1]);if(!n)continue;
  let sx=r.width/n[0],sy=r.height/n[1];const bs=cs.backgroundSize;
  if(bs&&bs!=='auto'&&bs!=='auto auto'&&!bs.includes('cover')&&!bs.includes('contain')&&!bs.includes('%')){const px=bs.split(' ').map(parseFloat);if(px[0])sx=px[0]/n[0];sy=(px[1]||px[0]*n[1]/n[0])/n[1];}
  else if(bs.includes('cover')){const s=Math.max(r.width/n[0],r.height/n[1]);sx=sy=s;}
  else if(bs.includes('contain')){const s=Math.min(r.width/n[0],r.height/n[1]);sx=sy=s;}
  else if(bs==='auto'||bs==='auto auto'){sx=sy=1;}
  out.push([m[1],sx,sy]);}}}
return out;}"""
SEL="""n=>{const b=[...document.querySelectorAll('button,a,[role=button]')].find(b=>(b.getAttribute('aria-label')||b.textContent).trim()===n&&b.offsetWidth>0);if(b){b.click();return true}return false}"""
async def snap(pg,acc,tag,shots):
  for f in pg.frames:
    try: r=await f.evaluate(JS)
    except Exception: continue
    for u,sx,sy in r: acc[u.split('?')[0]].append((round(max(sx,sy),3),tag))
  for f in pg.frames:
    try: CV.update(await f.evaluate("[...(window.__cv||[])]"))
    except Exception: pass
  if shots: await pg.screenshot(path=f'/home/claude/t/crawl/{tag}.png')
async def main():
  shots='--shots' in sys.argv
  acc=collections.defaultdict(list);net=set()
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--enable-unsafe-swiftshader','--use-angle=swiftshader'])
    for vw,vh,dev in ([(1440,900,'d'),(390,844,'m'),(844,390,'l')] if '--all' in sys.argv else [(1440,900,'d')]):
      ctx=await b.new_context(viewport={'width':vw,'height':vh},is_mobile=dev!='d',has_touch=dev!='d')
      await ctx.add_init_script("""(()=>{window.__cv=new Set();const rec=a=>{try{if(a&&a.src)window.__cv.add(a.src.split('?')[0]);else if(a&&a.currentSrc)window.__cv.add(a.currentSrc)}catch(e){}};
const d=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(i,...r){rec(i);return d.call(this,i,...r)};
for(const P of [WebGLRenderingContext.prototype,WebGL2RenderingContext.prototype]){const t=P.texImage2D;P.texImage2D=function(...a){rec(a[a.length-1]);return t.apply(this,a)};const s=P.texSubImage2D;P.texSubImage2D=function(...a){rec(a[a.length-1]);return s.apply(this,a)}}
const cp=window.createImageBitmap;window.createImageBitmap=function(i,...r){rec(i);return cp.call(this,i,...r)};})()""")
      pg=await ctx.new_page();pg.on('request',lambda r:net.add(r.url.split('?')[0]) if r.resource_type=='image' else None)
      await pg.goto('http://localhost:8765/index.html');await pg.wait_for_timeout(6000)
      await snap(pg,acc,f'{dev}-home',shots)
      groups={'KorhoGame':['KORONG!','FAUNINVADERS','FAUNARRATIK','FAUNA CHESS','KONNECT4','AKASZTÓFA','MASKERMIND','ERRATIK'],
              'FaunEye':['BAKUBOOK','VHS','KAMORHOGO','MUSIK'],'SurFauna':['REPORHOGO','FAUNATOR'],'3615':[None],'MAUK TENIEB':[None],'LoreLore':[None],'BURROWS':[None]}
      DOT="n=>{const d=[...document.querySelectorAll('.b-dot')].filter(b=>b.getAttribute('aria-label')===n&&b.offsetWidth>0)[0];if(d){d.click();return true}return false}"
      for g,subs in groups.items():
        await pg.goto('http://localhost:8765/index.html');await pg.wait_for_timeout(4500)
        await pg.evaluate(SEL,g);await pg.wait_for_timeout(3000)
        for s in subs:
          if s: await pg.evaluate(DOT,s)
          await pg.wait_for_timeout(14000)
          await snap(pg,acc,f'{dev}-{g}-{s or ""}'.replace(' ','_').replace('!',''),shots)
      for page in ['kave/tv.html','kave/wiki.html','kave/videoclub.html','kave/dvd.html','kave/kos.html','fauna-aube.html','kuration.html','reporhogo.html','tor.html','fotofauna.html','skoporhogo.html','borne-bio.html','404.html','notes/index.html','habillages/index.html','fr.html']:
        try:
          await pg.goto("http://localhost:8765/"+page,timeout=30000);await pg.wait_for_timeout(9000)
          await snap(pg,acc,f'{dev}-{page.replace("/","_")}',shots)
        except Exception as e: print('KO',page,str(e)[:80])
      await ctx.close()
    await b.close()
  json.dump({'dom':acc,'net':sorted(net),'canvas':sorted(CV)},open('/home/claude/tools/crawl.json','w'))
  print(len(acc),'images DOM',len(net),'requêtes image')
asyncio.run(main())
