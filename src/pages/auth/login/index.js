/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
//import FacebookLogin from 'react-facebook-login'

import { Layout, Row, Col, Button, Form, Divider } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'

import InputField from '../../../components/Input'

import { autLoginSocialServices, authLoginServices } from './services'

import './style.css'

const { Content } = Layout

export default class Login extends React.Component {
	state = { email: null, loading: false }

	handleGoogleAuth = async (item) => {
		if (!item.error) {
			this.handleAuthLoginSocial({
				email: item.profileObj.email,
				autentication: 'google',
				first_name: item.profileObj.givenName,
				last_name: item.profileObj.familyName,
				image: item.profileObj.imageUrl,
			})
		}
	}

	handleFacebookAuth = async (item) => {
		let name = item.name.split(' ')
		this.handleAuthLoginSocial({
			email: item.email,
			autentication: 'facebook',
			first_name: name[0],
			last_name: name[1] ? name[1] : '',
			image: item.picture.data.url,
		})
	}

	handleAuthLoginSocial = (item) => {
		autLoginSocialServices(item).then(() => {
			localStorage.setItem('user', JSON.stringify(item))
			this.setState({
				email: item.email,
			})
			this.props.history.push('/profile/accounts')
		})
	}

	handleAuthLogin = (item) => {
		this.setState({ loading: true })
		authLoginServices(item, this.props).then(() => {
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
									Comparte todas tus redes sociales en un solo link
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
										<h2 className='cv-login-title-register'>
											Bienvenido a Cuentas Virales {this.state.email}
										</h2>
										<p className='cv-login-sub-title-register'>Encuentra las mejores cuentas</p>
									</div>
									<div className='cv-login-content-redes-main'>
										<Form
											name='normal_login'
											initialValues={{ remember: true }}
											onFinish={this.handleAuthLogin}>
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
											<Link to={`/auth/recovery`}>
												<h3 className='cv-auth-login-recover'>¿Olvidaste tu contraseña?</h3>
											</Link>
											<Form.Item>
												<Button
													loading={this.state.loading}
													htmlType={'submit'}
													className={'cv-auth-login-main-button-submit'}>
													Iniciar sesión
												</Button>
											</Form.Item>
										</Form>
										<Divider />
										<center>
											<h3 className='cv-auth-login-o'>o</h3>
										</center>
										<div className='cv-login-content-reds-sociales-google'>
											<GoogleOutlined className='cv-login-content-reds-sociales-google-i' />
											<GoogleLogin
												clientId='655830526663-ag8k3bioo1rt7e0gece2ciqc33ktcod0.apps.googleusercontent.com'
												render={(renderProps) => (
													<h2
														className='cv-login-title-reds-sociales-google'
														onClick={renderProps.onClick}
														disabled={renderProps.disabled}>
														Continuar con Google
													</h2>
												)}
												buttonText='Login'
												onSuccess={this.handleGoogleAuth}
												onFailure={this.handleGoogleAuth}
												cookiePolicy={'single_host_origin'}
											/>
										</div>
										<div className='cv-login-conten-register'>
											<Link to={`/auth/register`}>
												¿Aún no estás en Cuentas Virales? <span>Regístrate</span>
											</Link>
										</div>
									</div>
									<br />
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
