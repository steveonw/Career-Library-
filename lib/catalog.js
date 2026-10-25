export const isPublished=p=>p&&p.status==="Published"&&typeof p.slug==="string"&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)&&typeof p.name==="string"&&typeof p.role==="string"&&Array.isArray(p.major)&&typeof p.field==="string";
export function facets(rows){return {majors:[...new Set(rows.flatMap(p=>p.major))].sort(),fields:[...new Set(rows.map(p=>p.field))].sort(),levels:[...new Set(rows.map(p=>p.level).filter(Boolean))].sort()}}
const lower=value=>String(value||"").toLocaleLowerCase();
export function matchReason(p,q){
 const term=lower(q).trim();if(!term)return "";
 if(lower(p.role).includes(term))return "Career title";
 if(lower(p.name).includes(term))return "Professional name";
 if(lower(p.field).includes(term))return "Career field";
 if(p.major.some(x=>lower(x).includes(term)))return "Major";
 if((p.skills||[]).some(x=>lower(x).includes(term)))return "Skill";
 if((p.interests||[]).some(x=>lower(x).includes(term)))return "Interest";
 if(lower(p.summary).includes(term))return "Story description";
 return "";
}
const ranking={"Career title":0,"Professional name":1,"Career field":2,"Major":3,"Skill":4,"Interest":5,"Story description":6};
export function filterProfiles(rows,{search="",major="",field="",level=""}={}){
 const q=search.trim();
 return rows.filter(isPublished).filter(p=>(!major||p.major.includes(major))&&(!field||p.field===field)&&(!level||p.level===level)&&(!q||matchReason(p,q))).sort((a,b)=>{
   if(q){const r=(ranking[matchReason(a,q)]??99)-(ranking[matchReason(b,q)]??99);if(r)return r}
   return a.role.localeCompare(b.role);
 });
}
export const getProfile=(rows,slug)=>rows.find(p=>p.slug===slug&&isPublished(p));
