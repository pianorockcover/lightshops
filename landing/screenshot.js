const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const viewsPath = "../src";

const screenshotsPath = path.resolve(__dirname, "static/screenshots");

if (!fs.existsSync("static")) {
    fs.mkdirSync("static");
}

if (fs.existsSync(screenshotsPath)) {
    fs.rmdirSync(screenshotsPath, { recursive: true });
}

fs.mkdirSync(screenshotsPath);

const views = fs
    .readdirSync(viewsPath)
    .filter((fileName) => fileName.endsWith(".pug"))
    .map((fileName) => fileName.replace("pug", "html"));


(async () => {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"], defaultViewport: {
            width: 1900,
            height: 1188
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

        demos += `\n\ta.demo-link(href="${demoUrl}")\n\t\timg.demo-image(src="screenshots/${fileName}" alt="Demo ${view}")\n\t\t| ${linkText}`;

        await page.screenshot({ path: filePath });
    }

    fs.writeFileSync("./src/demos.pug", demos);

    await browser.close();
})();