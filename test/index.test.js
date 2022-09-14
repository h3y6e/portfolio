const puppeteer = require("puppeteer");
const percySnapshot = require("@percy/puppeteer");
const scrollToBottom = require("scroll-to-bottomjs");

const platform = require("os").platform();
const puppeteerArgs = /^win/.test(platform) ? [] : ["--single-process"];

describe("Integration test with visual testing:", function () {
  this.timeout(60000);
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: puppeteerArgs
    });
    page = await browser.newPage();
    await page.goto("http://localhost:9000/");
    await new Promise(r => setTimeout(r, 500));
  });

  after(() => {
    browser.close();
  });

  it("First sight", async function () {
    await percySnapshot(page, this.test.fullTitle());
  });

  it("Lazy loading", async function () {
    await page.evaluate(scrollToBottom);
    await percySnapshot(page, this.test.fullTitle());
  });
});
