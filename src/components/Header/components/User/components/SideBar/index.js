/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { Drawer, Row, Col, Modal } from 'antd'
import {
	QuestionOutlined,
	CloseSquareOutlined,
	UserOutlined,
	SafetyOutlined,
	ExclamationCircleOutlined,
} from '@ant-design/icons'

import './style.css'

export default class SideBar extends React.Component {
	handleCloseSesion = () => {
		window.location.href = '/'
		localStorage.removeItem('user')
	}
	render() {
		return (
			<Drawer
				className='cv-header-user-sidebar-content'
				title={'Cuentas Virales'}
				width={300}
				onClose={() => this.props.handleOpenMenu()}
				visible={this.props.menu}>
				{!localStorage.getItem('user') && (
					<>
						<Link to={`/auth/login`}>
							<Row className='cv-header-user-sidebar-content-row'>
								<Col xs={7} sm={7} md={7} className='p10'>
									<img
										width='100%'
										src='https://i.ibb.co/0C5Mpp9/iniciar-sesion.png'
										alt='Imagen Usuario'
									/>
								</Col>
								<Col xs={17} sm={17} md={17}>
									<h3 className='cv-header-user-sidebar-title'>Bienvenido</h3>
									<p className='cv-header-user-sidebar-sub-title'>
										Ingresa a tu cuenta para ver tus cuentas o registrarlas...
									</p>
								</Col>
							</Row>
						</Link>
						<Row className='mt10 p10' align='middle'>
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
										/>
										Crear Cuenta
									</div>
								</Link>
							</Col>
						</Row>
					</>
				)}
				{localStorage.getItem('user') && (
					<Link to={`/profile`}>
						<Row className='cv-header-user-sidebar-content-row'>
							<Col xs={7} sm={7} md={7}>
								<img
									className='cv-header-user-sidebar-content-img-user'
									width='100%'
									src={JSON.parse(localStorage.getItem('user')).image}
									alt='Imagen Usuario'
								/>
							</Col>
							<Col xs={15} sm={15} md={15}>
								<h3 className='cv-header-user-sidebar-title'>
									{JSON.parse(localStorage.getItem('user')).first_name}{' '}
									{JSON.parse(localStorage.getItem('user')).last_name}
								</h3>
								<p className='cv-header-user-sidebar-sub-title'>
									Ya formas parte de nuestro portafolio de Latinoamérica.
								</p>
							</Col>
						</Row>
					</Link>
				)}
				<hr className='cv-header-user-sidebar-hr' />
				<div className='cv-header-user-sidebar-list'>
					<Link to={`/`}>
						<img className='cv-header-logo' src={process.env.REACT_APP_LOGO} alt='Logo Cuentas Virales' />
						<span className='cv-header-user-sidebar-list-title'>Inicio</span>
					</Link>
				</div>
				{localStorage.getItem('user') && (
					<>
						<div className='cv-header-user-sidebar-list'>
							<Link to={`/profile/accounts`}>
								<UserOutlined className='cv-header-user-sidebar-list-icon' style={{ fontSize: 22 }} />
								<span className='cv-header-user-sidebar-list-title'>Mis Enlaces</span>
							</Link>
						</div>
						<div className='cv-header-user-sidebar-list'>
							<div className='cv-header-user-icon-login-content'>
								<Link to={`/profile/account-user`}>
									<img
										width='22px'
										src='https://i.ibb.co/fqJq9TP/agg-cuenta-1.png'
										alt='Crear Cuenta'
									/>
									<span className='cv-header-user-sidebar-list-title'>Crear Enlace</span>
								</Link>
							</div>
						</div>
						<div className='cv-header-user-sidebar-list'>
							<Link to={`/profile/change-password`}>
								<SafetyOutlined className='cv-header-user-sidebar-list-icon' style={{ fontSize: 22 }} />
								<span className='cv-header-user-sidebar-list-title'>Cambiar Contraseña</span>
							</Link>
						</div>
					</>
				)}
				<div className='cv-header-user-sidebar-list'>
					<Link to={`/help/quienes-somos`}>
						<QuestionOutlined className='cv-header-user-sidebar-list-icon' style={{ fontSize: 22 }} />
						<span className='cv-header-user-sidebar-list-title'>Ayuda</span>
					</Link>
				</div>
				{localStorage.getItem('user') && (
					<div className='cv-header-user-sidebar-list cv-header-user-sidebar-list-cs'>
						<hr className='cv-header-user-sidebar-hr mb10' />

						<div
							className='cv-header-user-icon-login-content'
							onClick={() => {
								Modal.confirm({
									title: 'Cerrar seción',
									icon: <ExclamationCircleOutlined />,
									content: '¿Estas seguro que queires cerrar tu seción?',
									okText: 'Confirmar',
									onOk: this.handleCloseSesion,
									cancelText: 'Cancelar',
								})
							}}>
							<CloseSquareOutlined style={{ fontSize: 22 }} />
							<span className='ml10'>Cerrar sesión</span>
						</div>
					</div>
				)}
			</Drawer>
		)
	}
}
