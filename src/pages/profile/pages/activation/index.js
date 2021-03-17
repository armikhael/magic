/** @format */

import React from 'react'
import { Layout, Row, Result, Col } from 'antd'
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
								subTitle='Una vez verificada su cuenta aparecerá en los resultados de búsqueda. Para verificar su identidad debe presionar "Confirmar Cuenta" que lo llevará a nuestro equipo de Soporte. Gracias'
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
										<a
											href={`${process.env.REACT_APP_WHATSAPP}?phone=${
												process.env.REACT_APP_CONTACT
											}&text=Hola,%20me%20acabo%20de%20registrar%20en%20cuentasvirales.com%20y%20quisiera%20confirmar%20mi%20cuenta%20${atob(
												this.props.match.params.name
											)}`}
											rel='noopener noreferrer'
											key='cv-profile-activation-a'
											target='_blank'>
											Confirmar Cuenta
										</a>
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
