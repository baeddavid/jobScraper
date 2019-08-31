const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://www.indeed.com/jobs?q=full+stack+developer&l=Austin,+TX&jt=fulltime&explvl=entry_level&sort=date';

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.indeed.com/jobs?q=full+stack+developer&l=Austin,+TX&jt=fulltime&explvl=entry_level&sort=date');
    const result = await page.evaluate(() => {
        let titleArr = [];
        for(let i = 0; i < document.querySelectorAll('.title a').length; i++) {
            console.log(document.querySelectorAll('.title a')[0].textContent)
            titleArr.push(document.querySelectorAll('.title a')[i].textContent);
        }
        return titleArr;
    })
    console.log(result);
})()