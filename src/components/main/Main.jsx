import React, { Component } from 'react'
import './Main.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard'

class Main extends Component {
  constructor() {
    super()

    this.state = {
      selectedOption: 'paragraphs',
      active: true,
      number: 1,
      text: "ipsum dolor sit amet consectetur adipisicing elit. Iure ad mollitia distinctio debitis dolor!"
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
  }

  handleOptionChange(evt) {
    this.setState({
      selectedOption: evt.target.value,
    })
  }

  handleNumberChange(evt) {
    this.setState({
      number: evt.target.value
    })
  }

  render() {
    console.log(this.state.number)
    return (
      <main className="Main">
        <h2>Generate Drac Ipsum</h2>
        <form className="form" action="">
          <div className="form__input">
            <div className="form__group">
              <input
                id="input-number"
                className="form__group-number"
                type="number"
                name=""
                defaultValue={this.state.number}
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
              onClick={(evt)=>evt.preventDefault()}
            >
              {`Copy ${this.state.selectedOption}`}
            </button>
          </CopyToClipboard>
        </form>
      </main>
    )
  }
}

export default Main
