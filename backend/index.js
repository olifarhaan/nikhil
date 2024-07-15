// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const cors = require('cors');
const { Parser } = require('json2csv');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let companies = [];

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const name = $('meta[property="og:site_name"]').attr('content') || $('title').text();
    const description = $('meta[name="description"]').attr('content');
    const logo = $('link[rel="icon"]').attr('href');
    const facebook = $('a[href*="facebook.com"]').attr('href');
    const linkedin = $('a[href*="linkedin.com"]').attr('href');
    const twitter = $('a[href*="twitter.com"]').attr('href');
    const instagram = $('a[href*="instagram.com"]').attr('href');
    const address = $('address').text();
    const phone = $('a[href^="tel:"]').text();
    const email = $('a[href^="mailto:"]').text();

    // Screenshot with Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot({ encoding: 'base64' });
    await browser.close();

    const company = {
      id: Date.now(),
      name,
      description,
      logo,
      facebook,
      linkedin,
      twitter,
      instagram,
      address,
      phone,
      email,
      screenshot: `data:image/png;base64,${screenshot}`,
    };

    companies.push(company);

    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Error scraping the website' });
  }
});

app.post('/api/save', (req, res) => {
  const company = req.body;
  companies.push(company);
  res.status(201).json(company);
});

app.get('/api/companies', (req, res) => {
  res.json(companies);
});

app.delete('/api/companies/:id', (req, res) => {
  const { id } = req.params;
  companies = companies.filter((company) => company.id !== parseInt(id));
  res.status(204).end();
});

app.get('/api/download', (req, res) => {
  const fields = ['id', 'name', 'description', 'logo', 'facebook', 'linkedin', 'twitter', 'instagram', 'address', 'phone', 'email'];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(companies);

  res.header('Content-Type', 'text/csv');
  res.attachment('companies.csv');
  res.send(csv);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
