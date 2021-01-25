/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { Row, Col, Menu, Dropdown } from 'antd'

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
				<div className='cv-header-user-content'>
					<Row align='middle'>
						<Col xs={12} sm={12} md={{ span: 8, offset: 8 }}>
							{(() => {
								if (localStorage.getItem('user')) {
									return (
										<Link to={`/profile/create-account`}>
											<img
												className='cv-heder-user-icon-add-account'
												src='https://i.ibb.co/fqJq9TP/agg-cuenta-1.png'
												alt='Agregar Cuenta'
											/>
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
											<img
												className='cv-heder-user-image-user'
												src={JSON.parse(localStorage.getItem('user')).image}
												alt='Imagen de Usuario'
											/>
										</Dropdown>
									)
								} else {
									return (
										<Link to={`/auth/login`}>
											<img
												className='cv-header-user-icon-login'
												src='https://i.ibb.co/0C5Mpp9/iniciar-sesion.png'
												alt='Iniciar Sesión'
											/>
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
