import {connectNotion} from "./notion-client.mjs";
try{
  const c=await connectNotion({
    token:process.env.NOTION_TOKEN,
    databaseId:process.env.NOTION_DATABASE_ID,
    dataSourceId:process.env.NOTION_DATA_SOURCE_ID
  });
  console.log("Notion connection OK. Required columns valid. Publishing field type:",c.statusType);
  console.log("No stories downloaded and no files changed.");
}catch(e){console.error("Notion connection check failed:",e.message);process.exitCode=1}
