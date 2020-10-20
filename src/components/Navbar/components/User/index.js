/** @format */

import React from 'react'

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
							<PlusOutlined style={{ fontSize: '20px' }} />
						</Col>
						<Col xs={8} sm={8} md={8}>
							<Badge count={5}>
								<NotificationOutlined style={{ fontSize: '20px' }} />
							</Badge>
						</Col>
						<Col xs={8} sm={8} md={8}>
							<Avatar size={28} icon={<UserOutlined />} />
						</Col>
					</Row>
				</div>
			</React.Fragment>
		)
	}
}

export default User
