import axios from 'axios';

/**
 * Base class for random generators that 
 * retrieve data from remote sources
 */
export class Generator {
  // url endpoint
  source: string

  constructor() {
    this.source = ''
  }

  // REST API data retrieval from remote source
  async retrieve(url: string) {
    return axios.get(url)
    .then((response) => response.data)
    .catch(() => {}) 
  }

  // Subclasses override to produce desired random message
  async generate() {
    return ""
  }
}

export class InsultGenerator extends Generator {
  constructor() {
    super()
    this.source = 'https://evilinsult.com/generate_insult.php?lang=en&type=json'
  }

  // Generates random insult from Evil Insult API
  override async generate () {
    var data = await super.retrieve(this.source)

    return data.insult
  }
}   

export class ComplimentGenerator extends Generator {
  constructor() {
    super()
    this.source = 'https://complimentr.com/api'
  }

  // Generates random compliment from Complimentr API
  override async generate () {
    var data = await super.retrieve(this.source)

    return data.compliment
  }
}

export class JokeGenerator extends Generator {
  constructor() {
    super()
    this.source = 'https://v2.jokeapi.dev/joke/Any'
  }

  // Generates random joke from Joke API
  override async generate () {
    var data = await super.retrieve(this.source)

    return `${data.setup}\n\n${data.delivery}`
  }
}   