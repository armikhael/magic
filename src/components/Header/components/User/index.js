/** @format */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Menu, Dropdown } from 'antd'
import { UserOutlined, ExportOutlined, SafetyOutlined, SubnodeOutlined, SisternodeOutlined } from '@ant-design/icons'

import SideBar from './components/SideBar'

import './style.sass'

const menu = (
	<Menu>
		<Menu.Item>
			<Link to={`/profile/accounts`}>
				<div className='cv-header-user-icon-login-content'>
					<UserOutlined style={{ fontSize: 16 }} />
					<span className='ml10'>Mis Enlaces</span>
				</div>
			</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to={`/profile/change-password`}>
				<div className='cv-header-user-icon-login-content'>
					<SafetyOutlined style={{ fontSize: 16 }} />
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
					<ExportOutlined style={{ fontSize: 16 }} />
					<span className='ml10'>Cerrar Sesión</span>
				</div>
			</Link>
		</Menu.Item>
	</Menu>
)

const publish = (
	<Menu>
		<Menu.Item>
			<Link to={`/profile/account-user`}>
				<div className='cv-header-user-icon-login-content'>
					<SubnodeOutlined style={{ fontSize: 16 }} />
					<span className='ml10'>Personal</span>
				</div>
			</Link>
		</Menu.Item>
		<Menu.Item>
			<Link to={`/profile/account-user`}>
				<div className='cv-header-user-icon-login-content'>
					<SisternodeOutlined style={{ fontSize: 16 }} />
					<span className='ml10'>De Negocio</span>
				</div>
			</Link>
		</Menu.Item>
	</Menu>
)

export default function User() {
	const [isMenu, setMenu] = useState(false)
	const [isUser] = useState(JSON.parse(localStorage.getItem('user')))

	const handleOpenMenu = (item) => {
		setMenu(item)
	}

	return (
		<div className='cv-header-user-content'>
			<Row align='middle' className='cv-header-user-desktop'>
				{isUser ? (
					<Col xs={12} sm={12} md={{ span: 24, offset: 0 }}>
						<Row align='middle'>
							<Col span={12}>
								<Dropdown shape={'circle'} overlay={publish} placement='bottomCenter' arrow>
									<div className='cv-header-user-icon-login-content' style={{ cursor: 'pointer' }}>
										<img
											className='cv-heder-user-icon-add-account'
											src='https://i.ibb.co/fqJq9TP/agg-cuenta-1.png'
											alt='Agregar Cuenta'
										/>
										<span>Crear Enlace</span>
									</div>
								</Dropdown>
							</Col>
							<Col span={7}>
								<Dropdown shape={'circle'} overlay={menu} placement='bottomRight' arrow>
									<div className='cv-header-user-image-container'>
										<img
											className='cv-heder-user-image-user'
											src={isUser.image ? isUser.image : 'https://i.postimg.cc/YSQXZWCP/logo.jpg'}
											alt='Imagen de Usuario'
										/>
									</div>
								</Dropdown>
							</Col>
						</Row>
					</Col>
				) : (
					<Col xs={12} sm={12} md={24}>
						<Row align='middle'>
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
				<Col xs={6} sm={4} md={4}></Col>
				<Col xs={18} sm={20} md={20}>
					<img
						onClick={() => handleOpenMenu(true)}
						className='cv-header-user-icon-menu'
						src='https://i.ibb.co/mzMWjY8/categorias.png'
						alt='Menu'
					/>
				</Col>
			</Row>
			<SideBar handleOpenMenu={() => handleOpenMenu(false)} menu={isMenu} />
		</div>
	)
}
