/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { Avatar, Row, Col, Menu, Dropdown } from 'antd'
import { PlusOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons'

import './style.css'

const menu = (
	<Menu>
		<Menu.Item>
			<Link to={`/profile`}>Perfil</Link>
		</Menu.Item>
		<Menu.Item>
			<Link
				onClick={() => {
					localStorage.removeItem('user')
				}}
				to={`/`}>
				Cerrar sesion
			</Link>
		</Menu.Item>
	</Menu>
)

export default class User extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className='cv-navbar-user-content'>
					<Row align='middle'>
						<Col xs={12} sm={12} md={{ span: 8, offset: 8 }}>
							{(() => {
								if (localStorage.getItem('user')) {
									return (
										<Link to={`/profile/create-account`}>
											<PlusOutlined style={{ fontSize: '20px' }} />
										</Link>
									)
								}
							})()}
						</Col>
						<Col xs={12} sm={12} md={8}>
							{(() => {
								if (localStorage.getItem('user')) {
									return (
										<Dropdown overlay={menu} placement='bottomRight' arrow>
											<Avatar size={28} icon={<UserOutlined />} />
										</Dropdown>
									)
								} else {
									return (
										<Link to={`/auth/login`}>
											<LoginOutlined style={{ fontSize: '20px' }} />
										</Link>
									)
								}
							})()}
						</Col>
					</Row>
				</div>
			</React.Fragment>
		)
	}
}
