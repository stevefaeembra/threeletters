import '../index.css';
import Tiler from "./tiler";
import scoreword from '../scorer';
import { Fragment } from 'react';

const GuessRack= (guesses) => {
  if (!guesses) return null;
  const justGuesses = guesses.guesses;
  let total=0;
  justGuesses.forEach(guess => total = total+scoreword(guess))
  
  return (
    <Fragment>
      <div>{ `${justGuesses.length} words, total score ${total}` }</div>
      <div>
        {
          justGuesses.map( wurd=> <Tiler key={wurd} word={wurd} />)
        }
      </div>
    </Fragment>
  );
}

export default GuessRack;
