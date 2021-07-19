var assert = require('assert');
var { ComplimentGenerator, InsultGenerator, JokeGenerator, TriviaGenerator } = require("../src/generators")

describe("Generator tests", () => {
  it('Compliment generator', async function() {
    const generator = new ComplimentGenerator()
    
    const data = await generator.retrieve()

    const phrase = await generator.generate()

    // Check if url source is initialized
    assert.ok(generator.source.length != 0);
    // Check if data is in correct format
    assert.ok(data.hasOwnProperty('compliment'))
    // Check if phrase is not empty
    assert.ok(phrase.length != 0)
  })

  it('Insult generator', async function() {
    const generator = new InsultGenerator()

    const data = await generator.retrieve()
    
    const phrase = await generator.generate()

    assert.ok(generator.source.length != 0);
    assert.ok(data.hasOwnProperty('insult'))
    assert.ok(phrase.length != 0)
  })

  it('Joke generator', async function() {
    const generator = new JokeGenerator()

    const data = await generator.retrieve()
    
    const phrase = await generator.generate()

    assert.ok(generator.source.length != 0);
    assert.ok(data.hasOwnProperty('setup') && 
        data.hasOwnProperty('delivery'))
    assert.ok(phrase.length != 0)
  })

  it('Trivia generator', async function() {
    const generator = new TriviaGenerator()

    const data = await generator.retrieve()
    
    const phrase = await generator.generate()
    
    const question = data.results[0]
    
    assert.ok(generator.source.length != 0);
    assert.ok(question.hasOwnProperty('category') && 
      question.hasOwnProperty('difficulty') && 
      question.hasOwnProperty('question') &&
      question.hasOwnProperty('incorrect_answers') &&
      question.hasOwnProperty('correct_answer'))
    assert.ok(phrase.length != 0)
  })
});
