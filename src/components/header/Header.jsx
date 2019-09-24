import React, { Component } from 'react'
import './Header.scss'
import hero from '../../images/hero.jpg'

class Hero extends Component {
	render() {
		return (
			<header className="Header">
				<div className="Header__hero">
					<img className="Header__img" src={hero} alt="" />
          <div className="Header__heading">
						<h1 className="Header__heading_main">drac ipsum</h1>
						<span className="Header__heading_span Header__heading_span--purple">The Lorem Ipsum</span>
						<span className="Header__heading_span Header__heading_span--green rotate">From the Enemy Mine Movie</span>
					</div>
				</div>
			</header>
		)
	}
}

export default Hero
