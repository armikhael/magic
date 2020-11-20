/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { Avatar, Badge, Row, Col } from 'antd'
import {
	NotificationOutlined,
	PlusOutlined,
	UserOutlined,
} from '@ant-design/icons'

import './style.css'

class User extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className='cv-navbar-user-content'>
					<Row align='middle'>
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
				</div>
			</React.Fragment>
		)
	}
}

export default User
