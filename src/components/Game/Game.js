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

  const lastGuess = guessResults[
    guessResults.length - 1
  ]

  const isGuessCorrect = (lastGuess === answer)
  const isLimitReached = (guessResults.length === NUM_OF_GUESSES_ALLOWED)

  const disableInput = isGuessCorrect || isLimitReached

  return <>
    {isGuessCorrect && <div className='happy banner'>
      <p>
        <strong>Congratulations!</strong> Got it in{' '}
        <strong>{guessResults.length} guesses</strong>.
      </p>
    </div>}
    {isLimitReached &&
      <div className='sad banner'>
        <p>
          Sorry, the correct answer is <strong>{answer}</strong>.
        </p>
      </div>}
    <GuessResults
      guessResults={guessResults}
      answer={answer}
    />
    <form
      onSubmit={handleSubmit}
      className='guess-input-wrapper'
    >
      <label htmlFor='guess-input'>Enter guess:</label>
      <input
        disabled={disableInput}
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
