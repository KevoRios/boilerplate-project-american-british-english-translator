'use strict';

const Translator = require('../components/translator.js');
const translator = new Translator();

module.exports = function (app) {

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      // 1) Faltan campos
      if (text === undefined || locale === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // 2) Texto vacío
      if (text === '') {
        return res.json({ error: 'No text to translate' });
      }

      // 3) Locale inválido
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }

      // 4) Traducir
      const translation = translator.translate(text, locale);

      // 5) Si no hubo cambios
      if (translation === text) {
        return res.json({
          text,
          translation: 'Everything looks good to me!'
        });
      }

      // 6) Respuesta normal
      return res.json({
        text,
        translation
      });
    });
};
