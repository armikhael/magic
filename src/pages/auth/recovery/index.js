/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { Row, Col, Layout, Form, Button } from 'antd'

import InputField from '../../../components/Input'

import { authRecoveryPassword } from './services'

import './style.css'

const { Content } = Layout

export default class Recovery extends React.Component {
	constructor(props) {
		super(props)
		this.state = { loading: false }
	}

	handleRecoveriPassword = (item) => {
		this.setState({ loading: true })
		authRecoveryPassword(item, this.props).then(() => {
			this.setState({ loading: false })
		})
	}

	render() {
		return (
			<>
				<div className='cv-login-content'>
					<Content className='cv-container-main'>
						<Row className='cv-login-conteent-row' align='middle'>
							<Col xs={24} sm={24} md={12}>
								<h1 className='cv-login-title-main'>
									Se parte de la comunidad de Influencers en LATIONAMÉRICA
								</h1>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<div className='cv-login-content-logins'>
									<div className='cv-login-content-logins-center'>
										<Link to={`/`}>
											<img
												title='Logo Cuentas Virales'
												alt='Logo Cuentas Virales'
												width='40px'
												className='cv-login-logo-app'
												src={process.env.REACT_APP_LOGO}
											/>
										</Link>
										<h2 className='cv-login-title-register'>Bienvenido a Cuentas Virales</h2>
										<p className='cv-login-sub-title-register'>
											Tienes problemas para recordar tu contraseña ingresa tu correo electrónico y
											te enviaremos una clave alternativa, recuerda que luego desde tu perfil puedes
											cambiar y poner la que mejor te acomode.{' '}
										</p>
									</div>
									<div className='cv-login-content-redes-main'>
										<Form
											name='normal_login'
											initialValues={{ remember: true }}
											onFinish={this.handleRecoveriPassword}>
											<div className='ph-auth-login-form-container'>
												<InputField
													className={'cv-auth-login-field-input'}
													inputName={'email'}
													inputNameLabel={'Correo electrónico'}
													inputNameRule={true}
													inputNameMessage={'Ingrese su E-mail'}
													inputNameType={'text'}
													inputNameIcon={''}
													inputNameRules={'rulesEmail'}
												/>
											</div>
											<Form.Item>
												<Button
													loading={this.state.loading}
													htmlType={'submit'}
													className={'cv-auth-login-main-button-submit'}>
													Enviar
												</Button>
											</Form.Item>
										</Form>
									</div>
									<br />
									<br />
									<center>
										<Link to={`/auth/login`}>
											<span className=''>Volver al Inicio</span>
										</Link>
									</center>
								</div>
							</Col>
						</Row>
					</Content>
				</div>
			</>
		)
	}
}
