import fs from 'node:fs';
import https from 'node:https';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

// fetch the HTML
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);

const body = await response.text();

const $ = cheerio.load(body);

// declare an array to save all image URLs

const imagesLink = [];
const finalImages = [];

// get only the image URLs and push them into "imagesLink"

$("[href$='.jpg']").each(function () {
  const link = $(this).html().split('"');
  imagesLink.push(link[1]);
});

// loop to extract the first 10 images and put them into an array

for (let i = 0; i < 10; i++) {
  const images = imagesLink[i];
  finalImages.push(images);
}

// create a memes folder if it doesn't exist yet
const dir = './memes';
try {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
} catch (err) {
  console.error(err);
}

// loop to download the images and save them in folder 'memes'

for (let i = 0; i < 10; i++) {
  const file = fs.createWriteStream(`./memes/0${i + 1}.jpg`);
  https.get(finalImages[i], function (no) {
    no.pipe(file);
  });
}
