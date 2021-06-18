/** @format */

import React from 'react'
import { List, Layout, Card, Typography } from 'antd'
import { RightOutlined } from '@ant-design/icons'

import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'
const { Content } = Layout

const LinkTree = (props) => {
	console.log('LinkTree', props.componentData)
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

						<List
							style={{ borderRadius: '10px' }}
							bordered
							dataSource={props.componentData.links}
							renderItem={(item, key) => (
								<List.Item
									style={{ cursor: 'pointer' }}
									onClick={() => {
										window.open(item.url)
										serviceEventGoogleAnalytics({
											category: 'enlace-personalizado',
											action: 'click',
											label: `Boton número ${key}`,
										})
									}}
									actions={[<RightOutlined />]}>
									<Typography.Text>{item.title} </Typography.Text>
								</List.Item>
							)}
						/>
					</Card>
				</div>
			</Content>
		</>
	)
}

export default LinkTree
