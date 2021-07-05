/** @format */

import React from 'react'
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
import { serviceGetAccountsByEmail } from './services'

const { Header } = Layout

export default class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userProfile: JSON.parse(localStorage.getItem('user')),
			accounts: [],
			loading: true,
			redirect: false,
			loadingChangePassword: false,
			links: [],
		}
	}

	componentDidMount() {
		serviceGetAccountsByEmail(this.state.userProfile.email).then((response) => {
			this.setState({
				accounts: response.accounts,
				loading: false,
				links: response.links,
			})
		})
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
							<div className='cv-profile-card-item'>
								<div className='cv-profile-card-item-img'>
									<TeamOutlined className='cv-profile-card-item-img-icon' />
								</div>
								<div className='cv-profile-card-item-title'>
									<h3>Mis cuentas</h3>
									<p>Aquí puedes encontrar tus cuentas registrardas.</p>
								</div>
							</div>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<div className='cv-profile-card-item'>
								<div className='cv-profile-card-item-img'>
									<UsergroupAddOutlined className='cv-profile-card-item-img-icon' />
								</div>
								<div className='cv-profile-card-item-title'>
									<h3>Crea tu cuenta</h3>
									<p>Crea tus cuentas y registra todo tus datos.</p>
								</div>
							</div>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<div className='cv-profile-card-item'>
								<div className='cv-profile-card-item-img'>
									<LinkOutlined className='cv-profile-card-item-img-icon' />
								</div>
								<div className='cv-profile-card-item-title'>
									<h3>Mis enlaces</h3>
									<p>Aquí puedes encontrar todos tus enlaces registrados.</p>
								</div>
							</div>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<div className='cv-profile-card-item'>
								<div className='cv-profile-card-item-img'>
									<SubnodeOutlined className='cv-profile-card-item-img-icon' />
								</div>
								<div className='cv-profile-card-item-title'>
									<h3>Crea tu enlace</h3>
									<p>Crea tus enlaces y registra todo tus datos.</p>
								</div>
							</div>
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
							<div className='cv-profile-card-item'>
								<div className='cv-profile-card-item-img'>
									<SafetyOutlined className='cv-profile-card-item-img-icon' />
								</div>
								<div className='cv-profile-card-item-title'>
									<h3>Cambiar contraseña</h3>
									<p>Para proteger tu cuenta, cambia a menudo tu contraseña.</p>
								</div>
							</div>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<div className='cv-profile-card-item'>
								<div className='cv-profile-card-item-img'>
									<QuestionOutlined className='cv-profile-card-item-img-icon' />
								</div>
								<div className='cv-profile-card-item-title'>
									<h3>Preguntas frecuentes</h3>
									<p>Tines alguna duda entra en ayuda y busca lo que necesites.</p>
								</div>
							</div>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<div className='cv-profile-card-item'>
								<div className='cv-profile-card-item-img'>
									<ExportOutlined className='cv-profile-card-item-img-icon' />
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
							<div className='cv-profile-card-item-link'>
								<a href='/' rel='noopener noreferrer'>
									¿Quieres publicidad?
								</a>
							</div>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<div className='cv-profile-card-item-link'>
								<a href='/' rel='noopener noreferrer'>
									¿Necesitas ganar más seguidores?
								</a>
							</div>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<div className='cv-profile-card-item-link'>
								<a href='/' rel='noopener noreferrer'>
									Preguntas Frecuentes.
								</a>
							</div>
						</Col>
						<Col xs={24} sm={6} md={6}>
							<div className='cv-profile-card-item-link'>
								<a href='/' rel='noopener noreferrer'>
									Políticas de Privacidad.
								</a>
							</div>
						</Col>
					</Row>
				</div>
			</>
		)
	}
}
