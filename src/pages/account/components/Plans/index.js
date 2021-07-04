/** @format */

import React from 'react'
import { List, Avatar } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'

import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'

const Plans = (props) => {
	const plansRepresentation = [
		{ name: 'Promocionar un Producto' },
		{ name: 'Promocionar una Cuenta' },
		{ name: 'Enviar un saludo' },
		{ name: 'Felicitar a un ser querido' },
	]

	return (
		<>
			<div className='cv-detail-content-plans'>
				<div className='cv-detail-content-plans-main'>
					<h3 className='cv-detail-plans-title'>Planes</h3>
					<div className='cv-detail-plans-hr'></div>

					{props.componentData.representation === true && (
						<List
							className='cv-detail-plans-list'
							itemLayout='horizontal'
							dataSource={plansRepresentation}
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
											`${process.env.REACT_APP_WHATSAPP}?phone=${props.componentData.code}${props.componentData.phone}&text=Hola ${props.componentData.account},+te+encontre+en+cuentasvirales.com+y+quisiera+el+servicio+de:+${item.name}`
										)
									}}>
									<List.Item actions={[<WhatsAppOutlined />]}>
										<List.Item.Meta
											avatar={<Avatar src={props.componentData.image} />}
											title={item.name}
											description={`A Convenir`}
										/>
									</List.Item>
								</span>
							)}
						/>
					)}

					{props.componentData.representation === false && (
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
					)}
				</div>
			</div>
		</>
	)
}

export default Plans
