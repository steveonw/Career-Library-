import test from "node:test";
import assert from "node:assert/strict";
import {notionId,mapNotionPage,validateSchema,connectNotion,fetchPublishedProfiles} from "../scripts/notion-client.mjs";
const UUID="0123456789abcdef0123456789abcdef";
const text=s=>({rich_text:[{plain_text:s}]});
const title=s=>({title:[{plain_text:s}]});
const sel=s=>({select:{name:s}});
const status=s=>({status:{name:s}});
const multi=(...v)=>({multi_select:v.map(name=>({name}))});
const columns={Name:{type:"title"},Role:{type:"rich_text"},Major:{type:"multi_select"},"Career Field":{type:"select"},Summary:{type:"rich_text"},Status:{type:"select"}};
const page=(name="Maya Chen",s=sel("Published"))=>({properties:{
 Name:title(name),Role:text("Software Engineer"),Major:multi("Computer Science"),
 "Career Field":sel("Technology"),Summary:text("Fictional professional journey for a demo"),
 Journey:text("From a campus project to a first job"),Advice:text("Ask questions"),
 Status:s
}});
function mock({schema=columns,rows=[page()],extra={}}={}){
 const calls=[];
 const fetchImpl=async(url,opts={})=>{
  calls.push({url,opts});
  if(url.includes("/databases/"))return {ok:true,async json(){return {data_sources:[{id:UUID}]}}};
  if(url.includes("/data_sources/")&&!url.endsWith("/query"))return {ok:true,async json(){return {properties:schema}}};
  if(url.endsWith("/query"))return {ok:true,async json(){return {results:rows,has_more:false,next_cursor:null}}};
  throw Error("Unexpected URL "+url)
 };
 return {fetchImpl,calls,...extra}
}
test("Notion ID accepts a pasted database link",()=>{
 assert.equal(notionId("https://www.notion.so/Workspace/My-Career-Library-"+UUID+"?v=other"),UUID);
 assert.equal(notionId(UUID),UUID);
 assert.throws(()=>notionId("not-a-link"),/Invalid/);
});
test("maps plain text, select and status properties",()=>{
 assert.equal(mapNotionPage(page()).slug,"software-engineer-maya-chen");
 assert.equal(mapNotionPage(page("Lena Park",status("Published"))).status,"Published");
});
test("validates required column types",()=>{
 assert.equal(validateSchema({properties:columns}),"select");
 assert.equal(validateSchema({properties:{...columns,Status:{type:"status"}}}),"status");
 assert.throws(()=>validateSchema({properties:{...columns,Role:{type:"number"}}}),/Role/);
});
test("queries only Published Notion rows and maps site content",async()=>{
 const {fetchImpl,calls}=mock();
 const items=await fetchPublishedProfiles({token:"test-only-token",databaseId:UUID,fetchImpl});
 assert.equal(items.length,1);assert.equal(items[0].name,"Maya Chen");
 const query=calls.find(c=>c.url.endsWith("/query"));
 assert.equal(JSON.parse(query.opts.body).filter.select.equals,"Published");
 assert.equal(query.opts.headers["Notion-Version"],"2025-09-03");
 assert.equal(query.opts.headers.Authorization,"Bearer test-only-token");
});
test("supports a Notion Status-type column",async()=>{
 const {fetchImpl,calls}=mock({schema:{...columns,Status:{type:"status"}},rows:[page("Lena Park",status("Published"))]});
 const records=await fetchPublishedProfiles({token:"fake",dataSourceId:UUID,fetchImpl});
 assert.equal(records[0].status,"Published");
 assert.equal(JSON.parse(calls.find(c=>c.url.endsWith("/query")).opts.body).filter.status.equals,"Published");
});
test("rejects incomplete published records without data loss",async()=>{
 const bad=page();bad.properties.Summary=text("");
 await assert.rejects(fetchPublishedProfiles({token:"fake",dataSourceId:UUID,fetchImpl:mock({rows:[bad]}).fetchImpl}),/incomplete/);
});
test("rejects duplicate slugs",async()=>{
 await assert.rejects(fetchPublishedProfiles({token:"fake",dataSourceId:UUID,fetchImpl:mock({rows:[page(),page()]}).fetchImpl}),/Duplicate/);
});
test("rejects empty public output",async()=>{
 await assert.rejects(fetchPublishedProfiles({token:"fake",dataSourceId:UUID,fetchImpl:mock({rows:[page("Hidden",sel("Draft"))]}).fetchImpl}),/No complete Published/);
});
test("handles API errors without printing tokens",async()=>{
 const fetchImpl=async()=>({ok:false,status:403});
 await assert.rejects(connectNotion({token:"super-private",dataSourceId:UUID,fetchImpl}),e=>e.message.includes("403")&&!e.message.includes("super-private"));
});
test("requires data source selection when multiple exist",async()=>{
 const fetchImpl=async url=>({ok:true,async json(){
  if(url.includes("/databases/"))return {data_sources:[{id:UUID},{id:"abcdefabcdefabcdefabcdefabcdefab"}]};
  return {properties:columns}
 }});
 await assert.rejects(connectNotion({token:"fake",databaseId:UUID,fetchImpl}),/multiple/);
});
