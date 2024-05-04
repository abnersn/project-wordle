import React from 'react';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';
import { range } from '../../utils';

function GuessResults({ guessResults, answer }) {
  return <div className='guess-results'>
    {guessResults.map((guess, i) =>
      <p className='guess' key={`${guess}_${i}`}>
        {checkGuess(guess, answer).map(({ letter, status }, i) =>
          <span key={`${letter}_${i}`} className={`cell ${status}`}>
            {letter}
          </span>
        )}
      </p>
    )}
    {range(NUM_OF_GUESSES_ALLOWED - guessResults.length).map((i) => (
      <p className='guess' key={i}>
        {range(5).map(j => <span key={j} className='cell' />)}
      </p>))}
  </div>;
}

export default GuessResults;
