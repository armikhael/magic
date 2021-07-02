/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Menu, Dropdown, Badge } from 'antd'
import { UserOutlined, LogoutOutlined, NotificationOutlined } from '@ant-design/icons'

import ModalOption from './components/ModalOption'
import SideBar from './components/SideBar'
import Notification from './components/Notification'

import './style.css'

const menu = (
	<Menu>
		<Menu.Item>
			<Link to={`/profile`}>
				<div className='cv-header-user-icon-login-content'>
					<UserOutlined style={{ fontSize: 16 }} />
					<span className='ml10'>Perfil</span>
				</div>
			</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to={`/profile/accounts`}>
				<div className='cv-header-user-icon-login-content'>
					<img width='16px' src='https://i.ibb.co/4YMC9HP/miscuentas.png' alt='Multiples enlaces' />
					<span className='ml10'>Mis Cuentas</span>
				</div>
			</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to={`/profile/linktree`}>
				<div className='cv-header-user-icon-login-content'>
					<img width='16px' src='https://i.ibb.co/W3mYPYP/links.png' alt='Multiples enlaces' />
					<span className='ml10'>Mis Enlaces</span>
				</div>
			</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to={`/profile/change-password`}>
				<div className='cv-header-user-icon-login-content'>
					<img width='16px' src='https://i.ibb.co/dQbp0fY/seguridad.png' alt='Multiples enlaces' />
					<span className='ml10'>Cambiar Contraseña</span>
				</div>
			</Link>
		</Menu.Item>
		<Menu.Item>
			<Link
				onClick={() => {
					localStorage.removeItem('user')
				}}
				to={`/`}>
				<div className='cv-header-user-icon-login-content'>
					<LogoutOutlined style={{ fontSize: 16 }} />
					<span className='ml10'>Cerrar Sesión</span>
				</div>
			</Link>
		</Menu.Item>
	</Menu>
)

export default class User extends React.Component {
	state = {
		menu: false,
	}

	handleOpenMenu = (item) => {
		this.setState({
			menu: item,
		})
	}

	render() {
		return (
			<React.Fragment>
				<div className='cv-header-user-content'>
					<Row align='middle' className='cv-header-user-desktop'>
						{localStorage.getItem('user') && (
							<Col xs={12} sm={12} md={{ span: 24, offset: 0 }}>
								<Row align='middle'>
									<Col xs={12} sm={12} md={12}>
										<div
											className='cv-header-user-icon-login-content'
											style={{ cursor: 'pointer' }}>
											<img
												className='cv-heder-user-icon-add-account'
												src='https://i.ibb.co/fqJq9TP/agg-cuenta-1.png'
												alt='Agregar Cuenta'
											/>
											<ModalOption componentTitle={'Publicarme'} />
										</div>
									</Col>

									<Col xs={4} sm={4} md={4}>
										<Notification />
									</Col>

									<Col xs={6} sm={6} md={6}>
										<Dropdown shape={'circle'} overlay={menu} placement='bottomRight' arrow>
											<img
												className='cv-heder-user-image-user'
												src={JSON.parse(localStorage.getItem('user')).image}
												alt='Imagen de Usuario'
											/>
										</Dropdown>
									</Col>
								</Row>
							</Col>
						)}
						{!localStorage.getItem('user') && (
							<Col xs={12} sm={12} md={24}>
								<Row align='middle'>
									<Col xs={4} sm={4} md={4}>
										<Notification />
									</Col>
									<Col xs={10} sm={10} md={10}>
										<Link to={`/auth/login`}>
											<div className='cv-header-user-icon-init-sesion'>Iniciar sesión</div>
										</Link>
									</Col>
									<Col xs={10} sm={10} md={10}>
										<Link to={`/auth/register`}>
											<div className='cv-header-user-icon-login-content'>
												<img
													className='cv-header-user-icon-login'
													src='https://i.ibb.co/0C5Mpp9/iniciar-sesion.png'
													alt='Crear Cuenta'
												/>{' '}
												Crear Cuenta
											</div>
										</Link>
									</Col>
								</Row>
							</Col>
						)}
					</Row>
					<Row align='middle' className='cv-header-user-mobil'>
						<Col xs={4} sm={4} md={4}>
							<a href='/notifications'>
								<Badge dot>
									<NotificationOutlined
										style={{ fontSize: '20px', color: '#200159', cursor: 'pointer' }}
									/>
								</Badge>
							</a>
						</Col>
						<Col xs={20} sm={20} md={20}>
							<img
								onClick={() => this.handleOpenMenu(true)}
								className='cv-header-user-icon-menu'
								src='https://i.ibb.co/mzMWjY8/categorias.png'
								alt='Menu'
							/>
						</Col>
					</Row>
					<SideBar handleOpenMenu={() => this.handleOpenMenu(false)} menu={this.state.menu} />
				</div>
			</React.Fragment>
		)
	}
}
