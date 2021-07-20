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
			<div className='cv-detail-contente-user-create'>
				<Row>
					<Col xs={24} sm={24} md={12}>
						<p>Total de la ultima semana: {props.total}</p>
						<br /> <Line {...config} />
					</Col>
					<Col xs={24} sm={24} md={12} className='cv-detail-content-actiones-btn'>
						<p>Intercambios Publicitarios:</p>

						<Comment
							author={<p className='cv-detail-actiones-title'>Mención x Publicidad</p>}
							avatar={<NotificationOutlined style={{ fontSize: '26px' }} />}
							content={
								<p>
									¡Aumenta el engagement de tu cuenta!
									<br />
									<ModalService
										componentHeader={'¿Cuál es el objetivo?'}
										componentDescription={`Recomendarse entre cuentas para darse a conocer entre mas personas. Siempre recomendamos comenzar por influencers que esten cerca de tí.`}
										componentData={props.detail}
										componentType={'Mención x Publicidad'}
										componentCategory={'intercambio-mencion'}
									/>
								</p>
							}
						/>

						<Comment
							author={<p className='cv-detail-actiones-title'>Servicio x Publicidad</p>}
							avatar={<HeartOutlined style={{ fontSize: '26px' }} />}
							content={
								<p>
									¡Crea testimonios con el influencer de tu localidad!
									<br />
									<ModalService
										componentHeader={'¿Cuál es el objetivo?'}
										componentDescription={`Principalmente para generar mayor confianza en tu audiencia, para lograr esto debes generar testimonios y documentar el proceso de tu servicios con apoyo de ${props.detail.account} `}
										componentData={props.detail}
										componentType={'Servicio x Publicidad'}
										componentCategory={'intercambio-servicio'}
									/>
								</p>
							}
						/>

						<Comment
							author={<p className='cv-detail-actiones-title'>Producto x Publicidad</p>}
							avatar={<HeartOutlined style={{ fontSize: '26px' }} />}
							content={
								<p>
									¡Aumenta las ventas de tu negocio!
									<br />
									<ModalService
										componentHeader={'¿Cuál es el objetivo?'}
										componentDescription={`Que el influencer pueda hablar de tu producto, beneficios, probar la calidad del mismo y compartirlo con su comunidad, de esta manera generas mas confianza lo que hace que tus ventas aumenten.`}
										componentData={props.detail}
										componentType={'Producto x Publicidad'}
										componentCategory={'intercambio-producto'}
									/>
								</p>
							}
						/>
					</Col>
				</Row>
			</div>
		</>
	)
}
