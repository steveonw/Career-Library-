/* Node >=20. Pull published demo records from a Notion data source.
 * Credentials only exist on the machine running this script / in CI secrets.
 * Do not run on the browser. The script writes a public JSON snapshot.
 */
import {writeFile,mkdir,readFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";
import {isPublished} from "../lib/catalog.js";
const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const token=process.env.NOTION_TOKEN,dataSourceId=process.env.NOTION_DATA_SOURCE_ID;
if(!token||!dataSourceId){console.error("Set NOTION_TOKEN and NOTION_DATA_SOURCE_ID to sync. Existing sample stories are unchanged.");process.exit(2)}
const text=prop=>(prop?.rich_text||prop?.title||[]).map(x=>x.plain_text||"").join("");
const select=prop=>prop?.select?.name||"";
const list=prop=>prop?.multi_select?.map(x=>x.name)||[];
const slugify=x=>x.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
function map(page){
 const p=page.properties||{}, role=text(p.Role), name=text(p.Name),slug=slugify(text(p.Slug)||role+"-"+name);
 return {slug,name,role,major:list(p.Major),field:select(p["Career Field"]),level:select(p["Experience Level"]),interests:list(p.Interests),summary:text(p.Summary),journey:text(p.Journey),advice:text(p.Advice),skills:list(p.Skills),status:select(p.Status)}
}
async function main(){
 let cursor,rows=[],pageCount=0;
 do{
  const body={page_size:100,...(cursor?{start_cursor:cursor}:{})};
  const res=await fetch("https://api.notion.com/v1/data_sources/"+encodeURIComponent(dataSourceId)+"/query",{method:"POST",headers:{"Authorization":"Bearer "+token,"Notion-Version":"2025-09-03","Content-Type":"application/json"},body:JSON.stringify(body)});
  if(!res.ok)throw Error("Notion API "+res.status+": "+(await res.text()).slice(0,250));
  const json=await res.json();rows.push(...json.results.map(map));cursor=json.has_more?json.next_cursor:null;
  if(++pageCount>100)throw Error("Too many pages; check pagination");
 }while(cursor);
 const published=rows.filter(isPublished),slugs=new Set();
 for(const p of published){if(slugs.has(p.slug))throw Error("Duplicate slug: "+p.slug);slugs.add(p.slug)}
 if(!published.length)throw Error("No valid published profiles; refusing to overwrite existing snapshot");
 const target=path.join(ROOT,"data","profiles.json");await mkdir(path.dirname(target),{recursive:true});
 await writeFile(target,JSON.stringify(published,null,2)+"\n");console.log("Wrote "+published.length+" published profiles");
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
