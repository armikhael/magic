/** @format */

import React from 'react'
import { List, Layout, Card, Typography } from 'antd'
import { RightOutlined } from '@ant-design/icons'

import './style.css'
const { Content } = Layout

const LinkTree = (props) => {
	return (
		<>
			<Content className='cv-container-main'>
				<div className='cv-linktree-content' style={{ borderRadius: '20px' }}>
					<Card className='cv-linktree-card mt20' bordered={false} style={{ textAlign: 'center' }}>
						<img
							width='48px'
							src='https://i.ibb.co/M93R2Gh/link.png'
							alt='Multiples enlaces'
							style={{ margin: '20px 0px' }}
						/>

						<List
							style={{ borderRadius: '10px' }}
							bordered
							dataSource={props.componentData}
							renderItem={(item, key) => (
								<List.Item
									style={{ cursor: 'pointer' }}
									onClick={() => {
										window.open(item.url)
									}}
									actions={[<RightOutlined />]}>
									<Typography.Text>{item.title} </Typography.Text>
								</List.Item>
							)}
						/>
						<p> ¿Cómo crear estos enlaces? Click Aquí</p>
					</Card>
				</div>
			</Content>
		</>
	)
}

export default LinkTree
