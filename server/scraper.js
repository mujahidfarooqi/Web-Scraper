const puppeteer = require('puppeteer-core');
const path = require('path');

// Replace this with the path to your Chrome executable
const CHROME_EXECUTABLE_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function getInsuranceDetails(licensePlate) {
  const browser = await puppeteer.launch({
    executablePath: CHROME_EXECUTABLE_PATH,
    headless: true
  });
  const page = await browser.newPage();

  try {
    // Navigate to the site with the license plate information
    await page.goto(`https://www.nummerplade.net/nummerplade/${licensePlate}.html`, { waitUntil: 'networkidle2' });

    // Wait for the timeline element to be visible
    await page.waitForSelector('#timeline', { timeout: 500 });

    // Extract all relevant insurance details from the timeline
    const insuranceDetails = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('#timeline > li > .card > .card-body'));
      return items.map(item => {
        const rows = Array.from(item.querySelectorAll('.row'));
        const title = rows[0].querySelector('.col-md-4').innerText.trim();
        const date = rows[0].querySelector('.col-md-4.text-muted.text-right').innerText.trim();
        const content = item.querySelector('p.mt-3').innerHTML.trim();
        return { title, date, content };
      });
    });

    await browser.close();
    return insuranceDetails;
  } catch (error) {
    console.error('Error scraping insurance details:', error);
    await browser.close();
    throw error;
  }
}

module.exports = getInsuranceDetails;
