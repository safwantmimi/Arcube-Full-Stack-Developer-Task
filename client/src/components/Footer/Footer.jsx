import React from 'react'
import './Footer.scss'
import github from '../../assets/images/github.png'
import linkedin from '../../assets/images/linkedin.png'

function Footer() {
	return (
		<div className="footer">
			<div className="resume">
				<a
					href="https://drive.google.com/file/d/1fTDSJ7Wy4N1CZtRJ5YK0Fjaa5XFa9eWm/view?usp=sharing"
					target="_blank"
					rel="noreferrer"
					className="footer-link"
				>
					<h1>Resume</h1>
				</a>
			</div>
			<div className="item">
				<h1>Made with ❤️ by Safouan</h1>
			</div>
			<div className="socials">
				<a href="https://github.com/safwantmimi" target="_blank" rel="noreferrer">
					<img src={github} className="github" alt="" />
				</a>
				<a
					href="https://www.linkedin.com/in/safwantmimi/"
					target="_blank"
					rel="noreferrer"
				>
					<img src={linkedin} className="linkedin" alt="" />
				</a>
			</div>
		</div>
	)
}

export default Footer
