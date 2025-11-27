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

  // Escapar texto para usar en RegExp
  escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  highlight(text) {
    return `<span class="highlight">${text}</span>`;
  }

  // Por defecto highlight = true (API),
  // pero los tests unitarios pasan true/false explícitamente
  translate(text, locale, highlight = true) {
    if (locale === 'american-to-british') {
      return this.translateAmericanToBritish(text, highlight);
    }
    if (locale === 'british-to-american') {
      return this.translateBritishToAmerican(text, highlight);
    }
    // Si el locale es inválido, lo maneja la ruta /api/translate
    return text;
  }

  // ---------- AMERICAN → BRITISH ----------
  translateAmericanToBritish(text, highlight) {
    let result = text;

    // 1) Títulos (Mr. -> Mr, etc.)
    Object.keys(americanToBritishTitles).forEach(usTitle => {
      const ukTitle = americanToBritishTitles[usTitle];
      const pattern = '\\b' + this.escapeRegExp(usTitle);
      const regex = new RegExp(pattern, 'gi');
      result = result.replace(regex, match => {
        // Conservamos la mayúscula inicial
        let out = ukTitle;
        if (match[0] === match[0].toUpperCase()) {
          out = out.charAt(0).toUpperCase() + out.slice(1);
        }
        return highlight ? this.highlight(out) : out;
      });
    });

    // 2) Spelling (favorite -> favourite, etc.)
    Object.keys(americanToBritishSpelling).forEach(usWord => {
      const ukWord = americanToBritishSpelling[usWord];
      const pattern = '\\b' + this.escapeRegExp(usWord) + '\\b';
      const regex = new RegExp(pattern, 'gi');
      result = result.replace(regex, match => {
        let out = ukWord;
        if (match[0] === match[0].toUpperCase()) {
          out = out.charAt(0).toUpperCase() + out.slice(1);
        }
        return highlight ? this.highlight(out) : out;
      });
    });

    // 3) Palabras/frases americanOnly (trashcan -> bin, etc.)
    Object.keys(americanOnly)
      .sort((a, b) => b.length - a.length)
      .forEach(usExpr => {
        const ukExpr = americanOnly[usExpr];
        const pattern = '\\b' + this.escapeRegExp(usExpr) + '\\b';
        const regex = new RegExp(pattern, 'gi');
        result = result.replace(regex, match => {
          let out = ukExpr;
          if (match[0] === match[0].toUpperCase()) {
            out = out.charAt(0).toUpperCase() + out.slice(1);
          }
          return highlight ? this.highlight(out) : out;
        });
      });

    // 4) Horas (12:15 -> 12.15)
    result = result.replace(/\b(\d{1,2}):(\d{2})\b/g, (_m, h, m) => {
      const out = `${h}.${m}`;
      return highlight ? this.highlight(out) : out;
    });

    return result;
  }

  // ---------- BRITISH → AMERICAN ----------
  translateBritishToAmerican(text, highlight) {
    let result = text;

    // 1) Títulos (Mr -> Mr., etc.) usando diccionario invertido
    Object.keys(this.britishToAmericanTitles).forEach(ukTitle => {
      const usTitle = this.britishToAmericanTitles[ukTitle]; // con punto
      const pattern = '\\b' + this.escapeRegExp(ukTitle) + '\\b';
      const regex = new RegExp(pattern, 'gi');
      result = result.replace(regex, match => {
        let out = usTitle;
        if (match[0] === match[0].toUpperCase()) {
          out = out.charAt(0).toUpperCase() + out.slice(1);
        }
        return highlight ? this.highlight(out) : out;
      });
    });

    // 2) Spelling (favourite -> favorite, etc.)
    Object.keys(this.britishToAmericanSpelling).forEach(ukWord => {
      const usWord = this.britishToAmericanSpelling[ukWord];
      const pattern = '\\b' + this.escapeRegExp(ukWord) + '\\b';
      const regex = new RegExp(pattern, 'gi');
      result = result.replace(regex, match => {
        let out = usWord;
        if (match[0] === match[0].toUpperCase()) {
          out = out.charAt(0).toUpperCase() + out.slice(1);
        }
        return highlight ? this.highlight(out) : out;
      });
    });

    // 3) Palabras/frases britishOnly (car boot sale -> swap meet, etc.)
    Object.keys(britishOnly)
      .sort((a, b) => b.length - a.length)
      .forEach(ukExpr => {
        const usExpr = britishOnly[ukExpr];
        const pattern = '\\b' + this.escapeRegExp(ukExpr) + '\\b';
        const regex = new RegExp(pattern, 'gi');
        result = result.replace(regex, match => {
          let out = usExpr;
          if (match[0] === match[0].toUpperCase()) {
            out = out.charAt(0).toUpperCase() + out.slice(1);
          }
          return highlight ? this.highlight(out) : out;
        });
      });

    // 4) Horas (4.30 -> 4:30)
    result = result.replace(/\b(\d{1,2})\.(\d{2})\b/g, (_m, h, m) => {
      const out = `${h}:${m}`;
      return highlight ? this.highlight(out) : out;
    });

    return result;
  }
}

module.exports = Translator;
