/** @format */

import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import { Avatar, Badge, Row, Col, Button } from 'antd'
import {
	NotificationOutlined,
	CloseOutlined,
	PlusOutlined,
	UserOutlined,
} from '@ant-design/icons'

import './style.css'

class User extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {}
	}

	handleRedirect = () => {
		if (this.state.redirect) {
		  	return <Redirect to='/auth/login' />
		}
	}

	handleLogout = () => {
		console.log('paso por aca');
		localStorage.removeItem('user');
		console.log(localStorage.getItem('user'));
		this.setState({ redirect: true })
	}


	render() {

		return (
			<React.Fragment>
				<div className='cv-navbar-user-content'>
					<Row align='middle'>
						<Col xs={8} sm={8} md={8}>	
							<Button onClick={this.handleLogout}>			
								<CloseOutlined style={{ fontSize: '20px' }} />		
							</Button>			
						</Col>
						<Col xs={8} sm={8} md={8}>
							<Link to={`/profile/create-account`}>
								<PlusOutlined style={{ fontSize: '20px' }} />
							</Link>
						</Col>
						<Col xs={8} sm={8} md={8}>
							<Badge count={5}>
								<NotificationOutlined style={{ fontSize: '20px' }} />
							</Badge>
						</Col>
						<Col xs={8} sm={8} md={8}>
							<Link to={`/profile`}>
								<Avatar size={28} icon={<UserOutlined />} />
							</Link>
						</Col>
						
					</Row>
					{ this.handleRedirect()}
				</div>
			</React.Fragment>
		)
	}
}

export default User
