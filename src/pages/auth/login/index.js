/** @format */

import React from 'react'
import { Link } from "react-router-dom";
import { Layout, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import { saveUser } from '../../../redux'
import { GoogleOutlined } from '@ant-design/icons'
import { GoogleLogin } from 'react-google-login';

import './style.css'

const { Content } = Layout
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const responseGoogle = (data) => {
			console.log(data)
			this.props.saveUser('email', data.profileObj.email)
		}
		return (
			<React.Fragment>
				<div className='cv-login-content'>
					<Content className='cv-container-main'>
						<Row className='cv-login-conteent-row' align='middle'>
							<Col span={12}>
								<h1 className='cv-login-title-main'>
									Registrate para ver todas las cuentas...
								</h1>
							</Col>
							<Col span={12}>
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
												clientId="264087860616-jckkkgv633q5r4n2othpppgk6rarhf03.apps.googleusercontent.com"
												render={renderProps => (
													<h2 
														className='cv-login-title-reds-sociales-google'
														onClick={renderProps.onClick} 
														disabled={renderProps.disabled}>
														Continuar con Google
													</h2>
												)}
												buttonText="Login"
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

