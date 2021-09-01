/** @format */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Button, Drawer, List, Row, Col } from 'antd'
import { BellOutlined, RightOutlined, RightCircleOutlined } from '@ant-design/icons'

import serviceEventGoogleAnalytics from '../../../../../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'

const DrawerLinktree = (props) => {
	const [showDrawer, setShowDrawer] = useState(false)

	useEffect(() => {
		console.log('useEffect')
	}, [props])

	const data = [
		{ key: '1', text: '¿Tener un enlace como este?', link: '/help/mis-enlaces' },
		{ key: '2', text: '¿Ganar Seguidores en Instagram?', link: '/help/posicionamiento' },
	]

	return (
		<>
			<div id='loader'></div>
			<Button
				className='cv-account-btn-linktree'
				shape='circle'
				icon={<BellOutlined className='cv-pulse' />}
				size={'large'}
				style={{ color: '#ec3f7c' }}
				onClick={() => {
					serviceEventGoogleAnalytics({
						action: 'click',
						category: 'ayuda-publicitaria',
						label: 'boton principal (campana)',
					})
					setShowDrawer(true)
				}}
			/>
			<Drawer
				title='¿En qué te podemos ayudar?'
				placement={'bottom'}
				closable={false}
				onClose={() => {
					setShowDrawer(false)
				}}
				visible={showDrawer}
				key={'bottom'}>
				<Row>
					<Col xs={24} sm={24} md={8}>
						<Row className='cv-account-linktree-content-card'>
							<Col xs={3} sm={3} md={3}>
								<img
									src='https://i.postimg.cc/YSQXZWCP/logo.jpg'
									title='Información'
									alt='Información'
								/>
							</Col>
							<Col xs={17} sm={17} md={17} className='cv-account-linktree-content-card-two'>
								<h3>Lorem Ipsum</h3>
								<p>Is simply dummy text of the printing and typesetting industry.</p>
							</Col>
							<Col xs={4} sm={4} md={4} className='cv-account-linktree-content-card-three'>
								<RightCircleOutlined style={{ fontSize: '25px', color: '#797979' }} />
							</Col>
						</Row>
					</Col>
				</Row>
				<List
					size='large'
					dataSource={data}
					renderItem={(item) => (
						<List.Item
							actions={[
								<Link
									key={item.key}
									to={item.link}
									onClick={() => {
										serviceEventGoogleAnalytics({
											action: 'click',
											category: 'ayuda-publicitaria',
											label: item.text,
										})
										console.log('clickDrawer')
									}}>
									<RightOutlined />
								</Link>,
							]}>
							<Link
								key={item.key}
								to={item.link}
								onClick={() => {
									serviceEventGoogleAnalytics({
										action: 'click',
										category: 'ayuda-publicitaria',
										label: item.text,
									})
									console.log('clickDrawer')
								}}>
								{item.text}{' '}
							</Link>
						</List.Item>
					)}
				/>
			</Drawer>
		</>
	)
}

export default DrawerLinktree
