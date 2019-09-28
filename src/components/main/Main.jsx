import React, { Component } from 'react'
import './Main.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import drac from '../../assets/javascript/drac'

class Main extends Component {
  constructor() {
    super()
    this._words = drac.words
    this._sentences = drac.sentences
    this.state = {
      selectedOption: 'words',
      active: false,
      numberOfInputs: 1,
      text: this._words[0],
      copied: false,
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.changeCopyState = this.changeCopyState.bind(this)
  }

  handleOptionChange(evt) {
    this.setState({
      selectedOption: evt.target.value,
    }, () => this.generateWords(this.state.selectedOption === 'words' ? this._words : this._sentences))
  }

  handleNumberChange(evt) {
    this.setState({
      numberOfInputs: evt.target.value,
    }, () => this.generateWords(this.state.selectedOption === 'words' ? this._words : this._sentences))

  }

  changeCopyState(evt) {
    evt.preventDefault()
    this.setState({copied: true}, () => {
      setTimeout(() => this.setState({copied: false}), 2000);
    })
  }

  generateWords(stateOfWordsOrSentences) {
    let { numberOfInputs } = this.state
    let arrOfWords = []
    for(let i = 1; i <= numberOfInputs; i++) {
      arrOfWords.push(stateOfWordsOrSentences[Math.floor(Math.random() * stateOfWordsOrSentences.length)])
    }
    this.setState({text: [...arrOfWords]})
  }

  render() {
    const buttonCopyStatus = !this.state.copied ?  `copy ${this.state.selectedOption}` : "text copied"

    return (
      <main className="Main">
        <h2>Generate Your Drac Ipsum</h2>
        <form className="form" action="">
          <div className="form__input">
            <div className="form__group">
              <input
                id="input-number"
                className="form__group-number"
                type="number"
                name=""
                value={this.state.numberOfInputs}
                min="1"
                onChange={this.handleNumberChange}
              />
            </div>
            <div className="form__group">
              <label className={`form__group-label ${this.state.selectedOption === 'paragraphs' ? ' active' : ""} `} htmlFor="input-paragraphs">
                <input
                  id="input-paragraphs"
                  className="form__group-text"
                  type="radio"
                  name="chosen"
                  value="paragraphs"
                  checked={this.state.selectedOption === 'paragraphs'}
                  onChange={this.handleOptionChange}
                />
                Paragraphs
              </label>
            </div>
            <div className="form__group">
              <label className={`form__group-label ${this.state.selectedOption === 'sentences' ? ' active' : ""} `} htmlFor="input-sentences">
                <input
                  id="input-sentences"
                  className="form__group-text"
                  type="radio"
                  name="chosen"
                  value="sentences"
                  checked={this.state.selectedOption === 'sentences'}
                  onChange={this.handleOptionChange}
                />
                Sentences
              </label>
            </div>
            <div className="form__group">
              <label className={`form__group-label ${this.state.selectedOption === 'words' ? ' active' : ""} `} htmlFor="input-words">
                <input
                  id="input-words"
                  className="form__group-text"
                  type="radio"
                  name="chosen"
                  value="words"
                  checked={this.state.selectedOption === 'words'}
                  onChange={this.handleOptionChange}
                />
                Words
              </label>
            </div>
          </div>
          <div className="form__results">
            <p>{this.state.text}</p>
          </div>
          <CopyToClipboard
            text={this.state.text}
          >
            <button
              className="btn-copy"
              onClick={this.changeCopyState}
            >
              {buttonCopyStatus}
            </button>
          </CopyToClipboard>
        </form>
      </main>
    )
  }
}

export default Main
