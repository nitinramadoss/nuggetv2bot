import axios from 'axios';

/**
 * Interface for all generators
 */
interface IGenerator {
  // Url endpoint
  source: string
  // Random message
  result: string
  // REST API data retrieval from remote source
  retrieve(): Promise<any>
  // Returns desired random message from source
  generate(): Promise<string> 
}

/**
 * Base class for random generators that 
 * retrieve data from remote sources
 */
export class Generator implements IGenerator {
  source: string
  result: string
  constructor() {
    this.source = ''
  }

  async retrieve() {
    return axios.get(this.source)
    .then((response) => response.data)
    .catch(() => {}) 
  }
  // Subclasses override 
  async generate() {
    return ''
  }
}

export class InsultGenerator extends Generator {
  constructor() {
    super()
    this.source = 'https://evilinsult.com/generate_insult.php?lang=en&type=json'
  }

  // Generates random insult from Evil Insult API
  override async generate () {
    var data = await this.retrieve()

    this.result = data.insult

    return this.result
  }
}   

export class ComplimentGenerator extends Generator {
  constructor() {
    super()
    this.source = 'https://complimentr.com/api'
  }

  // Generates random compliment from Complimentr API
  override async generate () {
    var data = await this.retrieve()

    this.result = data.compliment

    return this.result
  }
}

export class JokeGenerator extends Generator {
  constructor() {
    super()
    this.source = 'https://v2.jokeapi.dev/joke/Any'
  }

  // Generates random joke from Joke API
  override async generate () {
    var data = await this.retrieve()

    this.result = `${data.setup}\n\n${data.delivery}`

    return this.result
  }
}   

export class TriviaGenerator extends Generator {
  constructor() {
    super()
    this.source = 'https://opentdb.com/api.php?amount=1'
  }

  // Randomly shuffles trivia answers
  shuffle(array: Array<string>): Array<string> {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  // Generates random trivia question from Open Trivia API
  override async generate () {
    var data = await this.retrieve()
    var question = data.results[0]

    var answers: Array<string> = 
      Array.from(question.incorrect_answers)
    answers.push(question.correct_answer)
    
    answers = this.shuffle(answers)
    
    var choices = ``
    answers.forEach((elem) => choices += `:small_blue_diamond: ${elem}\n
      `)

    this.result = `Welcome to **Trivia Mode**!\n
      __Overview__
      :book: *Category:* ${question.category}\n
      :star: *Difficulty Level:* ${question.difficulty}\n
      :sparkles: Let's begin!\n
      :shushing_face: :shushing_face: :shushing_face:\n
      :grey_question: *Question:* ${question.question}\n
      ${choices}\n
      *Answer:* ||${question.correct_answer}||`

    return this.result
  }
} 