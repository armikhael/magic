/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { Row, Col, Menu, Dropdown } from 'antd'

import SideBar from './components/SideBar'

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
				Cerrar Sesión
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
										<Link to={`/profile/create-account`}>
											<div className='cv-header-user-icon-login-content'>
												<img
													className='cv-heder-user-icon-add-account'
													src='https://i.ibb.co/fqJq9TP/agg-cuenta-1.png'
													alt='Agregar Cuenta'
												/>{' '}
												<span className='ml10'>Publicate</span>
											</div>
										</Link>
									</Col>
									<Col xs={12} sm={12} md={12}>
										<Dropdown overlay={menu} placement='bottomRight' arrow>
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
									<Col xs={12} sm={12} md={12}>
										<Link to={`/auth/login`}>
											<div className='cv-header-user-icon-init-sesion'>Iniciar sesión</div>
										</Link>
									</Col>
									<Col xs={12} sm={12} md={12}>
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
						<Col xs={24} sm={24} md={24}>
							<img
								onClick={() => this.handleOpenMenu(true)}
								className='cv-header-user-icon-menu'
								src='https://i.ibb.co/mzMWjY8/categorias.png'
								alt='Menu'
							/>{' '}
						</Col>
					</Row>
					<SideBar handleOpenMenu={() => this.handleOpenMenu(false)} menu={this.state.menu} />
				</div>
			</React.Fragment>
		)
	}
}
