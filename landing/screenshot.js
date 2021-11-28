const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const sharp = require("sharp");

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const viewsPath = "../src";

const screenshotsPath = path.resolve(__dirname, "static/screenshots");

fs.rmdirSync(screenshotsPath, { recursive: true });

const views = fs
    .readdirSync(viewsPath)
    .filter((fileName) => fileName.endsWith(".pug"))
    .map((fileName) => fileName.replace("pug", "html"));

const sleep = (time) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(time);
    }, time);
});


(async () => {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"], defaultViewport: {
            width: 1900,
            height: 1175
        }
    });

    const page = await browser.newPage();

    let demos = `.demos`;

    for (let view of views) {
        console.log(`Screenshot view: ${view}`);
        await page.goto(`http://localhost:3034/${view}`);

        const fileName = view.replace("html", "jpg");
        const filePath = `${screenshotsPath}/${fileName}`;
        const demoUrl = `demos/${view}`;
        const linkText = capitalizeFirstLetter(view.replace(".html", "").replace(new RegExp("-", "g"), " "));

        demos += `\n\ta.demo-link(href="${demoUrl}")\n\t\t.demo-image(style="background-image: url(screenshots/${fileName})" alt="Demo ${view}")\n\t\t| ${linkText}`;

        await sleep(3000);

        await page.screenshot({ path: filePath, fullPage: true });

        const resizedFilePath = `${filePath}-resized`;

        await sharp(filePath)
            .resize({ width: 400 })
            .toFile(resizedFilePath);

        fs.rmSync(filePath);
        fs.renameSync(resizedFilePath, filePath);
    }

    fs.writeFileSync("./src/demos.pug", demos);

    await browser.close();
})();