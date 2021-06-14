/** @format */

import React, { useEffect, useState } from 'react'
import {
	AuditOutlined,
	QuestionCircleOutlined,
	NotificationOutlined,
	HeartOutlined,
	LockOutlined,
} from '@ant-design/icons'
import { Line } from '@ant-design/charts'
import { Row, Col, Comment, Popconfirm } from 'antd'

import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'

export default function Views(props) {
	const [isPermission, setPermission] = useState(false)
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
				if (resultPermissions === true) {
					setPermission(true)
				} else {
					setPermission(false)
				}
			}
		}

		console.log(props.permissions)
	}, [props])

	const handlePermissions = () => {
		if (props.permissions === undefined) {
			return (
				<>
					<LockOutlined style={{ fontSize: '14px', color: 'red' }} /> Debes estar registrad@ para acceder a
					esta función
					<a href={'/auth/register'} className='cv-detail-actiones-title-a'>
						{' '}
						Registrarme
					</a>
				</>
			)
		} else {
			return (
				<>
					<LockOutlined style={{ fontSize: '14px', color: 'red' }} /> Debes tener tu cuenta de{' '}
					{props.detail.type} registrad@ para acceder a esta función
					<a href={'/profile/create-account'} className='cv-detail-actiones-title-a'>
						{' '}
						Crear Cuenta
					</a>
				</>
			)
		}
	}
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
									{isPermission === true && (
										<Popconfirm
											title='El influencer dará likes a tus publicaciones y tú a las de el, de esa manera aumentan la interacción en sus cuentas ¿Estás de acuerdo?'
											okText='Aceptar'
											cancelText='Rechazar'
											icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
											onConfirm={() => {
												serviceEventGoogleAnalytics({
													category: 'intercambio',
													action: 'click-like',
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
									)}
									{isPermission === false && handlePermissions()}
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
									{isPermission === true && (
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
									)}
									{isPermission === false && handlePermissions()}
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
