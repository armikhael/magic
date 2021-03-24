/** @format */

import React from 'react'
import { Layout, Row, Result, Col, Button } from 'antd'
import './style.css'

const { Content } = Layout

export default class Activation extends React.Component {
	render() {
		return (
			<>
				<Row justify={'center'}>
					<Col sm={24} md={16}>
						<Content className='cv-profile-activation-content'>
							<Result
								className='cv-profile-activation-result'
								status='success'
								title='¡Sólo te queda un paso!'
								subTitle={`¡En las próximas 48 horas recibirá un código en la red social registrada para activar su cuenta! Recuerde habilitar la opción de recibir mensajes de cualquier persona para que le llegue este código`}
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
										<Button shape='round' href={`/profile`}>
											Continuar
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
