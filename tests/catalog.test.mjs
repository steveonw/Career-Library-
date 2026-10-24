import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {facets,filterProfiles,getProfile,isPublished} from "../lib/catalog.js";

// Unit tests must not depend on the number or identities of stories
// currently published by the Notion editorial workflow.
const makeStory=(slug,role,major,field,skills=[])=>({
  slug,name:"Fictional Test Professional",role,major:[major],field,
  level:"Early career",interests:[],summary:"Fictional test-only career summary",
  journey:"Example career journey",advice:"Example advice",skills,status:"Published"
});
const examples=[
  makeStory("maya-chen","Software Engineer","Computer Science","Technology",["JavaScript"]),
  makeStory("noah-williams","Data Analyst","Mathematics","Technology",["SQL"]),
  makeStory("avery-patel","UX Designer","Psychology","Design",["Research"]),
  makeStory("owen-kim","Teacher","English","Education",["Teaching"])
];

test("fixed test fixtures are valid and unique",()=>{
  assert.ok(examples.every(isPublished));
  assert.equal(new Set(examples.map(p=>p.slug)).size,examples.length);
});
test("filters combine with AND across majors and career fields",()=>{
  assert.deepEqual(filterProfiles(examples,{major:"Computer Science",field:"Technology"}).map(p=>p.slug),["maya-chen"]);
  assert.deepEqual(filterProfiles(examples,{major:"Psychology",field:"Technology"}),[]);
});
test("search checks skills and matches case-insensitively",()=>{
  assert.deepEqual(filterProfiles(examples,{search:"  SQL "}).map(p=>p.slug),["noah-williams"]);
});
test("draft records never appear through search or direct story links",()=>{
  const draft={...examples[0],slug:"draft-record",status:"Draft"};
  assert.equal(getProfile([draft],"draft-record"),undefined);
  assert.equal(filterProfiles([...examples,draft]).length,examples.length);
});
test("facet values are unique",()=>{
  const f=facets(examples);
  assert.ok(f.majors.includes("Psychology"));
  assert.equal(f.fields.filter(x=>x==="Technology").length,1);
});
test("invalid URL slugs are rejected",()=>{
  assert.equal(isPublished({...examples[0],slug:"../../escape"}),false);
});
test("published website snapshot is nonempty, valid and has unique slugs",async()=>{
  const catalog=JSON.parse(await readFile(new URL("../data/profiles.json",import.meta.url),"utf8"));
  assert.ok(Array.isArray(catalog));
  assert.ok(catalog.length>0);
  assert.equal(new Set(catalog.map(p=>p.slug)).size,catalog.length);
  for(const story of catalog){
    assert.ok(isPublished(story),`Invalid or unpublished story: ${story.slug||"(no slug)"}`);
    assert.ok(typeof story.summary==="string"&&story.summary.trim(),`Missing summary: ${story.slug}`);
  }
});
