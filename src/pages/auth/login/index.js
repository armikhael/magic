/** @format */

import React from 'react'

import { Layout, Row, Col } from 'antd'
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons'

import './style.css'

const { Content } = Layout

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
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
											Bienvenido a Cuentas Virales
										</h2>
										<p className='cv-login-sub-title-register'>
											Encuentra las mejores cuentas
										</p>
									</div>
									<div className='cv-login-content-redes-sociales'>
										<div className='cv-login-content-reds-sociales-facebbok'>
											<FacebookOutlined className='cv-login-content-reds-sociales-facebbok-i' />
											<h2 className='cv-login-title-reds-sociales-facebbok'>
												Continuar con Facebook
											</h2>
										</div>
										<div className='cv-login-content-reds-sociales-google'>
											<GoogleOutlined className='cv-login-content-reds-sociales-google-i' />
											<h2 className='cv-login-title-reds-sociales-google'>
												Continuar con Google
											</h2>
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
				</div>
			</React.Fragment>
		)
	}
}
export default Login
