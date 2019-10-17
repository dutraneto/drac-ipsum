import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import './Form.scss'

class Form extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <form className="form" action="">
                <div className="form__input">
                    <div className="form__group">
                        <input
                            id="input-number"
                            className="form__group-number"
                            type="number"
                            name=""
                            value={this.props.numberOfInputs}
                            min="1"
                            onChange={this.props.handleNumberChange}
                        />
                    </div>
                    <div className="form__group">
                        <label
                            className={`form__group-label
                            ${this.props.paragraphs ? ' active' : ''} `}
                            htmlFor="input-paragraphs"
                        >
                            <input
                                id="input-paragraphs"
                                className="form__group-text"
                                type="radio"
                                name="chosen"
                                value="paragraphs"
                                checked={this.props.paragraphs}
                                onChange={this.props.handleOptionChange}
                            />
                            Paragraphs
                        </label>
                    </div>
                    <div className="form__group">
                        <label
                            className={`form__group-label
                            ${this.props.sentences ? ' active' : ''} `}
                            htmlFor="input-sentences"
                        >
                            <input
                                id="input-sentences"
                                className="form__group-text"
                                type="radio"
                                name="chosen"
                                value="sentences"
                                checked={this.props.sentences}
                                onChange={this.props.handleOptionChange}
                            />
                            Sentences
                        </label>
                    </div>
                    <div className="form__group">
                        <label
                            className={`form__group-label
                            ${this.props.words ? ' active' : ''} `}
                            htmlFor="input-words"
                        >
                            <input
                                id="input-words"
                                className="form__group-text"
                                type="radio"
                                name="chosen"
                                value="words"
                                checked={this.props.words}
                                onChange={this.props.handleOptionChange}
                            />
                            Words
                        </label>
                    </div>
                </div>
                <div className="form__results">
                    {this.props.moreThanOneParagraph ? (
                        this.props.text.map((t, index) => {
                            return (
                                <div key={index}>
                                    <p>{t}</p>
                                    <br />
                                </div>
                            )
                        })
                    ) : (
                        <p>{this.props.text.join('')}</p>
                    )}
                </div>
                <CopyToClipboard text={this.props.text}>
                    <button
                        className="btn-copy"
                        onClick={this.props.changeCopyState}
                    >
                        {this.props.buttonCopyStatus}
                    </button>
                </CopyToClipboard>
            </form>
        )
    }
}

export default Form
