import {viableGames} from '../viablegames'
import {words} from '../words_alpha'
import scoreword from '../scorer';
import React, { useState, useEffect } from 'react';
import GuessRack from './guessrack';
import Tiler from './tiler';

function Game() {

  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState('Enter guesses above');
  const [timeleft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeleft===0) return;
    setTimeout(() => {
      setTimeLeft(timeleft-1);
    }, 1000);
  });


  const findValidWords = (abjad) => {
    // find words matching the 3 consonants
    const allthewords = words.split(",");
    const c1=abjad[0];
    const c2=abjad[1];
    const c3=abjad[2];
    const matcher = new RegExp(`[a-z]*${c1}[a-z]*${c2}[a-z]*${c3}[a-z]*`);
    let validWords = [];
    for (const word of allthewords) {
      if (word.match(matcher)) {
        validWords.push(word);
      }
    }
    return validWords;
  }

  const now = new Date();
  now.setHours(0,0,0,0);
  const today = parseInt(Math.floor(now.valueOf()/86400000)); 
  const numervalidGames = viableGames.length;
  
  //const todaysgame="trs"  - swap this in for an easy tutorial
  const todaysgame = viableGames[today%numervalidGames];
  
  const abjad = todaysgame.split('')

  const todayswords = findValidWords(abjad);

  const classifyDifficuly = (wordcount) => {
    if (wordcount>16384) return "😀 Easy!";
    if (wordcount>8192) return "🙂 Easyish";
    if (wordcount>4096) return "🤔 Medium";
    if (wordcount>2048) return "😬 Tricky";
    if (wordcount>1024) return "☹️ Difficult";
    if (wordcount>512) return "🥺 Brutal";
    return "😭 Impossible";
  }

  function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomcelebration() {
    const emojis=['😀','😁','🎉','🥳'];
    return emojis[randint(0,emojis.length-1)];
  }

  function randomrejection() {
    const emojis=['💀','😩','😭','😟'];
    return emojis[randint(0,emojis.length-1)];
  }

  function enterWord (event) {
    event.preventDefault();
    const guess = event.currentTarget.elements.enter.value;
    if (todayswords.includes(guess)) {
      if (guesses.includes(guess)) {
        setMessage(`You've already submitted ${guess} 😟`);
        return;
      }       
      setGuesses([...guesses, guess]);
      setMessage(`${guess} scores ${scoreword(guess)} ${randomcelebration()}`);
    } else {
      setMessage(`${guess} in not valid, sorry! ${randomrejection()}`);
    }
    event.currentTarget.elements.enter.value='';
  }

  return (
    <div>
      <section>
        <div className="instructions">
          <ul>
            <li>You have 2 minutes</li>
            <li>Enter words which have the following 3 consonants in the same order</li>
            <li>You can insert as many letters before, after and between as you like</li>
          </ul>
        </div>
        <hr />
        <Tiler word={todaysgame} />
        <h1>{
          timeleft === 0 ? "Time's up!" :
          `Time left : ${timeleft} secs`
        }</h1>
        <p className='instruction'>
          <span className="pill">Game # {today%numervalidGames}</span>
          <span className="pill">Difficulty level :  {classifyDifficuly(todayswords.length)}</span>
          <span className='pill'>{todayswords.length} valid words</span>

        </p>
        {
          timeleft>0 ?
            <form onSubmit={enterWord}>
              <label htmlFor='enter'>Enter word :- </label>
              <input disabled={timeleft===0} id="enter" placeholder="type word"></input>
            </form> : 
            null
        }
        
        <hr />
        {
          timeleft>0 ?
            <h4>{message}</h4>
            : null
        }
        <GuessRack guesses={guesses} />
      </section>
    </div>
  );
}

export default Game;