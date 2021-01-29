/** @format */

import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
//import FacebookLogin from 'react-facebook-login'

import { Layout, Row, Col } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'

import './style.css'
import serviceSaveUser from './services'

const { Content } = Layout

export default class Login extends React.Component {
	state = { email: null }

	handleGoogleAuth = async (item) => {
		if (!item.error) {
			this.handleAuthLogin({
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
		this.handleAuthLogin({
			email: item.email,
			autentication: 'facebook',
			first_name: name[0],
			last_name: name[1] ? name[1] : '',
			image: item.picture.data.url,
		})
	}

	handleAuthLogin = (item) => {
		serviceSaveUser(item).then(() => {})
		localStorage.setItem('user', JSON.stringify(item))
		this.setState({
			email: item.email,
			redirect: true,
		})
	}

	render() {
		return (
			<>
				<div className='cv-login-content'>
					<Content className='cv-container-main'>
						<Row className='cv-login-conteent-row' align='middle'>
							<Col xs={24} sm={24} md={12}>
								<h1 className='cv-login-title-main'>Registrate para ver todas las cuentas...</h1>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<div className='cv-login-content-logins'>
									<div className='cv-login-content-logins-center'>
										<img
											title='Logo Cuentas Virales'
											alt='Logo Cuentas Virales'
											width='40px'
											className='cv-login-logo-app'
											src={process.env.REACT_APP_LOGO}
										/>
										<h2 className='cv-login-title-register'>
											Bienvenido a Cuentas Virales: {this.state.email}
										</h2>
										<p className='cv-login-sub-title-register'>Encuentra las mejores cuentas</p>
									</div>
									<div className='cv-login-content-redes-sociales'>
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
									</div>
									{/* 							
									<FacebookLogin
										appId="1859534864215755"
										fields="name,email,picture"
										callback={this.handleFacebookAuth} />
										*/}
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
					{this.state.redirect && <Redirect to='/profile/' />}
				</div>
			</>
		)
	}
}
