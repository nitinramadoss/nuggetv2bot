var assert = require('assert');
var { ComplimentGenerator, InsultGenerator, JokeGenerator } = require("../src/generators")

describe("Generator tests", () => {
  it('Compliment generator', async function() {
    const generator = new ComplimentGenerator()
    
    const data = await generator.retrieve(generator.source)

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

    const data = await generator.retrieve(generator.source)
    
    const phrase = await generator.generate()

    assert.ok(generator.source.length != 0);
    assert.ok(data.hasOwnProperty('insult'))
    assert.ok(phrase.length != 0)
  })

  it('Joke generator', async function() {
    const generator = new JokeGenerator()

    const data = await generator.retrieve(generator.source)
    
    const phrase = await generator.generate()

    assert.ok(generator.source.length != 0);
    assert.ok(data.hasOwnProperty('setup') && 
        data.hasOwnProperty('delivery'))
    assert.ok(phrase.length != 0)
  })
});
