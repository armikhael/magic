/** @format */

import React from 'react'
import { Layout, Card, Typography, Button } from 'antd'

import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'
const { Content } = Layout

const LinkTree = (props) => {
	serviceEventGoogleAnalytics({
		category: 'enlace-personalizado',
		action: 'view',
		label: props.componentData.name,
	})
	return (
		<>
			<Content className='cv-container-main'>
				<div className='cv-linktree-content' style={{ borderRadius: '20px' }}>
					<Card className='cv-linktree-card mt20' bordered={false} style={{ textAlign: 'center' }}>
						<img
							width='128px'
							src={props.componentData.image || 'https://i.ibb.co/M93R2Gh/link.png'}
							alt='Multiples enlaces'
							style={{ margin: '20px 0px', borderRadius: '10px' }}
						/>
						<h3 style={{ margin: '5% 10%' }}>{props.componentData.account}</h3>
						<p style={{ margin: '5% 5%' }}>{props.componentData.description}</p>
						{props.componentData.links.map((item, key) => {
							return (
								<Button
									key={key.toString()}
									block
									style={{ margin: '8px 0px' }}
									shape='round'
									onClick={() => {
										window.open(item.url)
										serviceEventGoogleAnalytics({
											category: 'enlace-personalizado',
											action: 'click',
											label: `boton ${key}`,
										})
									}}>
									<Typography.Text>{item.title}</Typography.Text>
								</Button>
							)
						})}
					</Card>
				</div>
			</Content>
		</>
	)
}

export default LinkTree
