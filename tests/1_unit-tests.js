const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {

  // 1–10: American → British (sin highlight)
  test('Translate Mangoes are my favorite fruit. to British English', (done) => {
    const input = 'Mangoes are my favorite fruit.';
    const expected = 'Mangoes are my favourite fruit.';
    assert.equal(
      translator.translate(input, 'american-to-british', false),
      expected
    );
    done();
  });

  test('Translate I ate yogurt for breakfast. to British English', (done) => {
    const input = 'I ate yogurt for breakfast.';
    const expected = 'I ate yoghurt for breakfast.';
    assert.equal(
      translator.translate(input, 'american-to-british', false),
      expected
    );
    done();
  });

  test("Translate We had a party at my friend's condo. to British English", (done) => {
    const input = "We had a party at my friend's condo.";
    const expected = "We had a party at my friend's flat.";
    assert.equal(
      translator.translate(input, 'american-to-british', false),
      expected
    );
    done();
  });

  test('Translate Can you toss this in the trashcan for me? to British English', (done) => {
    const input = 'Can you toss this in the trashcan for me?';
    const expected = 'Can you toss this in the bin for me?';
    assert.equal(
      translator.translate(input, 'american-to-british', false),
      expected
    );
    done();
  });

  test('Translate The parking lot was full. to British English', (done) => {
    const input = 'The parking lot was full.';
    const expected = 'The car park was full.';
    assert.equal(
      translator.translate(input, 'american-to-british', false),
      expected
    );
    done();
  });

  test('Translate Like a high tech Rube Goldberg machine. to British English', (done) => {
    const input = 'Like a high tech Rube Goldberg machine.';
    const expected = 'Like a high tech Heath Robinson device.';
    assert.equal(
      translator.translate(input, 'american-to-british', false),
      expected
    );
    done();
  });

  test('Translate To play hooky means to skip class or work. to British English', (done) => {
    const input = 'To play hooky means to skip class or work.';
    const expected = 'To bunk off means to skip class or work.';
    assert.equal(
      translator.translate(input, 'american-to-british', false),
      expected
    );
    done();
  });

  test('Translate No Mr. Bond, I expect you to die. to British English', (done) => {
    const input = 'No Mr. Bond, I expect you to die.';
    const expected = 'No Mr Bond, I expect you to die.';
    assert.equal(
      translator.translate(input, 'american-to-british', false),
      expected
    );
    done();
  });

  test('Translate Dr. Grosh will see you now. to British English', (done) => {
    const input = 'Dr. Grosh will see you now.';
    const expected = 'Dr Grosh will see you now.';
    assert.equal(
      translator.translate(input, 'american-to-british', false),
      expected
    );
    done();
  });

  test('Translate Lunch is at 12:15 today. to British English', (done) => {
    const input = 'Lunch is at 12:15 today.';
    const expected = 'Lunch is at 12.15 today.';
    assert.equal(
      translator.translate(input, 'american-to-british', false),
      expected
    );
    done();
  });

  // 11–20: British → American (sin highlight)
  test('Translate We watched the footie match for a while. to American English', (done) => {
    const input = 'We watched the footie match for a while.';
    const expected = 'We watched the soccer match for a while.';
    assert.equal(
      translator.translate(input, 'british-to-american', false),
      expected
    );
    done();
  });

  test('Translate Paracetamol takes up to an hour to work. to American English', (done) => {
    const input = 'Paracetamol takes up to an hour to work.';
    const expected = 'Tylenol takes up to an hour to work.';
    assert.equal(
      translator.translate(input, 'british-to-american', false),
      expected
    );
    done();
  });

  test('Translate First, caramelise the onions. to American English', (done) => {
    const input = 'First, caramelise the onions.';
    const expected = 'First, caramelize the onions.';
    assert.equal(
      translator.translate(input, 'british-to-american', false),
      expected
    );
    done();
  });

  test('Translate I spent the bank holiday at the funfair. to American English', (done) => {
    const input = 'I spent the bank holiday at the funfair.';
    const expected = 'I spent the public holiday at the carnival.';
    assert.equal(
      translator.translate(input, 'british-to-american', false),
      expected
    );
    done();
  });

  test('Translate I had a bicky then went to the chippy. to American English', (done) => {
    const input = 'I had a bicky then went to the chippy.';
    const expected = 'I had a cookie then went to the fish-and-chip shop.';
    assert.equal(
      translator.translate(input, 'british-to-american', false),
      expected
    );
    done();
  });

  test("Translate I've just got bits and bobs in my bum bag. to American English", (done) => {
    const input = "I've just got bits and bobs in my bum bag.";
    const expected = "I've just got odds and ends in my fanny pack.";
    assert.equal(
      translator.translate(input, 'british-to-american', false),
      expected
    );
    done();
  });

  test('Translate The car boot sale at Boxted Airfield was called off. to American English', (done) => {
    const input = 'The car boot sale at Boxted Airfield was called off.';
    const expected = 'The swap meet at Boxted Airfield was called off.';
    assert.equal(
      translator.translate(input, 'british-to-american', false),
      expected
    );
    done();
  });

  test('Translate Have you met Mrs Kalyani? to American English', (done) => {
    const input = 'Have you met Mrs Kalyani?';
    const expected = 'Have you met Mrs. Kalyani?';
    assert.equal(
      translator.translate(input, 'british-to-american', false),
      expected
    );
    done();
  });

  test("Translate Prof Joyner of King's College, London. to American English", (done) => {
    const input = "Prof Joyner of King's College, London.";
    const expected = "Prof. Joyner of King's College, London.";
    assert.equal(
      translator.translate(input, 'british-to-american', false),
      expected
    );
    done();
  });

  test('Translate Tea time is usually around 4 or 4.30. to American English', (done) => {
    const input = 'Tea time is usually around 4 or 4.30.';
    const expected = 'Tea time is usually around 4 or 4:30.';
    assert.equal(
      translator.translate(input, 'british-to-american', false),
      expected
    );
    done();
  });

  // 21–24: Tests de highlight
  test('Highlight translation in Mangoes are my favorite fruit.', (done) => {
    const input = 'Mangoes are my favorite fruit.';
    const expected =
      'Mangoes are my <span class="highlight">favourite</span> fruit.';
    assert.equal(
      translator.translate(input, 'american-to-british', true),
      expected
    );
    done();
  });

  test('Highlight translation in I ate yogurt for breakfast.', (done) => {
    const input = 'I ate yogurt for breakfast.';
    const expected =
      'I ate <span class="highlight">yoghurt</span> for breakfast.';
    assert.equal(
      translator.translate(input, 'american-to-british', true),
      expected
    );
    done();
  });

  test('Highlight translation in We watched the footie match for a while.', (done) => {
    const input = 'We watched the footie match for a while.';
    const expected =
      'We watched the <span class="highlight">soccer</span> match for a while.';
    assert.equal(
      translator.translate(input, 'british-to-american', true),
      expected
    );
    done();
  });

  test('Highlight translation in Paracetamol takes up to an hour to work.', (done) => {
    const input = 'Paracetamol takes up to an hour to work.';
    const expected =
      '<span class="highlight">Tylenol</span> takes up to an hour to work.';
    assert.equal(
      translator.translate(input, 'british-to-american', true),
      expected
    );
    done();
  });

});
