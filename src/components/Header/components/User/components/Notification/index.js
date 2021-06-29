/** @format */

import React, { useEffect, useState } from 'react'
import 'moment/locale/es'
import lodash from 'lodash'

import { Dropdown, Menu, Row, Col } from 'antd'
import { EllipsisOutlined, FileDoneOutlined } from '@ant-design/icons'

import serviceEventGoogleAnalytics from '../../../../../ServiceCommons/EventsGoogleAnalitycs'
import { serviceGetData } from './services'
import './style.css'

export default function Notification() {
	const [data, setData] = useState([])

	useEffect(() => {
		serviceGetData().then((response) => {
			console.log(response)
			const suffle = lodash.shuffle(response.data)
			setData(suffle)
		})
	}, [])

	const menu = data.map((item, key) => {
		return (
			<Menu.Item key={key} className='cv-header-notifi-content-menu-item'>
				<Row
					className='cv-header-notifi-content-menu-item-row'
					onClick={() => {
						serviceEventGoogleAnalytics({
							category: 'notification',
							action: 'click',
							label: `${item.title}`,
						})
						window.open(item.redirect)
					}}>
					<Col xs={4} sm={4} md={4}>
						<img className='cv-header-notifi-list-img' src={item.image} alt={item.title} />
					</Col>
					<Col xs={20} sm={20} md={20} className='cv-header-notifi-list-content'>
						<h3 className='cv-header-notifi-list-title'>{item.title}</h3>
						<h3 className='cv-header-notifi-list-moment'>{item.followers} Seguidores</h3>
					</Col>
				</Row>
			</Menu.Item>
		)
	})

	const menuNotifi = (
		<Menu>
			<Menu.Item
				onClick={() => {
					window.open(
						'https://api.whatsapp.com/send?phone=56979582051&text=Hola!%20Me%20gustar%C3%ADa%20aparecer%20en%20cuentasvirales.com'
					)
				}}>
				<FileDoneOutlined style={{ color: '#f61073' }} /> Quiero Aparecer Aquí
			</Menu.Item>
		</Menu>
	)

	return (
		<>
			<Dropdown
				trigger={['click']}
				shape={'circle'}
				overlay={
					<Menu className='cv-header-notifi-content-menu'>
						<div className='cv-header-notifi-content-title'>
							<Row>
								<Col xs={20} sm={20} md={20}>
									<h3>Notificaciones</h3>
								</Col>
								<Col xs={4} sm={4} md={4} className='cv-header-notifi-title-icon'>
									<Dropdown trigger={['click']} overlay={menuNotifi} placement='bottomRight'>
										<EllipsisOutlined className='cv-header-notifi-title-icon-i' />
									</Dropdown>
								</Col>
							</Row>
						</div>
						{menu}
					</Menu>
				}
				placement='bottomCenter'>
				<img
					width='20px'
					src='https://i.ibb.co/52F1BcC/notificacion.png'
					title='Notification'
					alt='Notification'
				/>
			</Dropdown>
		</>
	)
}
