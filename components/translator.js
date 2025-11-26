const americanOnly = require('./american-only.js');
const britishOnly = require('./british-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');

class Translator {

  constructor() {
    // Invertir títulos y spelling para británico→americano
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

  translate(text, locale) {
    let result = text;

    if (locale === 'american-to-british') {
      result = this.translateAmericanToBritish(result);
    } else if (locale === 'british-to-american') {
      result = this.translateBritishToAmerican(result);
    }

    return result;
  }

  translateAmericanToBritish(text) {
    let result = text;

    // 1) Títulos (Mr. → Mr, etc.)
    Object.keys(americanToBritishTitles).forEach(usTitle => {
      const ukTitle = americanToBritishTitles[usTitle];
      const regex = new RegExp(`\\b${usTitle}`, 'gi');
      result = result.replace(regex, match => {
        const out = match[0] === match[0].toUpperCase()
          ? ukTitle.charAt(0).toUpperCase() + ukTitle.slice(1)
          : ukTitle;
        return this.highlight(out);
      });
    });

    // 2) Spelling (favorite → favourite, etc.)
    Object.keys(americanToBritishSpelling).forEach(us => {
      const uk = americanToBritishSpelling[us];
      const regex = new RegExp(`\\b${us}\\b`, 'gi');
      result = result.replace(regex, match => {
        const out = match[0] === match[0].toUpperCase()
          ? uk.charAt(0).toUpperCase() + uk.slice(1)
          : uk;
        return this.highlight(out);
      });
    });

    // 3) American-only (trashcan → bin, etc.)
    Object.keys(americanOnly).sort((a, b) => b.length - a.length).forEach(us => {
      const uk = americanOnly[us];
      const regex = new RegExp(`\\b${us}\\b`, 'gi');
      result = result.replace(regex, match => {
        const out = match[0] === match[0].toUpperCase()
          ? uk.charAt(0).toUpperCase() + uk.slice(1)
          : uk;
        return this.highlight(out);
      });
    });

    // 4) Horas 3:15 → 3.15
    result = result.replace(/(\d{1,2}):(\d{2})/g, (_m, h, m) => {
      return this.highlight(`${h}.${m}`);
    });

    return result;
  }

  translateBritishToAmerican(text) {
    let result = text;

    // 1) Títulos (Mr → Mr., etc.)
    Object.keys(this.britishToAmericanTitles).forEach(ukTitle => {
      const usTitle = this.britishToAmericanTitles[ukTitle];
      const regex = new RegExp(`\\b${ukTitle}`, 'gi');
      result = result.replace(regex, match => {
        const out = match[0] === match[0].toUpperCase()
          ? usTitle.charAt(0).toUpperCase() + usTitle.slice(1)
          : usTitle;
        return this.highlight(out);
      });
    });

    // 2) Spelling (favourite → favorite, etc.)
    Object.keys(this.britishToAmericanSpelling).forEach(uk => {
      const us = this.britishToAmericanSpelling[uk];
      const regex = new RegExp(`\\b${uk}\\b`, 'gi');
      result = result.replace(regex, match => {
        const out = match[0] === match[0].toUpperCase()
          ? us.charAt(0).toUpperCase() + us.slice(1)
          : us;
        return this.highlight(out);
      });
    });

    // 3) British-only (car boot sale → swap meet, etc.)
    Object.keys(britishOnly).sort((a, b) => b.length - a.length).forEach(uk => {
      const us = britishOnly[uk];
      const regex = new RegExp(`\\b${uk}\\b`, 'gi');
      result = result.replace(regex, match => {
        const out = match[0] === match[0].toUpperCase()
          ? us.charAt(0).toUpperCase() + us.slice(1)
          : us;
        return this.highlight(out);
      });
    });

    // 4) Horas 3.15 → 3:15
    result = result.replace(/(\d{1,2})\.(\d{2})/g, (_m, h, m) => {
      return this.highlight(`${h}:${m}`);
    });

    return result;
  }

}

module.exports = Translator;
