/** @format */

import React, { useState, useEffect } from 'react'
import { List, Avatar } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'
import { HeartOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons'
import { Row, Comment } from 'antd'

import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

import ModalService from '../ModalService'
import './style.css'

const Plans = (props) => {
	const [text, setText] = useState('Planes')

	useEffect(() => {
		if (props.componentData.representation === true) {
			setText('Servicios Publicitarios')
		}
	}, [props])

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
							dataSource={props.componentData.plans}
							renderItem={(item) => (
								<span
									onClick={() => {
										console.log('contratacion')
										serviceEventGoogleAnalytics({
											category: 'planes',
											action: 'click-contratacion',
											label: props.componentData.name,
										})
										window.open(
											`${process.env.REACT_APP_WHATSAPP}?phone=${props.componentPlans.code}${props.componentPlans.phone}&text=Hola ${props.componentPlans.account},+te+encontre+en+cuentasvirales.com+y+quisiera+este+paquete+publicitario:+${item.description} por ${item.price} ${item.currency}`
										)
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

			{props.componentData.representation === true && (
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
										<ModalService
											componentHeader={'Condiciones del Servicio'}
											componentDescription={`
											Debes entregarnos un producto de tu marca para generar el contenido correspondiente con ${
												props.componentData.account
											}, promocionar tu producto tiene un costo de: 
											<br> 
											<p style="font-size:24px; text-align:center">${parseInt(props.componentData.followers / 1000)} Dólares</p> 
											<p>Nota: Puedes hacer el pago en tu moneda local</p>
											<p>Promocionar tu producto inclye: </p>
											<ul>
												<li>Una historia</li>
												<li>Un Reels</li>
												<li>Una Publicación en el Feed</li>
											</ul>
											<p style="text-align:center">¿Estas de acuerdo?</p>
											`}
											componentData={props.componentData}
											componentType={'Promocionar un Producto'}
											componentCategory={'contrato-producto'}
										/>
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
										<ModalService
											componentHeader={'Condiciones del Servicio'}
											componentDescription={`
											Este método es usado para viralizar tu cuenta en el menor tiempo posible, logra que tu cuenta pueda generar mayor confianza y que puedas destacar sobre tu competencia.
											<p style="text-align:center; margin-top: 15px;">¿Quieres conocer los paquetes?</p> 
											`}
											componentData={props.componentData}
											componentType={'Promocionar una Cuenta'}
											componentCategory={'contrato-cuenta'}
										/>
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
										<ModalService
											componentHeader={'Condiciones del Servicio'}
											componentDescription={`Si tu amig@ es fan de  ${props.componentData.account} sólo tienes que indicarnos el tipo de saludo o felicitaciones que quisieras enviar a tu amig@ especial y de esa manera crearemos una experiencia única.`}
											componentData={props.componentData}
											componentType={'Enviar un Saludo'}
											componentCategory={'contrato-saludo'}
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
