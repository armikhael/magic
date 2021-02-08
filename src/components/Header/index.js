/** @format */

import React from 'react'

import { Layout, Row, Col } from 'antd'

import Logo from './components/Logo/'
import SearchNavbar from './components/Search/'
import User from './components/User/'

import './style.css'

const { Header, Content } = Layout

export default class Headers extends React.Component {
	render() {
		return (
			<Header className='cv-navbar-header-content'>
				<Content className='cv-navbar-content'>
					<Row>
						<Col xs={3} sm={3} md={4}>
							<Logo />
						</Col>
						<Col xs={17} sm={17} md={14}>
							<SearchNavbar />
						</Col>
						<Col xs={4} sm={4} md={6}>
							<User />
						</Col>
					</Row>
				</Content>
			</Header>
		)
	}
}
