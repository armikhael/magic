/** @format */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'
import { HeartOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons'
import { Row, Comment } from 'antd'

import { CONSTANTS } from '../../../../components/ServiceCommons/Constant'
import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'

const Plans = (props) => {
	const [text, setText] = useState('Paquetes Publicitarios')
	const [plans, setPlans] = useState([])
	const DEFAULT_PLANS = {
		instagram: [
			{
				description: 'Historia',
				type: 'por Canje / Intercambio',
				// price: ((props.componentData.followers / 1000) * 0.6).toFixed(0),
				// currency: 'Dólar(es)',
			},
			{
				description: 'Publicación',
				type: 'por Canje / Intercambio',
			},
			{
				description: 'Carousel',
				type: 'por Canje / Intercambio',
			},
			{
				description: 'Reels',
				type: 'por Canje / Intercambio',
			},
			{
				description: 'Video',
				type: 'por Canje / Intercambio',
			},
			{
				description: 'IGTV',
				type: 'por Canje / Intercambio',
			},
		],

		tiktok: [
			{
				description: 'Video de 15 segundos',
				type: 'por Canje / Intercambio',
			},
			{
				description: 'Video de 30 segundos',
				type: 'por Canje / Intercambio',
			},
			{
				description: 'Video de 45 segundos',
				type: 'por Canje / Intercambio',
			},
			{
				description: 'Video de 60 segundos',
				type: 'por Canje / Intercambio',
			},
		],
	}

	useEffect(() => {
		if (props.componentData.plans.length <= 0) {
			setText('Servicios Publicitarios')
		}

		if (props.componentData.representation === true) {
			props.componentData.code = '56'
			props.componentData.phone = '979582051'
		}

		if (props.componentData.followers <= CONSTANTS.MIN_FOLLOWERS) {
			setPlans(DEFAULT_PLANS[props.componentData.type])
		} else if (props.componentData.followers >= CONSTANTS.MIN_FOLLOWERS && props.componentData.plans.length > 0) {
			setPlans(props.componentData.plans)
		} else {
			setPlans(DEFAULT_PLANS[props.componentData.type])
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props])

	const handleRedirect = (item) => {
		serviceEventGoogleAnalytics({
			action: item.action,
			category: item.category,
			label: item.label,
		})
		window.open(
			`${process.env.REACT_APP_WHATSAPP}?phone=${item.data.code}${item.data.phone}&text=Hola ${item.data.account}, ${item.concept}`
		)
	}

	return (
		<>
			{props.componentData.representation === false && (
				<div className='cv-detail-content-plans'>
					<div className='cv-detail-content-plans-main'>
						<h3 className='cv-detail-plans-title'>{text}</h3>
						<div className='cv-detail-plans-hr'></div>

						<List
							className='cv-detail-plans-list'
							itemLayout='horizontal'
							dataSource={plans}
							renderItem={(item) => (
								<span
									onClick={() => {
										handleRedirect({
											data: props.componentData,
											action: 'click',
											category: 'contratacion',
											label: props.componentData.name,
											concept: `te encontre en cuentasvirales.com y quisiera contratar tu publicidad de: ${item.description} ${item.type}`,
										})
									}}>
									<List.Item actions={[<WhatsAppOutlined />]}>
										<List.Item.Meta
											avatar={<Avatar src={props.componentData.image} />}
											title={`${item.description}`}
											description={item.type}
										/>
									</List.Item>
								</span>
							)}
						/>
						<p style={{ textAlign: 'center' }}>Puedes hacer el pago en tu moneda local</p>
					</div>
				</div>
			)}

			{(props.componentData.plans.length <= 0 || props.componentData.representation === true) && (
				<div className='cv-detail-content-plans'>
					<div className='cv-detail-content-plans-main'>
						<h3 className='cv-detail-plans-title'>{text}</h3>
						<div className='cv-detail-plans-hr'></div>

						<Row>
							<Comment
								author={<p className='cv-detail-actiones-title'>Posicionar una Cuenta</p>}
								avatar={<UserOutlined style={{ fontSize: '26px' }} />}
								content={
									<p>
										Aumento de Seguidores
										<br />
										<Link
											to={`/help/posicionamiento/${props.componentData.name}`}
											className='cv-detail-actiones-title-a'>
											Click aquí
										</Link>
									</p>
								}
							/>

							<Comment
								author={<p className='cv-detail-actiones-title'>Promocionar un Producto</p>}
								avatar={<HeartOutlined style={{ fontSize: '26px' }} />}
								content={
									<p>
										Incrementa la confianza de tus clientes
										<br />
										<span
											onClick={() => {
												handleRedirect({
													data: props.componentData,
													action: 'click',
													category: 'respresentacion-producto',
													label: props.componentData.name,
													concept: `te encontre en cuentasvirales.com y quisiera promocionar un producto contigo.`,
												})
											}}
											className='cv-detail-actiones-title-a'
											style={{ cursor: 'pointer' }}>
											Click aquí
										</span>
									</p>
								}
							/>

							<Comment
								author={<p className='cv-detail-actiones-title'>Promocionar un Servicio</p>}
								avatar={<SmileOutlined style={{ fontSize: '26px' }} />}
								content={
									<p>
										Recibe testimonios que generen credibilidad
										<br />
										<span
											onClick={() => {
												handleRedirect({
													data: props.componentData,
													action: 'click',
													category: 'respresentacion-servicio',
													label: props.componentData.name,
													concept: `te encontre en cuentasvirales.com y quisiera promocionar un servicio contigo.`,
												})
											}}
											className='cv-detail-actiones-title-a'
											style={{ cursor: 'pointer' }}>
											Click aquí
										</span>
									</p>
								}
							/>
						</Row>
					</div>
				</div>
			)}
		</>
	)
}

export default Plans
