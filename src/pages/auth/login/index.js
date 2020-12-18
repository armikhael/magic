/** @format */

import React from 'react'
import { Redirect } from "react-router-dom";
import { Layout, Row, Col } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { GoogleLogin } from 'react-google-login';

import './style.css'
import serviceSaveUser from './services'

const { Content } = Layout
class Login extends React.Component {
	constructor(props) {
		super(props)
		this._isMounted = false;
		this.state = {
			email: null
		}
	}

	componentWillUnmount() {
    this._isMounted = false;
	}
	
	componentDidMount() {
		this._isMounted = true;
	}

	handleRedirect = () => {
		if (this.state.redirect) {
		  	return <Redirect to='/profile/create-account' />
		}
	}
	
	handleGoogleAuth = async (data) => {
		console.log(data);
		if (data.error) {
			return 
		}
		localStorage.setItem('user', JSON.stringify(data.profileObj));
		this.setState({
			email: data.profileObj.email
		})
		await serviceSaveUser({
			email: data.profileObj.email,
			autentication: "google",
			first_name: data.profileObj.givenName,
			last_name: data.profileObj.familyName,
			image: data.profileObj.imageUrl
		})
		.then((data) => {
			console.log('respuesta del registro', data);
		})
		
		this.setState({ redirect: true })
	}

	render() {
		return (
			<React.Fragment>
				<div className='cv-login-content'>
					<Content className='cv-container-main'>
						<Row className='cv-login-conteent-row' align='middle'>
							<Col xs={24} sm={24} md={12}>
								<h1 className='cv-login-title-main'>
									Registrate para ver todas las cuentas...
								</h1>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<div className='cv-login-content-logins'>
									<div className='cv-login-content-logins-center'>
										<img
											title='Logo Cuentas Virales'
											alt='Logo Cuentas Virales'
											width='40px'
											src='https://i.ibb.co/JnXwKMt/viral.png'
										/>
										<h2 className='cv-login-title-register'>
											Bienvenido a Cuentas Virales: {this.state.email}
										</h2>
										<p className='cv-login-sub-title-register'>
											Encuentra las mejores cuentas
										</p>
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
									
									<br />
									<p className='cv-login-title-termi-condi'>
										Al continuar, aceptas las Condiciones del servicio y la
										Política de privacidad de Cuentas Virales.
										
									</p>
									
								</div>
								
							</Col>
						</Row>
					</Content>

					{this.handleRedirect()}
				</div>
			</React.Fragment>
		)
	}
}


export default Login

