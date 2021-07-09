/** @format */

import React, { useEffect } from 'react'
import { NotificationOutlined, HeartOutlined } from '@ant-design/icons'
import { Line } from '@ant-design/charts'
import { Row, Col, Comment } from 'antd'

import ModalService from '../ModalService'

import './style.css'

export default function Views(props) {
	const data = props.views
	const config = {
		data,
		height: 250,
		xField: 'date',
		yField: 'counter',
		point: {
			size: 5,
			shape: 'diamond',
		},
	}

	useEffect(() => {
		if (props.permissions !== undefined) {
			if (props.permissions.red_social.length > 0) {
				const resultPermissions = props.permissions.red_social.includes(props.detail.type)
				console.log('permisos', resultPermissions)
			}
		}
		console.log(props.permissions)
	}, [props])

	return (
		<>
			{props.detail.representation === false && (
				<div className='cv-detail-contente-user-create'>
					<Row>
						<Col xs={24} sm={24} md={12}>
							<p>Total de la ultima semana: {props.total}</p>
							<br /> <Line {...config} />
						</Col>
						<Col xs={24} sm={24} md={12} className='cv-detail-content-actiones-btn'>
							<p>Intercambios:</p>
							<Comment
								author={<p className='cv-detail-actiones-title'>Mención x Mención</p>}
								avatar={<NotificationOutlined style={{ fontSize: '26px' }} />}
								content={
									<p>
										¡Aumenta el engagement de tu cuenta!
										<br />
										<ModalService
											componentHeader={'Condiciones del Servicio'}
											componentDescription={`${props.detail.account} hará una mención en su cuenta, tú en la tuya a esto le llamamos "intercambio publicitario" y de esta manera intercambian seguidores (cada influencer tiene sus propias normas)`}
											componentData={props.detail}
											componentType={'Mención x Mención'}
											componentCategory={'intercambio-mencion'}
										/>
									</p>
								}
							/>
							<Comment
								author={<p className='cv-detail-actiones-title'>Likes x Likes</p>}
								avatar={<HeartOutlined style={{ fontSize: '26px' }} />}
								content={
									<p>
										¡Aumenta el engagement de tu cuenta!
										<br />
										<ModalService
											componentHeader={'Condiciones del Servicio'}
											componentDescription={`${props.detail.account} dará likes a tus publicaciones y tú a las de el, de esa manera aumentan la interacción en sus cuentas.`}
											componentData={props.detail}
											componentType={'Like x Like'}
											componentCategory={'intercambio-like'}
										/>
									</p>
								}
							/>

							<Comment
								author={<p className='cv-detail-actiones-title'>Producto x Mención</p>}
								avatar={<HeartOutlined style={{ fontSize: '26px' }} />}
								content={
									<p>
										¡Aumenta el engagement de tu cuenta!
										<br />
										<ModalService
											componentHeader={'Condiciones del Servicio'}
											componentDescription={`${props.detail.account} te pedirá un "PRODUCTO" a cambio de la publicidad, el influencer se quedará con dicho producto que primero debe probar y hará la mención de tu negocio.`}
											componentData={props.detail}
											componentType={'Producto x Mención'}
											componentCategory={'intercambio-producto'}
										/>
									</p>
								}
							/>
						</Col>
					</Row>
				</div>
			)}
		</>
	)
}
