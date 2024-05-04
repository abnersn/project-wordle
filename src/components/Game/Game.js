import React from 'react';

import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { WORDS } from '../../data';
import { sample } from '../../utils';
import GuessResults from '../GuessResults/GuessResults';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guess, setGuess] = React.useState('')
  const [guessResults, setGuessResults] = React.useState([])

  const handleInputGuess = (ev) => {
    const newGuess = ev.target.value.toUpperCase()
    setGuess(newGuess)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (guessResults.length < NUM_OF_GUESSES_ALLOWED) {
      setGuessResults([...guessResults, guess])
    }
  }

  return <>
    <GuessResults
      guessResults={guessResults}
      answer={answer}
    />
    <form
      onSubmit={handleSubmit}
      className='guess-input-wrapper'
    >
      <label for='guess-input'>Enter guess:</label>
      <input
        id='guess-input'
        value={guess}
        minLength={5}
        maxLength={5}
        pattern='[a-zA-Z]{5}'
        type='text'
        onChange={handleInputGuess}
      />
    </form>
  </>;
}

export default Game;
