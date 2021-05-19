/** @format */

import React from 'react'
import { Layout, Row, Result, Col, Button } from 'antd'
import './style.css'

const { Content } = Layout

export default class Activation extends React.Component {
	render() {
		let textActivation = ''
		let urlRedirect = ''
		let type = 'instagram' //atob(this.props.match.params.type)
		if (type === 'instagram') {
			textActivation =
				'Ahora para activar tu cuenta solo debes solicitar tu código de activación por Mensaje Directo (DM) a nuestro equipo Instagram'
			urlRedirect = 'https://www.instagram.com/cuentasvirales'
		}

		if (type === 'tiktok') {
			textActivation =
				'Ahora para activar tu cuenta solo debes solicitar tu código de activación por Mensaje Privado a nuestro equipo en TikTok'
			urlRedirect = 'https://www.tiktok.com/@cuentasvirales'
		}

		if (type === 'facebook') {
			textActivation =
				'Ahora para activar tu cuenta solo debes solicitar tu código de activación por Messenger a nuestro equipo en Facebook'
			urlRedirect = 'https://www.facebook.com/c.viralesfb'
		}

		return (
			<>
				<Row justify={'center'}>
					<Col sm={24} md={16}>
						<Content className='cv-profile-activation-content'>
							<Result
								className='cv-profile-activation-result'
								status='success'
								title='¡Sólo te queda un paso!'
								subTitle={textActivation}
								extra={[
									<br key='cv-profile-activation-br-two' />,
									<img
										key='cv-profile-activation-img'
										className='cv-profile-activation-img-logo'
										src={process.env.REACT_APP_LOGO}
										style={{ width: 80 }}
										alt='Cuentas Virales'
									/>,
									<br key='cv-profile-activation-br-three' />,
									<h3>
										<Button
											shape='round'
											onClick={() => {
												window.open(urlRedirect)
											}}>
											Solicitar Código de Activación
										</Button>
									</h3>,
								]}
							/>
						</Content>
					</Col>
				</Row>
			</>
		)
	}
}
