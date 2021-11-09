/** @format */

import React from 'react'
import { Row, Col } from 'antd'

import Logo from './components/Logo'
import SearchNavbar from './components/Search'
import User from './components/User'

import './style.sass'

export default function Header() {
	return (
		<div className='cv-navbar-header-content'>
			<div className='cv-navbar-content'>
				<Row>
					<Col xs={2} sm={2} md={3}>
						<Logo />
					</Col>
					<Col xs={17} sm={16} md={14}>
						<SearchNavbar />
					</Col>
					<Col xs={5} sm={6} md={7}>
						<User />
					</Col>
				</Row>
			</div>
		</div>
	)
}
