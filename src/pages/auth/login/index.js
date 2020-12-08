/** @format */

import React from 'react'
import { Link, Redirect } from "react-router-dom";
import { Layout, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import { saveUser } from '../../../redux'
import { GoogleOutlined } from '@ant-design/icons'
import { GoogleLogin } from 'react-google-login';

import './style.css'
import serviceSaveUser from './services'

const { Content } = Layout
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	handleLogging(){
		if (this.props.email) {
			return  (
				<Redirect to="/profile/create-account" />
			)
		}
	}
	render() {
		const responseGoogle = async (data) => {
			console.log(data)
			localStorage.setItem('user', JSON.stringify(data.profileObj));
			this.props.saveUser('email', data.profileObj.email)
			serviceSaveUser({
				email: data.profileObj.email,
				autentication: "google",
				first_name: data.profileObj.givenName,
				last_name: data.profileObj.familyName,
				image: data.profileObj.imageUrl
			})
			.then((data) => {
				console.log('respuesta del registro', data);
			})
			
		}
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
											Bienvenido a Cuentas Virales: {this.props.email}
										</h2>
										<p className='cv-login-sub-title-register'>
											Encuentra las mejores cuentas
										</p>
									</div>
									<div className='cv-login-content-redes-sociales'>
										<div className='cv-login-content-reds-sociales-google'>
											<GoogleOutlined className='cv-login-content-reds-sociales-google-i' />
											<GoogleLogin
												clientId='264087860616-jckkkgv633q5r4n2othpppgk6rarhf03.apps.googleusercontent.com'
												render={(renderProps) => (
													<h2
														className='cv-login-title-reds-sociales-google'
														onClick={renderProps.onClick}
														disabled={renderProps.disabled}>
														Continuar con Google
													</h2>
												)}
												buttonText='Login'
												onSuccess={responseGoogle}
												onFailure={responseGoogle}
												cookiePolicy={'single_host_origin'}
											/>
										</div>
									</div>
									<br />
									<p className='cv-login-title-termi-condi'>
										Al continuar, aceptas las Condiciones del servicio y la
										Política de privacidad de Cuentas Virales.
									</p>
									{this.handleLogging()}
									<Link to="/profile/create-account">
										<Button>
											<p>Click Me!</p>
										</Button>
									</Link>
								</div>
							</Col>
						</Row>
					</Content>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		email: state.email
	}
}

const mapDispatchToProps = dispatch => {
	return {
		saveUser: (field, value) => {
			dispatch(saveUser(field, value))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login)

