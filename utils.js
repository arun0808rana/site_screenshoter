const puppeteer = require("puppeteer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

async function takeSS(url, fileType) {
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({ headless: "new" });
    let base = process.cwd();
    let filename;
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(url);

      if (!fs.existsSync(`${base}/downloads`)) {
        fs.mkdirSync(`${base}/downloads`, { recursive: true });
      }

      if (fileType === "pdf") {
        filename = `${base}/downloads/${uuidv4()}.pdf`;
        await page.pdf({ path: filename, format: "A4" });
      } else {
        filename = `${base}/downloads/${uuidv4()}.png`;
        await page.screenshot({
          path: filename,
          fullPage: true,
        });
      }

      await browser.close();
      resolve(filename);
    } catch (error) {
      await browser.close();
      reject(error);
    }
  });
}

module.exports = takeSS;
