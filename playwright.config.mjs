import { defineConfig, devices } from "@playwright/test";

// Default: test the local static Pages bundle; no Notion token required.
// Optional live-site mode: PLAYWRIGHT_TEST_BASE_URL=https://steveonw.github.io/Career-Library-/ npm run test:e2e
const remoteBaseURL=process.env.PLAYWRIGHT_TEST_BASE_URL;
export default defineConfig({
  testDir:"./e2e",
  fullyParallel:false,
  forbidOnly:Boolean(process.env.CI),
  retries:process.env.CI?1:0,
  workers:process.env.CI?1:undefined,
  timeout:30_000,
  globalTimeout:12*60_000,
  reporter:[["list"],["html",{outputFolder:"playwright-report",open:"never"}]],
  use:{
    baseURL:remoteBaseURL||"http://127.0.0.1:4173/",
    trace:"retain-on-failure",
    screenshot:"only-on-failure",
    actionTimeout:10_000,
  },
  projects:[
    {name:"chromium",use:{...devices["Desktop Chrome"]}},
    {name:"firefox",use:{...devices["Desktop Firefox"]}},
  ],
  webServer:remoteBaseURL?undefined:{
    command:"python3 -m http.server 4173 --bind 127.0.0.1 --directory dist",
    url:"http://127.0.0.1:4173/",
    reuseExistingServer:!process.env.CI,
    timeout:30_000,
  },
});
