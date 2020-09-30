const puppeteer = require('puppeteer');

async function startScraping(URL) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 0 });

    const linksPage = await page.evaluate(() => {
        return Array
        .from(document.querySelectorAll('.mw-body-content p .mw-redirect'))
        .slice(0, 5)
        .map(elem => ({
            text: elem.innerText,
            href: elem.href
        }));
    });

    await page.close();
    
    return linksPage;
}

module.exports = { startScraping };