/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'
import {
	LinkOutlined,
	UserOutlined,
	ExportOutlined,
	QuestionOutlined,
	SafetyOutlined,
	TeamOutlined,
	UsergroupAddOutlined,
	SubnodeOutlined,
} from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'

import './style.css'

const { Header } = Layout

export default class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userProfile: JSON.parse(localStorage.getItem('user')),
			loading: false,
		}
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		return (
			<>
				<div className='cv-content-main'>
					<Header className='cv-profile-header'>
						<h3 className='cv-profile-header-title'>Tu cuenta</h3>
					</Header>
					<Row className='mt15'>
						<Col xs={24} sm={6} md={6}>
							<Link to={`profile/accounts`}>
								<div className='cv-profile-card-item'>
									<div className='cv-profile-card-item-img'>
										<TeamOutlined className='cv-profile-card-item-img-icon' />
									</div>
									<div className='cv-profile-card-item-title'>
										<h3>Mis cuentas</h3>
										<p>Aquí puedes encontrar tus cuentas registrardas.</p>
									</div>
								</div>
							</Link>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<Link to={`profile/account-user`}>
								<div className='cv-profile-card-item'>
									<div className='cv-profile-card-item-img'>
										<UsergroupAddOutlined className='cv-profile-card-item-img-icon' />
									</div>
									<div className='cv-profile-card-item-title'>
										<h3>Crea tu cuenta</h3>
										<p>Especialmente para Marcas Personales.</p>
									</div>
								</div>
							</Link>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<Link to={`/profile/linktree`}>
								<div className='cv-profile-card-item'>
									<div className='cv-profile-card-item-img'>
										<LinkOutlined className='cv-profile-card-item-img-icon' />
									</div>
									<div className='cv-profile-card-item-title'>
										<h3>Mis enlaces</h3>
										<p>Aquí puedes encontrar todos tus enlaces registrados.</p>
									</div>
								</div>
							</Link>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<Link to={`/profile/linktree-name`}>
								<div className='cv-profile-card-item'>
									<div className='cv-profile-card-item-img'>
										<SubnodeOutlined className='cv-profile-card-item-img-icon' />
									</div>
									<div className='cv-profile-card-item-title'>
										<h3>Crea tu enlace</h3>
										<p>Especialmente para crear menú de opciones en tu negocio.</p>
									</div>
								</div>
							</Link>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<div className='cv-profile-card-item'>
								<div className='cv-profile-card-item-img'>
									<UserOutlined className='cv-profile-card-item-img-icon' />
								</div>
								<div className='cv-profile-card-item-title'>
									<h3>Datos personales</h3>
									<p>Aquí puedes encontrar todos tus datos personales.</p>
								</div>
							</div>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<Link to={`/profile/change-password`}>
								<div className='cv-profile-card-item'>
									<div className='cv-profile-card-item-img'>
										<SafetyOutlined className='cv-profile-card-item-img-icon' />
									</div>
									<div className='cv-profile-card-item-title'>
										<h3>Cambiar contraseña</h3>
										<p>Para proteger tu cuenta, cambia a menudo tu contraseña.</p>
									</div>
								</div>
							</Link>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<Link to={`/help/quienes-somos`}>
								<div className='cv-profile-card-item'>
									<div className='cv-profile-card-item-img'>
										<QuestionOutlined className='cv-profile-card-item-img-icon' />
									</div>
									<div className='cv-profile-card-item-title'>
										<h3>Preguntas frecuentes</h3>
										<p>Tines alguna duda entra en ayuda y busca lo que necesites.</p>
									</div>
								</div>
							</Link>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<Link
								onClick={() => {
									localStorage.removeItem('user')
								}}
								to={`/`}>
								<div className='cv-profile-card-item'>
									<div className='cv-profile-card-item-img'>
										<ExportOutlined className='cv-profile-card-item-img-icon' />
									</div>
									<div className='cv-profile-card-item-title'>
										<h3>Cerrar seción</h3>
										<p>¿Deseas cerrar sesión en tu cuenta? no olvides visitarnos</p>
									</div>
								</div>
							</Link>
						</Col>
					</Row>
					<hr className='cv-profile-hr'></hr>
					<Row>
						<Col xs={24} sm={6} md={6}>
							<Link to={`help/posicionamiento`}>
								<div className='cv-profile-card-item-link'>
									<a href='/' rel='noopener noreferrer'>
										¿Quieres publicidad?
									</a>
								</div>
							</Link>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<Link to={`/help/posicionamiento`}>
								<div className='cv-profile-card-item-link'>
									<a href='/' rel='noopener noreferrer'>
										¿Necesitas ganar más seguidores?
									</a>
								</div>
							</Link>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<Link to={`/help/quienes-somos`}>
								<div className='cv-profile-card-item-link'>
									<a href='/' rel='noopener noreferrer'>
										Preguntas Frecuentes.
									</a>
								</div>
							</Link>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<Link to={`/help/faq`}>
								<div className='cv-profile-card-item-link'>
									<a href='/' rel='noopener noreferrer'>
										Políticas de Privacidad.
									</a>
								</div>
							</Link>
						</Col>
					</Row>
				</div>
			</>
		)
	}
}
