import '../index.css';
import { scoreforletter } from '../scorer';

const Tiler= (word) => {
  return (
    <div class="tilerrow">
    {
      Array.from(word.word).map((letter,index) => <div key={`${word}_${index}`} className="tile"><span className="letter">&nbsp;{letter.toUpperCase()}</span><span className="score">{scoreforletter(letter)}</span></div>)
    }
    </div>
  )
}

export default Tiler;