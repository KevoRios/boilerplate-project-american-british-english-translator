const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {

  // -------------------------
  // American → British
  // -------------------------
  suite('American to British', () => {
    test('Mangoes are my favorite fruit.', () => {
      const input = 'Mangoes are my favorite fruit.';
      const expected =
        'Mangoes are my <span class="highlight">favourite</span> fruit.';
      assert.equal(translator.translate(input, 'american-to-british'), expected);
    });

    test('I ate yogurt for breakfast.', () => {
      const input = 'I ate yogurt for breakfast.';
      const expected =
        'I ate <span class="highlight">yoghurt</span> for breakfast.';
      assert.equal(translator.translate(input, 'american-to-british'), expected);
    });

    test("We had a party at my friend's condo.", () => {
      const input = "We had a party at my friend's condo.";
      const expected =
        "We had a party at my friend's <span class=\"highlight\">flat</span>.";
      assert.equal(translator.translate(input, 'american-to-british'), expected);
    });

    test('Can you toss this in the trashcan for me?', () => {
      const input = 'Can you toss this in the trashcan for me?';
      const expected =
        'Can you toss this in the <span class="highlight">bin</span> for me?';
      assert.equal(translator.translate(input, 'american-to-british'), expected);
    });

    test('The parking lot was full.', () => {
      const input = 'The parking lot was full.';
      const expected =
        'The <span class="highlight">car park</span> was full.';
      assert.equal(translator.translate(input, 'american-to-british'), expected);
    });

    test('Like a high tech Rube Goldberg machine.', () => {
      const input = 'Like a high tech Rube Goldberg machine.';
      const expected =
        'Like a high tech <span class="highlight">Heath Robinson device</span>.';
      assert.equal(translator.translate(input, 'american-to-british'), expected);
    });

    test('To play hooky means to skip class or work.', () => {
      const input = 'To play hooky means to skip class or work.';
      const expected =
        'To <span class="highlight">bunk off</span> means to skip class or work.';
      assert.equal(translator.translate(input, 'american-to-british'), expected);
    });

    test('No Mr. Bond, I expect you to die.', () => {
      const input = 'No Mr. Bond, I expect you to die.';
      const expected =
        'No <span class="highlight">Mr</span> Bond, I expect you to die.';
      assert.equal(translator.translate(input, 'american-to-british'), expected);
    });

    test('Dr. Grosh will see you now.', () => {
      const input = 'Dr. Grosh will see you now.';
      const expected =
        '<span class="highlight">Dr</span> Grosh will see you now.';
      assert.equal(translator.translate(input, 'american-to-british'), expected);
    });

    test('Lunch is at 12:15 today.', () => {
      const input = 'Lunch is at 12:15 today.';
      const expected =
        'Lunch is at <span class="highlight">12.15</span> today.';
      assert.equal(translator.translate(input, 'american-to-british'), expected);
    });
  });

  // -------------------------
  // British → American
  // -------------------------
  suite('British to American', () => {
    test('We watched the footie match for a while.', () => {
      const input = 'We watched the footie match for a while.';
      const expected =
        'We watched the <span class="highlight">soccer</span> match for a while.';
      assert.equal(translator.translate(input, 'british-to-american'), expected);
    });

    test('Paracetamol takes up to an hour to work.', () => {
      const input = 'Paracetamol takes up to an hour to work.';
      const expected =
        '<span class="highlight">Tylenol</span> takes up to an hour to work.';
      assert.equal(translator.translate(input, 'british-to-american'), expected);
    });

    test('First, caramelise the onions.', () => {
      const input = 'First, caramelise the onions.';
      const expected =
        'First, <span class="highlight">caramelize</span> the onions.';
      assert.equal(translator.translate(input, 'british-to-american'), expected);
    });

    test('I spent the bank holiday at the funfair.', () => {
      const input = 'I spent the bank holiday at the funfair.';
      const expected =
        'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.';
      assert.equal(translator.translate(input, 'british-to-american'), expected);
    });

    test('I had a bicky then went to the chippy.', () => {
      const input = 'I had a bicky then went to the chippy.';
      const expected =
        'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.';
      assert.equal(translator.translate(input, 'british-to-american'), expected);
    });

    test("I've just got bits and bobs in my bum bag.", () => {
      const input = "I've just got bits and bobs in my bum bag.";
      const expected =
        "I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>.";
      assert.equal(translator.translate(input, 'british-to-american'), expected);
    });

    test('The car boot sale at Boxted Airfield was called off.', () => {
      const input = 'The car boot sale at Boxted Airfield was called off.';
      const expected =
        'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.';
      assert.equal(translator.translate(input, 'british-to-american'), expected);
    });

    test('Have you met Mrs Kalyani?', () => {
      const input = 'Have you met Mrs Kalyani?';
      const expected =
        'Have you met <span class="highlight">Mrs.</span> Kalyani?';
      assert.equal(translator.translate(input, 'british-to-american'), expected);
    });

    test("Prof Joyner of King's College, London.", () => {
      const input = "Prof Joyner of King's College, London.";
      const expected =
        '<span class="highlight">Prof.</span> Joyner of King\'s College, London.';
      assert.equal(translator.translate(input, 'british-to-american'), expected);
    });

    test('Tea time is usually around 4 or 4.30.', () => {
      const input = 'Tea time is usually around 4 or 4.30.';
      const expected =
        'Tea time is usually around 4 or <span class="highlight">4:30</span>.';
      assert.equal(translator.translate(input, 'british-to-american'), expected);
    });
  });

  // -------------------------
  // Highlight tests
  // (repiten algunos casos pero explícitamente
  //  chequean el marcado)
  // -------------------------
  suite('Highlighting', () => {
    test('Highlight translation in "Mangoes are my favorite fruit."', () => {
      const input = 'Mangoes are my favorite fruit.';
      const output = translator.translate(input, 'american-to-british');
      const expected =
        'Mangoes are my <span class="highlight">favourite</span> fruit.';
      assert.equal(output, expected);
    });

    test('Highlight translation in "I ate yogurt for breakfast."', () => {
      const input = 'I ate yogurt for breakfast.';
      const output = translator.translate(input, 'american-to-british');
      const expected =
        'I ate <span class="highlight">yoghurt</span> for breakfast.';
      assert.equal(output, expected);
    });

    test('Highlight translation in "We watched the footie match for a while."', () => {
      const input = 'We watched the footie match for a while.';
      const output = translator.translate(input, 'british-to-american');
      const expected =
        'We watched the <span class="highlight">soccer</span> match for a while.';
      assert.equal(output, expected);
    });

    test('Highlight translation in "Paracetamol takes up to an hour to work."', () => {
      const input = 'Paracetamol takes up to an hour to work.';
      const output = translator.translate(input, 'british-to-american');
      const expected =
        '<span class="highlight">Tylenol</span> takes up to an hour to work.';
      assert.equal(output, expected);
    });
  });

});
