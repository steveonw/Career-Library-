/* Server-side one-way import, never a browser request.
 * GitHub Actions can preview or publish the generated PUBLIC snapshot.
 */
import {readFile,writeFile,rename,rm} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";
import {fetchPublishedProfiles} from "./notion-client.mjs";
const output=fileURLToPath(new URL("../data/profiles.json",import.meta.url));
try{
  const records=await fetchPublishedProfiles({
    token:process.env.NOTION_TOKEN,
    databaseId:process.env.NOTION_DATABASE_ID,
    dataSourceId:process.env.NOTION_DATA_SOURCE_ID
  });
  const next=JSON.stringify(records,null,2)+"\n";
  const prior=await readFile(output,"utf8").catch(e=>{if(e.code==="ENOENT")return "";throw e});
  if(prior===next){console.log("Notion sync: "+records.length+" published stories; catalog unchanged.");process.exit(0)}
  const temp=output+".tmp-"+process.pid;
  try{await writeFile(temp,next,{mode:0o600});await rename(temp,output)}
  finally{await rm(temp,{force:true})}
  console.log("Notion sync: staged "+records.length+" published fictional stories in public catalog.");
  console.log("Review data/profiles.json before sharing or committing. Drafts are excluded.");
}catch(e){
  console.error("Notion sync failed:",e.message);
  process.exitCode=1;
}
