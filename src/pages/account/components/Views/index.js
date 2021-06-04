/** @format */

import React, { useEffect } from 'react'
import {
	AuditOutlined,
	QuestionCircleOutlined,
	NotificationOutlined,
	HeartOutlined,
} from '@ant-design/icons'
import { Line } from '@ant-design/charts'
import { Row, Col, Comment, Popconfirm } from 'antd'

import { serviceEventGoogleAnalytics } from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

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

	useEffect(() => {}, [props])

	return (
		<>
			<div className='cv-detail-contente-user-create'>
				<Row>
					<Col xs={24} sm={24} md={12}>
						<p>Total de la ultima semana: {props.total}</p>
						<br /> <Line {...config} />
					</Col>
					<Col xs={24} sm={24} md={12} className='cv-detail-content-actiones-btn'>
						<p>Intercambios:</p>
						<Comment
							author={<p className='cv-detail-actiones-title'>Likes x Likes</p>}
							avatar={<HeartOutlined style={{ fontSize: '26px' }} />}
							content={
								<p>
									¡Aumenta el alcance de tu cuenta!
									<br />
									<Popconfirm
										title='El influencer dará likes a tus publicaciones y tú a las de el, de esa manera aumentan la interacción en sus cuentas ¿Estás de acuerdo?'
										okText='Aceptar'
										cancelText='Rechazar'
										icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
										onConfirm={() => {
											serviceEventGoogleAnalytics({
												category: 'intercambio',
												action: 'click-mencion',
												label: props.detail.name,
											})

											window.open(
												`${process.env.REACT_APP_WHATSAPP}?phone=${props.detail.code}${props.detail.phone}&text=Hola ${props.detail.account}, te encontre en cuentasvirales.com y me gustaría que hagamos la dinñamica de (LIKE x LIKE)`
											)
										}}>
										<span className='cv-detail-actiones-title-a' style={{ cursor: 'pointer' }}>
											Click aquí
										</span>
									</Popconfirm>
								</p>
							}
						/>

						<Comment
							author={<p className='cv-detail-actiones-title'>Mención x Mención</p>}
							avatar={<NotificationOutlined style={{ fontSize: '26px' }} />}
							content={
								<p>
									¡Aumenta los seguidores en tu cuenta!
									<br />
									<Popconfirm
										title='El influencer hará una mención en su cuenta, tú en la tuya (a esto le llamamos intercambio publicitario) y de esta manera intercambian seguidores (cada influencer tiene sus propias normas) ¿Estás de acuerdo?'
										okText='Aceptar'
										cancelText='Rechazar'
										icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
										onConfirm={() => {
											serviceEventGoogleAnalytics({
												category: 'intercambio',
												action: 'click-mencion',
												label: props.detail.name,
											})

											window.open(
												`${process.env.REACT_APP_WHATSAPP}?phone=${props.detail.code}${props.detail.phone}&text=Hola ${props.detail.account}, te encontre en cuentasvirales.com y me gustaría que hagamos la dinámica de (MENCIÓN x MENCIÓN)`
											)
										}}>
										<span className='cv-detail-actiones-title-a' style={{ cursor: 'pointer' }}>
											Click aquí
										</span>
									</Popconfirm>
								</p>
							}
						/>

						<Comment
							author={<p className='cv-detail-actiones-title'>Producto x Mención</p>}
							avatar={<AuditOutlined style={{ fontSize: '26px' }} />}
							content={
								<p>
									¡Aumenta tu credibilidad!
									<br />
									<Popconfirm
										title='El influencer te pedirá un "PRODUCTO" a cambio de la publicidad, el influencer se quedará con dicho producto que primero debe probar y hará la mención de tu negocio (cada influencer tiene sus propias normas) ¿Estás de acuerdo?'
										okText='Si'
										cancelText='No'
										icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
										onConfirm={() => {
											serviceEventGoogleAnalytics({
												category: 'intercambio',
												action: 'click-producto',
												label: props.detail.name,
											})
											window.open(
												`${process.env.REACT_APP_WHATSAPP}?phone=${props.detail.code}${props.detail.phone}&text=Hola ${props.detail.account}, te encontre en cuentasvirales.com y me gustaría darte un PRODUCTO por una mención en tu cuenta`
											)
										}}>
										<a href={'/#'} className='cv-detail-actiones-title-a'>
											Click aquí
										</a>
									</Popconfirm>
								</p>
							}
						/>
					</Col>
				</Row>
			</div>
		</>
	)
}
