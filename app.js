import { filterProfiles, facets, getProfile, isPublished } from "./lib/catalog.js";
const search=document.querySelector("#search"), major=document.querySelector("#major"), field=document.querySelector("#field"), level=document.querySelector("#level");
const cards=document.querySelector("#cards"),count=document.querySelector("#count"),browse=document.querySelector("#browse"),detail=document.querySelector("#detail");
let profiles=[];
const params=()=>new URLSearchParams(location.search);
const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el};
function populate(sel,values){for(const value of values){const o=node("option",null,value);o.value=value;sel.append(o)}}
function card(profile){
  const a=node("a","card");a.href="?story="+encodeURIComponent(profile.slug);a.setAttribute("aria-label","Read "+profile.role+" story");
  a.append(node("div","avatar",profile.name.split(" ").map(s=>s[0]).slice(0,2).join("")),node("h3",null,profile.role),node("span","person",profile.name),node("p","desc",profile.summary));
  const tags=node("div","chiprow");[...profile.major,profile.field].forEach(s=>tags.append(node("span","chip",s)));a.append(tags);return a
}
function render(){
  const filtered=filterProfiles(profiles,{search:search.value,major:major.value,field:field.value,level:level.value});cards.replaceChildren(...filtered.map(card));
  count.textContent=filtered.length+" "+(filtered.length===1?"story":"stories");document.querySelector("#empty").hidden=filtered.length!==0;
}
function story(profile){
  browse.hidden=true;detail.hidden=false;document.title=profile.role+" — Career Library prototype";
  const root=document.querySelector("#profile"),wrap=node("article","profile-cover");
  wrap.append(node("p","eyebrow","Career journey"),node("h1",null,profile.role),node("p","byline","An example story featuring "+profile.name),node("p","lead",profile.summary));
  const tags=node("div","chiprow detail-tags");[...profile.major,profile.field,profile.level].forEach(s=>tags.append(node("span","chip",s)));wrap.append(tags);
  for(const [title,value] of [["How they got here",profile.journey],["Advice to students",profile.advice],["Skills they use",(profile.skills||[]).join(", ")]]){if(value){wrap.append(node("h2",null,title),node("p",null,value))}}
  wrap.append(node("p","note","This profile is fictional and was created for a demonstration. It is not an interview with a real professional."));
  root.replaceChildren(wrap)
}
async function init(){
  try{
    const res=await fetch("data/profiles.json",{cache:"no-store"});if(!res.ok)throw Error("HTTP "+res.status);
    const data=await res.json();if(!Array.isArray(data))throw Error("Invalid catalog");profiles=data.filter(isPublished);
    const item=getProfile(profiles,params().get("story"));if(params().has("story")){if(item)story(item);else{browse.hidden=true;detail.hidden=false;document.querySelector("#profile").append(node("h1",null,"Story not found"))}return}
    const f=facets(profiles);populate(major,f.majors);populate(field,f.fields);populate(level,f.levels);
    const p=params();search.value=p.get("q")||"";major.value=p.get("major")||"";field.value=p.get("field")||"";level.value=p.get("level")||"";
    for(const el of [search,major,field,level])el.addEventListener(el===search?"input":"change",()=>{const p=new URLSearchParams();if(search.value.trim())p.set("q",search.value.trim());if(major.value)p.set("major",major.value);if(field.value)p.set("field",field.value);if(level.value)p.set("level",level.value);history.replaceState(null,"",p.size?"?"+p.toString():location.pathname);render()});
    document.querySelector("#clear").onclick=()=>{search.value=major.value=field.value=level.value="";history.replaceState(null,"",location.pathname);render()};render()
  }catch(e){browse.hidden=false;cards.replaceChildren(node("p","empty","Unable to load career stories. Refresh the page or try again later."));count.textContent="Unavailable";console.error("Catalog unavailable",e)}
}
init();
