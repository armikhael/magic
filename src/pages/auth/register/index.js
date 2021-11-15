/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Layout, Row, Col, Button, Form, Divider, notification } from 'antd'

import InputField from '../../../components/Form/Input'

import { serviceAuthSignin } from './services'
import './style.css'

const { Content } = Layout

const Register = (props) => {
	const history = useHistory()

	const handleOnFinish = (item) => {
		console.log(item)
		serviceAuthSignin(item).then((response) => {
			if (response.statusCode <= 200) {
				console.log(response)
				notification['success']({
					message: `!Bienvenido a Cuentas Virales!`,
					description: `Su cuenta fue registrada con exito...`,
				})

				localStorage.setItem(
					'user',
					JSON.stringify({
						email: response.data.email,
						image: response.data.image,
						first_name: response.data.first_name,
						last_name: response.data.last_name,
					})
				)

				setTimeout(() => {
					history.push('/profile/account-user')
				}, 2000)
			} else {
				notification['warning']({
					message: `Problema para Iniciar Sesión`,
					description: `${response.message}...`,
				})
			}
		})
	}

	return (
		<>
			<div className='cv-login-content'>
				<Content className='cv-global-main-container'>
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
									<h2 className='cv-login-title-register'>Bienvenido a Cuentas Virales</h2>
									<p className='cv-login-sub-title-register'>
										Encuentra las mejores cuentas
									</p>
								</div>
								<div className='cv-login-content-redes-main'>
									<Form
										name='normal_login'
										initialValues={{ remember: true }}
										onFinish={handleOnFinish}>
										<div className='ph-auth-login-form-container'>
											<InputField
												componentClass={'cv-auth-login-field-input'}
												componentName={'first_name'}
												componentLabel={'Nombre'}
												componentRules={'required'}
												componentPlaceholder={'Ingrese su Nombre'}
												componentType={'text'}
												componentValue={''}
												componentDisabled={false}
											/>

											<InputField
												componentClass={'cv-auth-login-field-input'}
												componentName={'last_name'}
												componentLabel={'Apellido'}
												componentRules={'required'}
												componentPlaceholder={'Ingrese su Apellido'}
												componentType={'text'}
												componentValue={''}
												componentDisabled={false}
											/>

											<InputField
												componentClass={'cv-auth-login-field-input'}
												componentName={'email'}
												componentLabel={'Correo electrónico'}
												componentRules={'rulesEmail'}
												componentPlaceholder={'Ingrese su E-mail'}
												componentType={'text'}
												componentValue={''}
												componentDisabled={false}
											/>

											<InputField
												componentClass={'cv-auth-login-field-input'}
												componentName={'password'}
												componentLabel={'Contraseña'}
												componentRules={'rulesPassword'}
												componentPlaceholder={'Ingrese su contraseña'}
												componentType={'password'}
												componentValue={''}
												componentDisabled={false}
											/>
										</div>
										<Form.Item>
											<Button
												htmlType={'submit'}
												className={'cv-auth-login-main-button-submit'}>
												Registrar
											</Button>
										</Form.Item>
									</Form>
									<Divider />
									<div className='cv-login-conten-register'>
										<Link to={`/auth/login`}>
											¿Tienes cuenta? <span>Inicia Sesión</span>
										</Link>
									</div>
								</div>
								<p className='cv-login-title-termi-condi'>
									Al continuar, aceptas las Condiciones del servicio y la Política de
									privacidad de Cuentas Virales.
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

export default Register
