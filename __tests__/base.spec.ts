var assert = require('assert');
var { ComplimentGenerator, InsultGenerator, JokeGenerator } = require("../src/generators")

describe("Generator tests", () => {
  it('Compliment generator', async function() {
    const generator = new ComplimentGenerator()
    
    const data = await generator.generate()

    // Check if url source is initialized
    assert.ok(generator.source.length != 0);
    // Check if data is retrived from source
    assert.ok(data.length != 0)
  })

  it('Insult generator', async function() {
    const generator = new InsultGenerator()
    
    const data = await generator.generate()

    assert.ok(generator.source.length != 0);
    assert.ok(data.length != 0)
  })

  it('Joke generator', async function() {
    const generator = new JokeGenerator()
    
    const data = await generator.generate()

    assert.ok(generator.source.length != 0);
    assert.ok(data.length != 0)
  })
});
