import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import {randomWord} from './words';
import AlphaButtons from "./AlphaButtons";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord(),showHint:false };
    this.guess = this.guess.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.displayHint = this.displayHint.bind(this);
  }
  restartGame(){
    this.setState({
      answer:randomWord(),
      nWrong:0,
      guessed: new Set()
    })
  }
  getHint(){
    let s1 =[...this.state.answer].filter((val)=>{
      return !this.state.guessed.has(val)
    });
    return s1[Math.floor(Math.random()*s1.length)];
  }
  displayHint(){
    this.setState({showHint:this.state.showHint?false:true})
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** guess: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  guess(letter) {
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      nWrong: st.nWrong + (st.answer.includes(letter) ? 0 : 1)
    }));
  }

  render() {
// game is over if the guesses have exceeded the limit or the correct word has been guessed
    let win=JSON.stringify(this.state.answer.split(""))===JSON.stringify(this.guessedWord());
    let gameOver = this.state.nWrong===this.props.maxWrong|| win;
    return (
      <div className='Hangman'>
        <h1><span style={{color:'#79e6d6'}}>Hang</span>man</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}/${this.props.maxWrong}`} />
        <div className="Hangman-wrong-guesses">Number wrong: {this.state.nWrong}</div>
        <p className='Hangman-word'>{gameOver?this.state.answer:this.guessedWord()}</p>
        <div className='Hangman-btns'>
        {
        gameOver? (win?'Congratulations!':'You lose!'):
        <AlphaButtons guess={this.guess} guessedLetters = {this.state.guessed}/>
        }
        </div>
       
        <div className="Hangman-last-btns">
        <button className="Hangman-reset" onClick={this.restartGame}>Restart</button>
        {
          !gameOver?
          <div style={{display:'flex',gap:'2em'}}>
            <button className="Hangman-reset" onClick={this.displayHint}>{this.state.showHint?'hide':'show'} hint</button>
          <div style={{visibility:this.state.showHint?'visible':'hidden'}}>Hint: {this.getHint()}</div>
            </div>
          :
          ''
        }
           

        </div>
        
      </div>
    );
  }
}

export default Hangman;
