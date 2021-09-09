/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Row, Col, Modal } from 'antd'
import {
	ExportOutlined,
	QuestionOutlined,
	SafetyOutlined,
	SisternodeOutlined,
	SubnodeOutlined,
	ExclamationCircleOutlined,
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

	handleCloseSesion = () => {
		window.location.href = '/'
		localStorage.removeItem('user')
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		return (
			<>
				<div className='cv-content-main'>
					<Header className='cv-profile-header'>
						<h3 className='cv-profile-header-title'>Mis Enlaces</h3>
					</Header>
					<Row className='mt15'>
						<Col xs={24} sm={12} md={12}>
							<div className='cv-profile-card-item'>
								<span className='cv-profile-number'>1</span>
								<SubnodeOutlined className='cv-profile-card-item-img-icon' />
								<h3>Mis Enlaces Personales</h3>
								<div className='cv-profile-card-item-title'>
									<p>
										Enlaces diseñados especialmente para Modelos, Actores, Cantantes, Mascotas,
										Bailarines, Personajes Públicos.
									</p>
								</div>
								<br />
								<Row>
									<Col xs={12} sm={12} md={12} className='p10'>
										<Link to={`/profile/accounts`}>
											<div className='cv-profile-card-btn'>Lista de Enlaces</div>
										</Link>
									</Col>
									<Col xs={12} sm={12} md={12} className='p10'>
										<Link to={`/profile/account-user`}>
											<div className='cv-profile-card-btn'>
												<SubnodeOutlined className='cv-profile-card-btn-i' />
												Crear Enlace Personal
											</div>
										</Link>
									</Col>
								</Row>
							</div>
						</Col>
						<Col xs={24} sm={12} md={12}>
							<div className='cv-profile-card-item'>
								<span className='cv-profile-number'>2</span>
								<SisternodeOutlined className='cv-profile-card-item-img-icon' />
								<h3>Mis Enlaces de Negocio</h3>
								<div className='cv-profile-card-item-title'>
									<p>
										Enlaces diseñados especialmente para Negocios, Diseñadores, Creadores de
										Contenido, Empresas, Marketing de Referidos, Profesores.
									</p>
								</div>
								<br />
								<Row>
									<Col xs={12} sm={12} md={12} className='p10'>
										<Link to={`/profile/linktree`}>
											<div className='cv-profile-card-btn'>Lista de Enlaces</div>
										</Link>
									</Col>
									<Col xs={12} sm={12} md={12} className='p10'>
										<Link to={`/profile/linktree-name`}>
											<div className='cv-profile-card-btn'>
												<SisternodeOutlined className='cv-profile-card-btn-i' />
												Crear Enlace de Negocio
											</div>
										</Link>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
					<Row className='mt15'>
						<Col xs={24} sm={8} md={8}>
							<Link to={`/profile/change-password`}>
								<div className='cv-profile-card-item-tre'>
									<div className='cv-profile-card-item-img'>
										<SafetyOutlined className='cv-profile-card-item-img-icon-tre' />
									</div>
									<div className='cv-profile-card-item-title'>
										<h3>Cambiar contraseña</h3>
										<p>Para proteger tu cuenta, cambia a menudo tu contraseña.</p>
									</div>
								</div>
							</Link>
						</Col>
						<Col xs={24} sm={8} md={8}>
							<Link to={`/help/quienes-somos`}>
								<div className='cv-profile-card-item-tre'>
									<div className='cv-profile-card-item-img'>
										<QuestionOutlined className='cv-profile-card-item-img-icon-tre' />
									</div>
									<div className='cv-profile-card-item-title'>
										<h3>Preguntas frecuentes</h3>
										<p>Tines alguna duda entra en ayuda y busca lo que necesites.</p>
									</div>
								</div>
							</Link>
						</Col>
						<Col xs={24} sm={8} md={8}>
							<div
								className='cv-profile-card-item-tre'
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
								<div className='cv-profile-card-item-img'>
									<ExportOutlined className='cv-profile-card-item-img-icon-tre' />
								</div>
								<div className='cv-profile-card-item-title'>
									<h3>Cerrar seción</h3>
									<p>¿Deseas cerrar sesión en tu cuenta? no olvides visitarnos</p>
								</div>
							</div>
						</Col>
					</Row>
					<hr className='cv-profile-hr'></hr>
					<Row>
						<Col xs={24} sm={6} md={6}>
							<Link to={`help/posicionamiento`}>
								<div className='cv-profile-card-item-link'>¿Quieres publicidad?</div>
							</Link>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<Link to={`/pricing`}>
								<div className='cv-profile-card-item-link'>¿Necesitas ganar más seguidores?</div>
							</Link>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<Link to={`/help/quienes-somos`}>
								<div className='cv-profile-card-item-link'>Preguntas Frecuentes.</div>
							</Link>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<Link to={`/help/faq`}>
								<div className='cv-profile-card-item-link'>Políticas de Privacidad.</div>
							</Link>
						</Col>
					</Row>
					<br></br>
					<br></br>
				</div>
			</>
		)
	}
}
