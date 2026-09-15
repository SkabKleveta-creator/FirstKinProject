const Kin=require('../src/core.js');
function resolveDay(s){if(!Kin.start(s))throw Error('Cannot start');while(s.slot<2){Kin.resolveSlot(s);while(s.pending.length){const e=s.pending[0];if(!Kin.applyField(s,e,Kin.autoResult(s,e)))throw Error('Field handoff failed')}}if(!Kin.dinner(s))throw Error('No dinner');if(!Kin.valid(s))throw Error('Invalid save at dinner '+s.sun);}
function campaign(days=30,verbose=false){const s=Kin.create();const milestones={},report=[];let visits=0;
 for(let day=1;day<=days;day++){
  if(Kin.canWelcome(s))Kin.welcome(s);
  const wanted=[['hut',6,5],['storage',6,7],['well',7,6],['hut',5,8],['circle',4,7],['garden',4,4],['drying',3,6],['garden',4,3],['workshop',6,4]];
  if(s.research.done.includes('growing')&&!s.paths.includes('5,4')&&s.stock.stone>8)Kin.place(s,'trail',5,4);
  if(s.research.done.includes('growing')&&!s.paths.includes('5,3')&&s.stock.stone>8)Kin.place(s,'trail',5,3);
  for(const [type,x,y]of wanted){if(s.buildings.some(b=>b.x===x&&b.y===y))continue;const b=Kin.buildings[type];if(b.tech&&!s.research.done.includes(b.tech))continue;if(s.buildings.filter(b=>!b.done).length>=1)break;if(Kin.canPay(s,b.cost))Kin.place(s,type,x,y);break}
  Kin.live(s).forEach(p=>s.plans[p.id]=['rest','rest']);
  const used=new Set();
  const put=(action,ids,slot)=>{for(const id of ids){const p=Kin.get(s,id);if(!p?.alive)continue;for(const k of slot===undefined?[0,1]:[slot]){if(used.has(id+':'+k))continue;s.plans[id][k]=action;used.add(id+':'+k);return true}}return false};
  const all=Kin.live(s).map(p=>p.id),makers=['strongF','oldF','mira','tal','suri','oldM','tov','strongM'],gatherers=['youngF','ara','suri','tal','youngM','oldF','mira','strongF'];
  if(day===1){put('teach:fire',['oldM'],0);put('watch:oldM',['youngM'],0);put('practice:fire',['youngM'],1);put('forage',['oldF'],0);put('watch:oldF',['youngF'],0);put('practice:green',['youngF'],1)}
  if((Kin.get(s,'youngM').hand.fire||0)<2&&day>1)put('practice:fire',['youngM']);
  if(s.fire<5)put('fire',['oldM','strongF','youngM','kell']);
  if(s.stock.water<Math.ceil(all.length/4)*2)put('water',['youngM','tal','ara',...all]);
  if(s.nodes.game>=2)put('hunt',['strongM','kell','strongF']);
  if(s.nodes.fish>=3)put('fish',['tov','strongM','kell']);
  if(s.nodes.green>=3)put('forage',gatherers);
  if(s.nodes.green>=6)put('forage',gatherers);
  if(s.nodes.root>=3)put('roots',['oldM']);
  const plots=Kin.active(s,'garden');if(plots.some(p=>p.planted&&p.growth>=4))put('harvest',['suri','strongF','oldF',...all]);
  if(plots.some(p=>!p.planted)&&Kin.season(s)!=='Winter'&&s.stock.seed)put('plant',['suri','strongF','oldF',...all]);
  if(plots.some(p=>p.planted&&p.water===0)&&Kin.season(s)!=='Winter')put('tend',['suri','strongF','oldF',...all]);
  if(s.stock.wood<18){put('wood',['youngM','tal','ara',...all]);put('wood',['tal','ara','youngM',...all])}
  if(s.stock.stone<18){put('stone',['youngM','tal','ara',...all]);put('stone',['tal','ara','youngM',...all])}
  if(s.stock.fiber<12){put('fiber',gatherers);put('fiber',gatherers)}
  const site=s.buildings.find(b=>!b.done);if(site){const needed=Kin.buildings[site.type].work-site.work;for(let i=0;i<needed;i++)put('build',makers)}
  const tech=['tools','kinship','growing','exchange','bows'].find(id=>!s.research.done.includes(id));if(tech){s.research.active=tech;put('study',makers);put('study',makers)}
  if(day%2===0&&s.region.seen.length<9)put('scout',['ara','strongM','tal',...all]);
  if(Kin.active(s,'drying').length)put('preserve',makers,1);
  if(s.research.done.includes('bows')&&!s.tools.bow)put('craft:bow',makers);
  if(!s.tools.hook)put('craft:hook',makers);
  if(s.tools.spear<3&&s.stock.wood>=4)put('craft:spear',makers);
  if(s.research.done.includes('exchange')&&!s.region.outposts.length&&s.stock.preserved>=4)Kin.outpost(s,'pine');
  if(s.research.done.includes('exchange')&&s.region.seen.includes('south')&&s.stock.fiber>=12){if(!Kin.trade(s,'south'))visits++}
  resolveDay(s);if(!milestones[s.stage])milestones[s.stage]=s.sun;report.push({sun:s.sun,people:Kin.live(s).length,stage:s.stage,food:Kin.reserve(s),stock:{...s.stock},discoveries:s.research.done.length,buildings:s.buildings.filter(b=>b.done).length,short:s.today.short});
  if(verbose)console.log(JSON.stringify(report.at(-1)));
  Kin.sleep(s);
 }
 return{s,milestones,report,visits};
}
if(require.main===module){const fs=require('node:fs');const r=campaign(30,true);console.log(JSON.stringify({milestones:r.milestones,people:Kin.live(r.s).length,stage:r.s.stage,known:r.s.research.done,outposts:r.s.region.outposts,trade:r.visits}));fs.mkdirSync(require('node:path').resolve(__dirname,'../qa'),{recursive:true});fs.writeFileSync(require('node:path').resolve(__dirname,'../qa/campaign-save.json'),JSON.stringify(r.s,null,2));fs.writeFileSync(require('node:path').resolve(__dirname,'../qa/campaign-report.json'),JSON.stringify(r,null,2))}
module.exports={campaign,resolveDay};
