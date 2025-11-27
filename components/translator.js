const americanOnly = require('./american-only.js');
const britishOnly = require('./british-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');

class Translator {

  constructor() {

    this.britishToAmericanSpelling = {};
    Object.keys(americanToBritishSpelling).forEach(us => {
      const uk = americanToBritishSpelling[us];
      this.britishToAmericanSpelling[uk] = us;
    });

    this.britishToAmericanTitles = {};
    Object.keys(americanToBritishTitles).forEach(us => {
      const uk = americanToBritishTitles[us];
      this.britishToAmericanTitles[uk] = us;
    });
  }

  highlight(text) {
    return `<span class="highlight">${text}</span>`;
  }

  // 🔥 Highlight activado por default para coincidir con todos los tests FCC
  translate(text, locale, highlight = true) {
    let result = text;

    if (locale === 'american-to-british') {
      result = this.translateAmericanToBritish(result, highlight);
    } else if (locale === 'british-to-american') {
      result = this.translateBritishToAmerican(result, highlight);
    }

    return result;
  }

  translateAmericanToBritish(text, highlight) {
    let result = text;

    // 1. Titles
    Object.keys(americanToBritishTitles).forEach(us => {
      const uk = americanToBritishTitles[us];
      const regex = new RegExp(`\\b${us}`, "gi");
      result = result.replace(regex, m => highlight ? this.highlight(uk) : uk);
    });

    // 2. Spelling
    Object.keys(americanToBritishSpelling).forEach(us => {
      const uk = americanToBritishSpelling[us];
      const regex = new RegExp(`\\b${us}\\b`, "gi");
      result = result.replace(regex, m => highlight ? this.highlight(uk) : uk);
    });

    // 3. Phrases (americanOnly)
    Object.keys(americanOnly).sort((a,b)=>b.length-a.length).forEach(us => {
      const uk = americanOnly[us];
      const regex = new RegExp(`\\b${us}\\b`, "gi");
      result = result.replace(regex, m => highlight ? this.highlight(uk) : uk);
    });

    // 4. Hours (12:15 → 12.15)
    result = result.replace(/(\d{1,2}):(\d{2})/g, (m,h,min)=>{
      const out = `${h}.${min}`;
      return highlight ? this.highlight(out) : out;
    });

    return result;
  }

  translateBritishToAmerican(text, highlight) {
    let result = text;

    // 🔥 FIX TOTAL — agrega punto en títulos (Mrs → Mrs.)
    result = result.replace(/\b(Mr|Mrs|Ms|Dr|Prof)\b\s(?=[A-Z])/g,(m,title)=>{
      const out = `${title}. `;
      return highlight ? this.highlight(out.trim()) : out.trim();
    });

    // 1. Titles dictionary UK → US
    Object.keys(this.britishToAmericanTitles).forEach(uk=>{
      const us = this.britishToAmericanTitles[uk];
      const regex = new RegExp(`\\b${uk}\\b`, "gi");
      result = result.replace(regex, m => highlight ? this.highlight(us) : us);
    });

    // 2. Spelling favourite→favorite
    Object.keys(this.britishToAmericanSpelling).forEach(uk=>{
      const us = this.britishToAmericanSpelling[uk];
      const regex = new RegExp(`\\b${uk}\\b`, "gi");
      result = result.replace(regex, m => highlight ? this.highlight(us) : us);
    });

    // 3. Unique UK phrases
    Object.keys(britishOnly).sort((a,b)=>b.length-a.length).forEach(uk=>{
      const us = britishOnly[uk];
      const regex = new RegExp(`\\b${uk}\\b`, "gi");
      result = result.replace(regex, m=>highlight?this.highlight(us):us);
    });

    // 4. Hours (4.30 → 4:30)
    result = result.replace(/(\d{1,2})\.(\d{2})/g,(m,h,min)=>{
      const out = `${h}:${min}`;
      return highlight ? this.highlight(out) : out;
    });

    return result;
  }
}

module.exports = Translator;
