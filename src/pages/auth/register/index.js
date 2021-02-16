/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { Layout, Row, Col, Button, Form, Divider } from 'antd'

import InputField from '../../../components/Input'

import { authRegisterServices } from './services'
import './style.css'

const { Content } = Layout

export default class Register extends React.Component {
	state = { loading: false }

	handleAuthRegister = (item) => {
		this.setState({ loading: true })
		authRegisterServices(item, this.props).then(() => {
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
										<p className='cv-login-sub-title-register'>Encuentra las mejores cuentas</p>
									</div>
									<div className='cv-login-content-redes-main'>
										<Form
											name='normal_login'
											initialValues={{ remember: true }}
											onFinish={this.handleAuthRegister}>
											<div className='ph-auth-login-form-container'>
												<InputField
													className={'cv-auth-login-field-input'}
													inputName={'first_name'}
													inputNameLabel={'Nombres'}
													inputNameRule={true}
													inputNameMessage={'Ingrese su Nombre'}
													inputNameType={'text'}
													inputNameIcon={''}
													inputNameRules={'rulesText'}
												/>
												<InputField
													className={'cv-auth-login-field-input'}
													inputName={'last_name'}
													inputNameLabel={'Apellidos'}
													inputNameRule={true}
													inputNameMessage={'Ingrese su Apellido'}
													inputNameType={'text'}
													inputNameIcon={''}
													inputNameRules={'rulesText'}
												/>
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
												<InputField
													className={'cv-auth-login-field-input'}
													inputName={'password'}
													inputNameLabel={'Contraseña'}
													inputNameRule={true}
													inputNameMessage={'Ingrese su contraseña'}
													inputNameType={'password'}
													inputNameIcon={''}
													inputNameRules={'rulesPassword'}
												/>
											</div>
											<Form.Item>
												<Button
													loading={this.state.loading}
													htmlType={'submit'}
													className={'cv-auth-login-main-button-submit'}>
													Registrar
												</Button>
											</Form.Item>
										</Form>
										<Divider />
										<div className='cv-login-conten-register'>
											<Link to={`/auth/login`}>
												¿Tienes cuaenta? <span>Inicia Sesión</span>
											</Link>
										</div>
									</div>
									<p className='cv-login-title-termi-condi'>
										Al continuar, aceptas las Condiciones del servicio y la Política de privacidad
										de Cuentas Virales.
									</p>
									<center>
										<Link to={`/`}>
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
