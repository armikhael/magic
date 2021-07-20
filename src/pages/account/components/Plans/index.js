/** @format */

import React, { useState, useEffect } from 'react'
import { List, Avatar } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'
import { HeartOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons'
import { Row, Comment } from 'antd'

import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'

const Plans = (props) => {
	const [text, setText] = useState('Planes Publicitarios')

	useEffect(() => {
		if (props.componentData.plans.length <= 0) {
			setText('Servicios Publicitarios')
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
			{props.componentData.plans.length > 0 && (
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

			{props.componentData.plans.length <= 0 && (
				<div className='cv-detail-content-plans'>
					<div className='cv-detail-content-plans-main'>
						<h3 className='cv-detail-plans-title'>{text}</h3>
						<div className='cv-detail-plans-hr'></div>

						<Row>
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
													category: 'promocion-producto',
													label: props.componentData.name,
													concept: `te encontre en cuentasvirales.com y quisiera más información de tus servicios publicitarios para Promocionar un Producto`,
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
								author={<p className='cv-detail-actiones-title'>Promocionar una Cuenta</p>}
								avatar={<UserOutlined style={{ fontSize: '26px' }} />}
								content={
									<p>
										Crece de forma natural y aumenta tu comunidad
										<br />
										<span
											onClick={() => {
												handleRedirect({
													data: props.componentData,
													action: 'click',
													category: 'promocion-cuenta',
													label: props.componentData.name,
													concept: `te encontre en cuentasvirales.com y quisiera más información de tus servicios publicitarios para Promocionar una Cuenta`,
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
								author={<p className='cv-detail-actiones-title'>Enviar un Saludo ó Felicitación</p>}
								avatar={<SmileOutlined style={{ fontSize: '26px' }} />}
								content={
									<p>
										Crea una experiencia única para tu amig@
										<br />
										<span
											onClick={() => {
												handleRedirect({
													data: props.componentData,
													action: 'click',
													category: 'enviar-saludo',
													label: props.componentData.name,
													concept: `te encontre en cuentasvirales.com y quisiera más información de tus servicios publicitarios para Enviar un Saludo`,
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
