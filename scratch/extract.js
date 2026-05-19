const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = 'c:\\Users\\VicTus\\Documents\\Kì 8\\MLN101-main\\Giáo trình Triết học Mác - Lênin MLN111.pdf';
const outputPath = 'extracted_theory.txt';

async function run() {
  const dataBuffer = fs.readFileSync(pdfPath);
  
  let pageNum = 0;
  const pagesText = [];
  
  function render_page(pageData) {
    pageNum++;
    return pageData.getTextContent()
      .then(function(textContent) {
        let text = textContent.items.map(item => item.str).join(' ');
        pagesText.push({ page: pageNum, text });
        return text;
      });
  }

  try {
    await pdf(dataBuffer, { pagerender: render_page });
    console.log(`Total pages parsed: ${pageNum}`);
    
    let nonZeroPages = 0;
    let ch3Pages = [];
    
    for (let i = 0; i < pageNum; i++) {
      const text = pagesText[i].text.trim();
      if (text.length > 0) {
        nonZeroPages++;
        if (text.toUpperCase().includes('CHƯƠNG III') || text.toUpperCase().includes('CHƯƠNG 3') || text.toUpperCase().includes('DUY VẬT LỊCH SỬ')) {
          ch3Pages.push(pagesText[i]);
        }
      }
    }
    
    console.log(`Pages with searchable text: ${nonZeroPages} / ${pageNum}`);
    console.log(`Pages mentioning Chapter III: ${ch3Pages.map(p => p.page).join(', ')}`);
    
    if (ch3Pages.length > 0) {
      const fullText = ch3Pages.map(p => `--- PAGE ${p.page} ---\n${p.text}`).join('\n\n');
      fs.writeFileSync(outputPath, fullText, 'utf8');
      console.log(`Saved ${ch3Pages.length} Chapter III pages to ${outputPath}`);
    } else {
      console.log('No pages matching Chapter III found.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
