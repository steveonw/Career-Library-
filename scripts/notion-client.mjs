/* Notion's 2025-09-03 API separates databases and data sources.
 * Browser code must never import this file or a Notion secret.
 */
import {isPublished} from "../lib/catalog.js";

const API="https://api.notion.com/v1";
const VERSION="2025-09-03";
const REQUIRED={
  Name:["title"],
  Role:["rich_text"],
  Major:["multi_select"],
  "Career Field":["select"],
  Summary:["rich_text"],
  Status:["select","status"]
};
const OPTIONAL={
  Slug:["rich_text"],
  "Experience Level":["select"],
  Interests:["multi_select"],
  Journey:["rich_text"],
  Advice:["rich_text"],
  Skills:["multi_select"]
};

export function notionId(raw){
  const input=String(raw||"").trim();
  if(!input)throw Error("Missing Notion database/data-source ID");
  const pattern=/(?:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}|[a-f0-9]{32})/i;
  const match=input.match(pattern);
  if(!match)throw Error("Invalid Notion ID; copy the database link or a 32-character ID");
  return match[0].replaceAll("-","").toLowerCase();
}
const getText=p=>(p?.title||p?.rich_text||[]).map(x=>x.plain_text??x.text?.content??"").join("").trim();
const choice=p=>p?.select?.name??p?.status?.name??"";
const choices=p=>(p?.multi_select||[]).map(x=>x.name).filter(Boolean);
const slugify=value=>String(value||"").normalize("NFKD").toLowerCase().replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

export function mapNotionPage(page){
  const p=page.properties||{};
  const name=getText(p.Name),role=getText(p.Role);
  return {
    slug:slugify(getText(p.Slug)||role+" "+name),
    name,role,major:choices(p.Major),field:choice(p["Career Field"]),
    level:choice(p["Experience Level"]),interests:choices(p.Interests),
    summary:getText(p.Summary),journey:getText(p.Journey),
    advice:getText(p.Advice),skills:choices(p.Skills),status:choice(p.Status)
  };
}
export function validateSchema(dataSource){
  const props=dataSource?.properties||{};
  const issues=[];
  for(const [field,types] of Object.entries(REQUIRED)){
    if(!props[field])issues.push(field+" (missing)");
    else if(!types.includes(props[field].type))issues.push(field+" (expected "+types.join(" or ")+", got "+props[field].type+")");
  }
  for(const [field,types] of Object.entries(OPTIONAL)){
    if(props[field]&&!types.includes(props[field].type))issues.push(field+" (expected "+types.join(" or ")+", got "+props[field].type+")");
  }
  if(issues.length)throw Error("Notion database columns need attention: "+issues.join("; "));
  return props.Status.type;
}
function validateStory(p){
  const missing=[];
  if(!p.name.trim())missing.push("Name");
  if(!p.role.trim())missing.push("Role");
  if(!p.summary.trim())missing.push("Summary");
  if(!p.major.length)missing.push("Major");
  if(!p.field.trim())missing.push("Career Field");
  if(!isPublished(p))missing.push("valid public slug / status");
  return [...new Set(missing)];
}
function wait(ms){return new Promise(resolve=>setTimeout(resolve,ms))}
async function requestNotion({token,fetchImpl=fetch,url,method="GET",body}){
  for(let attempt=0;attempt<3;attempt++){
    const res=await fetchImpl(url,{method,
      headers:{"Authorization":"Bearer "+token,"Notion-Version":VERSION,"Content-Type":"application/json"},
      ...(body?{body:JSON.stringify(body)}:{})
    });
    if(res.ok)return await res.json();
    if((res.status===429||res.status>=500)&&attempt<2){await wait(350*(2**attempt));continue}
    const help=res.status===401?"Check NOTION_TOKEN":
      res.status===403||res.status===404?"Check database link and share it with the connection":
      res.status===429?"Notion rate limit reached; try again":"Check Notion property types and connection access";
    // Do not print API response bodies; public Actions logs must not expose source content or credentials.
    throw Error("Notion API returned HTTP "+res.status+". "+help+".");
  }
}
export async function connectNotion({token,databaseId,dataSourceId,fetchImpl=fetch}){
  if(!token)throw Error("Missing NOTION_TOKEN secret");
  if(!databaseId&&!dataSourceId)throw Error("Set NOTION_DATABASE_ID (link or ID) or NOTION_DATA_SOURCE_ID");
  let id=dataSourceId?notionId(dataSourceId):null;
  if(!id){
    const database=await requestNotion({token,fetchImpl,url:API+"/databases/"+notionId(databaseId)});
    if(!Array.isArray(database.data_sources)||database.data_sources.length===0)
      throw Error("Database contains no accessible data sources");
    if(database.data_sources.length>1)
      throw Error("Database has multiple data sources; set NOTION_DATA_SOURCE_ID to choose the correct one");
    id=notionId(database.data_sources[0].id);
  }
  const ds=await requestNotion({token,fetchImpl,url:API+"/data_sources/"+id});
  const statusType=validateSchema(ds);
  return {id,statusType};
}
export async function fetchPublishedProfiles({token,databaseId,dataSourceId,fetchImpl=fetch}){
  const {id,statusType}=await connectNotion({token,databaseId,dataSourceId,fetchImpl});
  const items=[], seen=new Set();
  let cursor=null;
  for(let pageNo=0;pageNo<100;pageNo++){
    const result=await requestNotion({token,fetchImpl,method:"POST",
      url:API+"/data_sources/"+id+"/query",
      body:{page_size:100,filter:{property:"Status",[statusType]:{equals:"Published"}},...(cursor?{start_cursor:cursor}:{})}
    });
    if(!Array.isArray(result.results))throw Error("Notion returned an invalid page of results");
    for(const row of result.results){
      if(row.in_trash||row.archived)continue;
      const p=mapNotionPage(row);
      if(p.status!=="Published")continue; // Defense in depth
      const issues=validateStory(p);
      if(issues.length)throw Error("Published Notion row "+(items.length+1)+" is incomplete: "+issues.join(", ")+". Snapshot not changed.");
      if(seen.has(p.slug))throw Error("Duplicate public story slug. Snapshot not changed.");
      seen.add(p.slug);items.push(p);
    }
    if(!result.has_more)break;
    if(!result.next_cursor)throw Error("Notion pagination was incomplete. Snapshot not changed.");
    cursor=result.next_cursor;
    if(pageNo===99)throw Error("Notion pagination exceeded safety limit");
  }
  if(!items.length)throw Error("No complete Published stories in Notion; refusing to overwrite existing demo catalog");
  return items.sort((a,b)=>a.role.localeCompare(b.role)||a.name.localeCompare(b.name));
}
