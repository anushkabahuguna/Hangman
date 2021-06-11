import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import './AlphaButtons.css';

class AlphaButtons extends Component {
    static defaultProps={
        alphabets:"abcdefghijklmnopqrstuvwxyz",
        firstLetter:"a",
        lastLetter:'z'
   
    }
    
    constructor(props)
    {
        super(props);
        this.handleGuess = this.handleGuess.bind(this);
    }

    handleGuess(evt){
        this.props.guess(evt.target.value);
    }
    extractString(){
    let alphabets  =  this.props.alphabets;
    return alphabets.substring(alphabets.indexOf(this.props.firstLetter),alphabets.indexOf(this.props.lastLetter)+1)
    }
  render() {
      let requiredString = this.extractString();
    return (
      <div className="AlphaButtons">
          {
            requiredString.split("").map(ltr => (
                <button className = "AlphaButtons-button"
                  key={ltr}
                  value={ltr}
                  onClick={this.handleGuess}
                  disabled={this.props.guessedLetters.has(ltr)}
                >
                  {ltr}
                </button>
              ))
          }
      </div>
    );
  }

}

export default AlphaButtons;