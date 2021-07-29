/** @format */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'
import { HeartOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons'
import { Row, Comment } from 'antd'

import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'
import ModalService from '../ModalService'

import './style.css'

const Plans = (props) => {
	const [text, setText] = useState('Planes Publicitarios')

	useEffect(() => {
		if (props.componentData.plans.length <= 0) {
			setText('Servicios Publicitarios')
		}

		if (props.componentData.representation === true) {
			props.componentData.code = '56'
			props.componentData.phone = '979582051'
		}
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
			{props.componentData.plans.length > 0 && props.componentData.representation === false && (
				<div className='cv-detail-content-plans'>
					<div className='cv-detail-content-plans-main'>
						<h3 className='cv-detail-plans-title'>{text}</h3>
						<div className='cv-detail-plans-hr'></div>

						<List
							className='cv-detail-plans-list'
							itemLayout='horizontal'
							dataSource={props.componentData.plans}
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
											title={item.description}
											description={`Precio: ${item.price} ${item.currency}`}
										/>
									</List.Item>
								</span>
							)}
						/>
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
												)} </span>Dólares</p>
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
												<p>Valor: <span style="font-size: 32px">${Math.round(props.componentData.followers / 10 / 1000)} </span>Dólares</p>
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
