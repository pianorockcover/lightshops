const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const pagesPath = path.resolve(__dirname, "src");

const pages = fs
    .readdirSync(pagesPath)
    .filter((fileName) => fileName.endsWith(".pug"));


(async () => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    await page.goto("http://localhost:3034");
    await page.screenshot({ path: "./static/images/screenshots/test.png" });

    await browser.close();
})();