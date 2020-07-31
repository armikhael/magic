/** @format */

import React from 'react'

import { Layout, Row, Col } from 'antd'

import Logo from './components/Logo/'
import SearchNavbar from './components/Search/'
import User from './components/User/'

import './style.css'

const { Header, Content } = Layout

class Navbar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<Header className='cv-navbar-header-content'>
				<Content className='cv-navbar-content'>
					<Row>
						<Col span={5}>
							<Logo />
						</Col>
						<Col span={15}>
							<SearchNavbar />
						</Col>
						<Col span={4}>
							<User />
						</Col>
					</Row>
				</Content>
			</Header>
		)
	}
}

export default Navbar
