import React, { Component } from 'react'
import './Main.scss'
import drac from '../../assets/javascript/drac'
import Form from '../form/Form'

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
        <Form
            numberOfInputs={numberOfInputs}
            selectedOption={selectedOption}
            text={text}
            copied={copied}
            buttonCopyStatus={buttonCopyStatus}
            paragraphs={paragraphs}
            sentences={sentences}
            words={words}
            moreThanOneParagraph={moreThanOneParagraph}
            handleNumberChange={this.handleNumberChange}
            handleOptionChange={this.handleOptionChange}
            changeCopyState={this.changeCopyState}
        />
      </main>
    )
  }
}

export default Main
