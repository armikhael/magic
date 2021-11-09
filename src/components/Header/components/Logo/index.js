/** @format */

import React from 'react'

import { Link } from 'react-router-dom'

import { ENV_LOGO } from '../../../Common/Hooks/Enviroment'

import './style.sass'

export default function Logo() {
	return (
		<Link className='cv-navbar-logo-link-container' to='/'>
			<img className='cv-navbar-logo' src={ENV_LOGO} alt='Logo Cuentas Virales' />
			<h1 className='cv-navbar-logo-titles'>Cuentas Virales</h1>
		</Link>
	)
}
