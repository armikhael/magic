/** @format */

import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Layout, Row, Button, Result, Col } from 'antd'
import { CopyOutlined } from '@ant-design/icons'

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
								title='¡Su cuenta ha sido registrada exitosamente!'
								subTitle='Una vez verificada su cuenta aparecerá en los resultados de búsqueda.Para verificar su identidad debe enviarnos el siguiente código a nuestra cuenta de instagram desde la cuenta que acaba de registrar. Gracias'
								extra={[
									<h3
										className='cv-profile-activation-title-code'
										key='cv-profile-activation-title'>
										Código: <br /> {this.props.match.params.name}
									</h3>,
									<br key='cv-profile-activation-br' />,
									<CopyToClipboard
										text={this.props.match.params.name}
										key='cv-profile-activation-copy'>
										<Button shape='round' key='cv-profile-activation-button'>
											Copiar código <CopyOutlined key='cv-profile-activation-icon' />
										</Button>
									</CopyToClipboard>,
									<br key='cv-profile-activation-br-two' />,
									<img
										key='cv-profile-activation-img'
										className='cv-profile-activation-img-logo'
										src={process.env.REACT_APP_LOGO}
										style={{ width: 80 }}
										alt='Cuentas Virales'
									/>,
									<br key='cv-profile-activation-br-three' />,
									<a
										href='https://www.instagram.com/cuentasvirales/?hl=es-la'
										rel='noopener noreferrer'
										key='cv-profile-activation-a'
										target='_blank'>
										@cuentasvirales
									</a>,
								]}
							/>
						</Content>
					</Col>
				</Row>
			</>
		)
	}
}
