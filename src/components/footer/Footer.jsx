import React from 'react'
import '../../components/footer/Footer.scss'
import { GoMarkGithub } from 'react-icons/go'


const Footer = (props) => (
  <footer className="Footer">
    <p>Designed and Created by
      <a className="credits" target="_blank" rel="noopener noreferrer" href="https://dutraneto.com/portfolio">@DutraNeto</a>
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/dutraneto/drac-ipsum"><GoMarkGithub className="github"/></a>
    </p>
  </footer>
)

export default Footer
