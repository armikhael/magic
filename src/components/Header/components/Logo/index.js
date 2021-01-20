/** @format */

import React from 'react'

import { Link } from 'react-router-dom'

import './style.css'

class Logo extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Link
					to={{
						pathname: '/',
					}}>
					<img
						className='cv-navbar-logo'
						src={process.env.REACT_APP_LOGO}
						alt='Logo Cuentas Virales'
					/>
					<h1 className='cv-navbar-logo-titles'>Cuentas Virales</h1>
				</Link>
			</React.Fragment>
		)
	}
}

export default Logo
