/** @format */

import React, { useState, useEffect } from 'react'
import { Button, Drawer, List } from 'antd'
import { BellOutlined, RightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

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
