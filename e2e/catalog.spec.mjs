import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

// Use the approved committed catalog, not a fixed story count.
const published = JSON.parse(await readFile(new URL("../data/profiles.json", import.meta.url), "utf8"));
if (!Array.isArray(published) || published.length === 0) throw Error("Need a nonempty approved public catalog");
const first = published[0];
const countText = n => n + " " + (n === 1 ? "story" : "stories");

test("directory shows approved stories and conspicuous fictional disclosure", async ({ page }) => {
  await page.goto("./");
  await expect(page.locator(".cards .card")).toHaveCount(published.length);
  await expect(page.locator("#count")).toHaveText(countText(published.length));
  await expect(page.getByRole("heading", { name: "A career begins with a story." })).toBeVisible();
  await expect(page.locator(".prototype")).toContainText("Fictional stories");
  await expect(page.locator("meta[name=robots]")).toHaveAttribute("content", "noindex, nofollow");
  for (const p of published) await expect(page.locator(".card").filter({ hasText: p.name })).toHaveCount(1);
});

test("phone/tablet/desktop have visible controls, fitting cards and no horizontal overflow", async ({ page, browserName }, info) => {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto("./");
    await expect(page.locator(".cards .card")).toHaveCount(published.length);
    const layout = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
      controls: [...document.querySelectorAll("#search,#major,#field,#level,#clear")].map(el => {
        const b=el.getBoundingClientRect();
        return { name:el.id, x:b.x, right:b.right, height:b.height };
      }),
    }));
    expect(layout.scroll, browserName+" scroll overflow at "+width).toBeLessThanOrEqual(layout.viewport+1);
    for (const control of layout.controls) {
      expect(control.x, control.name+" left boundary "+width).toBeGreaterThanOrEqual(-1);
      expect(control.right, control.name+" right boundary "+width).toBeLessThanOrEqual(width+1);
      expect(control.height, control.name+" tap target "+width).toBeGreaterThanOrEqual(43);
    }
    if (published.length>1) {
      const a=await page.locator(".card").first().boundingBox();
      const b=await page.locator(".card").nth(1).boundingBox();
      expect(a).not.toBeNull(); expect(b).not.toBeNull();
      if (width===375) expect(Math.abs(a.x-b.x)).toBeLessThan(2);
      else expect(Math.abs(a.x-b.x)).toBeGreaterThan(5);
    }
    await info.attach(browserName+" "+width+"px full-page screenshot", {
      body: await page.screenshot({fullPage:true}),
      contentType:"image/png",
    });
  }
});

test("search explains why a story matched and persists on reload", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("searchbox", {name:"Search stories"}).fill(first.role);
  const matching=page.locator(".card").filter({hasText:first.name});
  await expect(matching).toHaveCount(1);
  await expect(matching.locator(".match")).toContainText("Career title match");
  await expect(page).toHaveURL(/\?q=/);
  await page.reload();
  await expect(page.locator("#search")).toHaveValue(first.role);
  await expect(page.locator(".card").filter({hasText:first.name})).toHaveCount(1);
});

test("major, field and experience compose with AND; URLs restore the filters", async ({ page }) => {
  await page.goto("./");
  await page.locator("#major").selectOption({label:first.major[0]});
  await page.locator("#field").selectOption({label:first.field});
  if(first.level)await page.locator("#level").selectOption({label:first.level});
  const expected=published.filter(p=>p.major.includes(first.major[0])&&p.field===first.field&&(!first.level||p.level===first.level));
  await expect(page.locator(".card")).toHaveCount(expected.length);
  await page.reload();
  await expect(page.locator("#major")).toHaveValue(first.major[0]);
  await expect(page.locator("#field")).toHaveValue(first.field);
  const other=published.find(p=>p.field!==first.field);
  if(other){
    await page.locator("#field").selectOption({label:other.field});
    await expect(page.locator(".card")).toHaveCount(0);
    await expect(page.locator("#empty")).toBeVisible();
  }
});

test("empty results offer recovery and reset URL/filter values", async ({ page }) => {
  await page.goto("./");
  await page.locator("#search").fill("zzzz-not-a-career");
  await expect(page.locator(".card")).toHaveCount(0);
  await expect(page.locator("#empty")).toBeVisible();
  await expect(page.locator("#count")).toHaveText("0 stories");
  await page.getByRole("button",{name:"Show all stories"}).click();
  await expect(page.locator(".card")).toHaveCount(published.length);
  await expect(page.locator("#search")).toHaveValue("");
  await expect(page).not.toHaveURL(/\?q=/);
});

test("keyboard skip navigation, card activation and back link", async ({ page }) => {
  await page.goto("./");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip")).toBeFocused();
  await expect(page.locator(".skip")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  await expect(page.locator("#main")).toBeFocused();
  await page.locator("#clear").focus();
  await page.keyboard.press("Tab");
  await expect(page.locator(".card").first()).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#profile .profile-cover")).toBeVisible();
  await expect(page.locator("#profile")).toContainText("This profile is fictional");
  await page.locator(".back").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".card")).toHaveCount(published.length);
});

test("missing / unpublished story URL cannot expose an interview", async ({ page }) => {
  await page.goto("./?story=not-a-real-published-profile");
  await expect(page.getByRole("heading",{name:"Story not found"})).toBeVisible();
  await expect(page.locator("#profile")).toContainText("no longer published");
  await expect(page.locator(".card")).toHaveCount(0);
});

test("public data has only Published rows, and browser assets have no fatal errors", async ({ page }) => {
  const errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  page.on("response",response=>{
    if(!response.ok() && /\/(app\.js|styles\.css|profiles\.json|catalog\.js)$/.test(new URL(response.url()).pathname)){
      errors.push("HTTP "+response.status()+" "+response.url());
    }
  });
  await page.goto("./");
  await expect(page.locator(".card")).toHaveCount(published.length);
  const response=await page.request.get("data/profiles.json");
  expect(response.ok()).toBeTruthy();
  const rows=await response.json();
  expect(rows).toHaveLength(published.length);
  for(const row of rows){
    expect(row.status).toBe("Published");
    expect(row.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    expect(row).not.toHaveProperty("notion_token");
  }
  expect(errors).toEqual([]);
});
