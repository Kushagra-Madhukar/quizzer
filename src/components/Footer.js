import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons'
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons'
import "./footer.scss"

const footer = () => {

  function scrollHandler(id){
    const ele = document.getElementById(id)
    ele.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

  return (
    <div className="footer-container">
      <div className="footer-nav">
        <a onClick={() => scrollHandler("home")}>Home</a>
        <a href="https://kushagramadhukar.netlify.app/#about">About</a>
        <a href="https://kushagramadhukar.netlify.app/#contact">Contact</a>
      </div>
      <div className="footer-links">
        <a href="https://www.linkedin.com/in/kushagra-madhukar-8b28131b4/" target="__blank"><FontAwesomeIcon icon={faLinkedinIn} size="1x" className="footer-font-icon"/></a>
        <a onClick={() => window.open('mailto:madhukarkushagra@gmail.com')}><FontAwesomeIcon icon={faPaperPlane} size="1x" className="footer-font-icon"/></a>
        <a href="https://github.com/Kushagra-Madhukar" target="__blank"><FontAwesomeIcon icon={faGithub} size="1x" className="footer-font-icon"/></a>
        {/* <FontAwesomeIcon icon={['fab', "github"]} size="1x" className="footer-font-icon"/> ['fab', "github"]"paper-plane"['fab', "linkedin-in"]*/}
      </div>
      <div className="footer-copyright">
        &copy; 2021 Copyright Kushagra Madhukar
      </div>
    </div>
  )
}

export default footer
