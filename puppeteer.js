const puppeteer = require("puppeteer");
const percySnapshot = require("@percy/puppeteer");
const scrollToBottom = require("scroll-to-bottomjs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:9000/c");
  await percySnapshot(page, "First sight");
  await page.evaluate(scrollToBottom);
  await percySnapshot(page, "Lazy loading");

  await browser.close();
})();
