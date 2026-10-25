/* Publish only allowlisted static assets, never GitHub configs or Notion secrets. */
import {readFile,copyFile,mkdir,rm,writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";

const root=fileURLToPath(new URL("..",import.meta.url));
const out=path.join(root,"dist");
const assets=["index.html","styles.css","app.js","lib/catalog.js","data/profiles.json"];

const stories=JSON.parse(await readFile(path.join(root,"data/profiles.json"),"utf8"));
if(!Array.isArray(stories)||stories.length===0)throw Error("Refusing to build an empty career catalog");
const seen=new Set();
for(const story of stories){
  if(story.status!=="Published"||!story.slug||!story.name||!story.role||!story.summary||!Array.isArray(story.major)||!story.major.length||!story.field)
    throw Error("Cannot publish incomplete or draft story: "+(story.slug||"(missing slug)"));
  if(seen.has(story.slug))throw Error("Duplicate story slug in public catalog: "+story.slug);
  seen.add(story.slug);
}
await rm(out,{recursive:true,force:true});
for(const relative of assets){
  const dest=path.join(out,relative);
  await mkdir(path.dirname(dest),{recursive:true});
  await copyFile(path.join(root,relative),dest);
}
await writeFile(path.join(out,".nojekyll"),"");
console.log("Prepared GitHub Pages bundle: "+stories.length+" published fictional profiles and "+assets.length+" public files. No repository scripts or tokens included.");
