/** @format */

import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { Dropdown, Menu, Badge, Row, Col } from 'antd'
import { NotificationOutlined } from '@ant-design/icons'
import 'moment/locale/es'
import lodash from 'lodash'

import serviceEventGoogleAnalytics from '../../../../../ServiceCommons/EventsGoogleAnalitycs'
import { serviceGetData } from './services'
import './style.css'

export default function Notification() {
	const [data, setData] = useState([])

	useEffect(() => {
		serviceGetData().then((response) => {
			const suffle = lodash.shuffle(response.data.data)
			setData(suffle)
		})
		console.log('useEffect')
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const menu = data.map((item, key) => {
		return (
			<Menu.Item key={key}>
				<Row
					key={key.toString()}
					onClick={() => {
						serviceEventGoogleAnalytics({
							category: 'notification',
							action: 'click',
							label: `${item.title}`,
						})
						window.open(item.redirect)
					}}>
					<Col xs={3} sm={3} md={3}>
						<img className='cv-header-notifi-list-img' src={item.image} alt={item.title} />
					</Col>
					<Col xs={21} sm={21} md={21} className='cv-header-notifi-list-content'>
						<h3 className='cv-header-notifi-list-title'>{item.title}</h3>
						<h3 className='cv-header-notifi-list-moment'>
							<Moment format='D MMM YYYY' withTitle>
								{item.createdAt}
							</Moment>
						</h3>
					</Col>
				</Row>
				<hr className='cv-header-notifi-list-hr'></hr>
			</Menu.Item>
		)
	})

	return (
		<>
			<Dropdown
				overlayClassName='cv-header-notifi-content'
				shape={'circle'}
				overlay={<Menu>{menu}</Menu>}
				placement='bottomCenter'
				arrow>
				<Badge dot>
					<NotificationOutlined />
				</Badge>
			</Dropdown>
		</>
	)
}
