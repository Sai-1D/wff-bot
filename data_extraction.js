import axios from 'axios';
import * as cheerio from 'cheerio'


export async function fetchWebsiteData(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    
    const $ = cheerio.load(html);
    
    const title = $('title').text();
    
    const paragraphs = [];
    $('p').each((index, element) => {
      paragraphs.push($(element).text().trim());
    });
    
    const jsonData = {
      title: title,
      paragraphs: paragraphs
    };
    
    return jsonData;
  } catch (error) {
    console.error('Error fetching website data:', error);
    throw error;
  }
}

