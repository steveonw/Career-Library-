export const isPublished=p=>p&&p.status==="Published"&&typeof p.slug==="string"&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)&&typeof p.name==="string"&&typeof p.role==="string"&&Array.isArray(p.major)&&typeof p.field==="string";
export function facets(rows){return {majors:[...new Set(rows.flatMap(p=>p.major))].sort(),fields:[...new Set(rows.map(p=>p.field))].sort(),levels:[...new Set(rows.map(p=>p.level).filter(Boolean))].sort()}}
export function filterProfiles(rows,{search="",major="",field="",level=""}={}){
 const q=search.trim().toLocaleLowerCase();
 return rows.filter(isPublished).filter(p=>(!major||p.major.includes(major))&&(!field||p.field===field)&&(!level||p.level===level)&&(!q||[p.role,p.name,p.summary,p.field,...p.major,...(p.skills||[]),...(p.interests||[])].join(" ").toLocaleLowerCase().includes(q))).sort((a,b)=>a.role.localeCompare(b.role))
}
export const getProfile=(rows,slug)=>rows.find(p=>p.slug===slug&&isPublished(p));
