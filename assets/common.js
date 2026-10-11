/* Shared helpers. Keys are prefixed "devops_" so they never clash with the Data Engineering site (same github.io origin). */
const deTopicItemsKey=id=>`devops_items_${id}`;
const deReadStore=k=>{try{return JSON.parse(localStorage.getItem(k))||{}}catch(e){return{}}};
const deWriteStore=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
function deSyncTopicToRoadmap(id,total){
  const done=Object.keys(deReadStore(deTopicItemsKey(id))).length;
  const r=deReadStore("devops_roadmap");r[id]={done,total};deWriteStore("devops_roadmap",r);
}
function deUpdateRing(el,done,total){
  const c=2*Math.PI*27;el.style.strokeDasharray=c;
  el.style.strokeDashoffset=c*(1-(total?done/total:0));
}
const getJSON=u=>fetch(u).then(r=>{if(!r.ok)throw new Error(u);return r.json()});
const qp=k=>new URLSearchParams(location.search).get(k);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const bt=s=>String(s).replace(/`([^`]+)`/g,"<code>$1</code>");
const pct=(d,n)=>n?Math.round(d/n*100):0;
