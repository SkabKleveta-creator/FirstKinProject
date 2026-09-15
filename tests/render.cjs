const fs=require('node:fs'),path=require('node:path');
const {createCanvas,loadImage}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/@napi-rs/canvas');
global.Kin=require('../src/core.js');global.Field=require('../src/field.js');const View=require('../src/render.js');
(async()=>{
 const dir=path.resolve(__dirname,'../qa');fs.mkdirSync(dir,{recursive:true});
 View.assets(await Promise.all(['founding-family','settlers'].map(n=>loadImage(path.resolve(__dirname,'../assets/'+n+'.png')))));
 const s=Kin.create();Kin.firstPlans(s);const village=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../qa/campaign-save.json')));const vc=createCanvas(1000,650);View.draw(vc.getContext('2d'),1000,650,village,{time:3,selected:'strongM'});fs.writeFileSync(dir+'/village.png',vc.toBuffer('image/png')); 
 for(const[filename,W,H,v]of[['founding-settlement',1000,650,{selected:'strongF',time:2}],['mobile-settlement',375,425,{selected:'strongM',time:2}],['region',1000,650,{scene:'region',regionSelection:'amber'}]]){
  if(filename==='region')s.region.seen=Kin.places.map(p=>p.id);
  const c=createCanvas(W,H);View.draw(c.getContext('2d'),W,H,s,v);fs.writeFileSync(dir+'/'+filename+'.png',c.toBuffer('image/png'));
 }
 const c=createCanvas(960,340),ctx=c.getContext('2d');ctx.fillStyle='#202620';ctx.fillRect(0,0,960,340);for(let i=0;i<12;i++){ctx.save();ctx.translate((i%6)*160+16,Math.floor(i/6)*170+10);View.portrait(ctx,i,128);ctx.restore();ctx.fillStyle='#e9e6d7';ctx.font='16px sans-serif';ctx.fillText(['Orr','Ma','Grok','Nana','Lug','Eeka','Ara','Tov','Suri','Kell','Mira','Tal'][i],(i%6)*160+16,Math.floor(i/6)*170+158)}fs.writeFileSync(dir+'/portraits.png',c.toBuffer('image/png'));
 const f=Field.create(s,{id:'qa',scene:'fish',actors:['strongM'],seed:1,tools:s.tools,available:20});f.phase='biting';const fc=createCanvas(1000,650);View.draw(fc.getContext('2d'),1000,650,s,{time:2},f);fs.writeFileSync(dir+'/fishing.png',fc.toBuffer('image/png'));
 console.log('Rendered desktop, mobile, region, fishing and 12 portraits with the actual game renderer.');
})();
