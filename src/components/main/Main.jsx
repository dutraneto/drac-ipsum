import React, { Component } from 'react'
import './Main.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import drac from '../../assets/javascript/drac'

class Main extends Component {
  constructor() {
    super()
    this._sentences = [...drac.sentences]
    this._words = [...drac.words]
    this.state = {
      selectedOption: 'paragraphs',
      active: false,
      numberOfInputs: 1,
      text: [drac.mainParagraph],
      copied: false,
    }
  }

  handleOptionChange = (evt) =>
    this.setState({
      selectedOption: evt.target.value,
    }, () => this.generateWords(this.state.selectedOption === 'words' ? this._words : this.state.selectedOption === 'sentences' ? this._sentences : this._sentences))

  // TODO: refactor code
  handleNumberChange = (evt) =>
    this.setState({
      numberOfInputs: evt.target.value,
    }, () => this.generateWords(this.state.selectedOption === 'words' ? this._words : this.state.selectedOption === 'sentences' ? this._sentences : this._sentences))

  changeCopyState = (evt) => {
    // avoid re-render html
    evt.preventDefault()
    this.setState({copied: true}, () => {
      setTimeout(() => this.setState({copied: false}), 2000);
    })
  }

  generateWords = (stateOfWordsOrSentences) => {
    const { selectedOption, numberOfInputs } = this.state
    let textToRender = []
    if(selectedOption==="paragraphs") {
      for(let i = 1; i <= numberOfInputs; i++) {
        textToRender.push(this.generateOneParagraph())
      }
      this.setState({text: [...textToRender]})
      return
    }
    for(let i = 1; i <= numberOfInputs; i++) {
      textToRender.push(stateOfWordsOrSentences[Math.floor(Math.random() * stateOfWordsOrSentences.length)])
    }
    this.setState({text: [...textToRender]})
  }

  generateOneParagraph = () => {
    let oneParagraph = ""
    for(let i = 0; i < 5; i++ ) {
      oneParagraph = oneParagraph + this._sentences[Math.floor(Math.random() * this._sentences.length)]
    }
    return oneParagraph
  }

  render() {
    const { selectedOption, numberOfInputs, text, copied } = this.state
    const buttonCopyStatus = !copied ? `copy ${selectedOption}` : `${selectedOption} copied`
    const [paragraphs, sentences, words] = [selectedOption==='paragraphs', selectedOption==='sentences', selectedOption==='words']
    const moreThanOneParagraph = paragraphs && numberOfInputs > 1

    // TODO: Separate form in a new Component
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
                value={numberOfInputs}
                min="1"
                onChange={this.handleNumberChange}
              />
            </div>
            <div className="form__group">
              <label
                className={`form__group-label
                ${paragraphs ? ' active' : ""} `}
                htmlFor="input-paragraphs"
              >
                <input
                  id="input-paragraphs"
                  className="form__group-text"
                  type="radio"
                  name="chosen"
                  value="paragraphs"
                  checked={paragraphs}
                  onChange={this.handleOptionChange}
                />
                Paragraphs
              </label>
            </div>
            <div className="form__group">
              <label
                className={`form__group-label
                ${sentences ? ' active' : ""} `}
                htmlFor="input-sentences"
              >
                <input
                  id="input-sentences"
                  className="form__group-text"
                  type="radio"
                  name="chosen"
                  value="sentences"
                  checked={sentences}
                  onChange={this.handleOptionChange}
                />
                Sentences
              </label>
            </div>
            <div className="form__group">
              <label
                className={`form__group-label
                ${words ? ' active' : ""} `}
                htmlFor="input-words"
              >
                <input
                  id="input-words"
                  className="form__group-text"
                  type="radio"
                  name="chosen"
                  value="words"
                  checked={words}
                  onChange={this.handleOptionChange}
                />
                Words
              </label>
            </div>
          </div>
          {/* TODO: change that div to textfield */}
          <div className="form__results">
            {
              moreThanOneParagraph ? text.map((t, index) => {
                return (
                  <div key={index}>
                    <p>{t}</p>
                    <br/>
                  </div>
                )
              }) : <p>{text.join("")}</p>
            }
          </div>
          <CopyToClipboard text={text}>
            <button className="btn-copy" onClick={this.changeCopyState}>
              {buttonCopyStatus}
            </button>
          </CopyToClipboard>
        </form>
      </main>
    )
  }
}

export default Main
