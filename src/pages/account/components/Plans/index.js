/** @format */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'
import { HeartOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons'
import { Row, Comment } from 'antd'

import { CONSTANTS } from '../../../../components/ServiceCommons/Constant'
import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'
import ModalService from '../ModalService'

import './style.css'

const Plans = (props) => {
	const [text, setText] = useState('Paquetes Publicitarios')
	const [plans, setPlans] = useState([])
	const DEFAULT_PLANS = {
		instagram: [
			{
				description: 'Historia',
				price: ((props.componentData.followers / 1000) * 0.15).toFixed(0),
				currency: 'Dólar(es)',
			},
			{
				description: 'Publicación',
				price: ((props.componentData.followers / 1000) * 0.3).toFixed(0),
				currency: 'Dólar(es)',
			},
			{
				description: 'Carousel',
				price: ((props.componentData.followers / 1000) * 0.45).toFixed(0),
				currency: 'Dólar(es)',
			},
			{
				description: 'Reels',
				price: ((props.componentData.followers / 1000) * 0.6).toFixed(0),
				currency: 'Dólar(es)',
			},
			{
				description: 'Video',
				price: ((props.componentData.followers / 1000) * 0.85).toFixed(0),
				currency: 'Dólar(es)',
			},
			{
				description: 'IGTV',
				price: ((props.componentData.followers / 1000) * 1).toFixed(0),
				currency: 'Dólar(es)',
			},
		],

		tiktok: [
			{
				description: 'Video 15 segundos',
				price: ((props.componentData.followers / 1000) * 0.15).toFixed(0),
				currency: 'Dólar(es)',
			},
			{
				description: 'Video 30 segundos',
				price: ((props.componentData.followers / 1000) * 0.3).toFixed(0),
				currency: 'Dólar(es)',
			},
			{
				description: 'Video 45 segundos',
				price: ((props.componentData.followers / 1000) * 0.45).toFixed(0),
				currency: 'Dólar(es)',
			},
			{
				description: 'Video 60 segundos',
				price: ((props.componentData.followers / 1000) * 0.6).toFixed(0),
				currency: 'Dólar(es)',
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
											concept: `te encontre en cuentasvirales.com y quisiera contratar tu publicidad de: ${item.description} por ${item.price} ${item.currency}`,
										})
									}}>
									<List.Item actions={[<WhatsAppOutlined />]}>
										<List.Item.Meta
											avatar={<Avatar src={props.componentData.image} />}
											title={`${item.description}`}
											description={`Precio: ${item.price} ${item.currency}`}
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
										<ModalService
											componentHeader={'Incluye:'}
											componentCategory={'promocion-producto'}
											componentData={props.componentData}
											componentType={'Promocionar un Producto'}
											componentValue={Math.round(props.componentData.followers / 2 / 1000)}
											componentDescription={`
												<lu>
													<li>1 Historia destapando el producto.</li>
													<li>1 Reels creando contenido de los beneficios.</li>
													<li>1 Publicación modelando el procducto.</li>
													<li>Importante: Es necesario el producto en físico.</li>
												</ul>
												<p style="magin-top: 10px;">Valor: <span style="font-size: 32px">${Math.round(
													props.componentData.followers / 2 / 1000
												)} </span>Dólar(es)</p>
											`}
										/>
									</p>
								}
							/>

							<Comment
								author={<p className='cv-detail-actiones-title'>Interacción</p>}
								avatar={<SmileOutlined style={{ fontSize: '26px' }} />}
								content={
									<p>
										Recibe interacción para crear impacto
										<br />
										<ModalService
											componentHeader={'Incluye:'}
											componentCategory={'promocion-interaccion'}
											componentData={props.componentData}
											componentType={'Interacción'}
											componentValue={Math.round(props.componentData.followers / 10 / 1000)}
											componentDescription={`
												<lu>
													<li>Dejará likes y comentarios tus primeras 9 publicaciones</li>
												</ul>
												<p>Valor: <span style="font-size: 32px">${Math.round(props.componentData.followers / 10 / 1000)} </span>Dólar(es)</p>
											`}
										/>
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
