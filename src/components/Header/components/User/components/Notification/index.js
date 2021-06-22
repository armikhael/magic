/** @format */

import React, { useEffect, useState } from 'react'
import { Button, Popover } from 'antd'
import { NotificationOutlined } from '@ant-design/icons'

import { serviceGetData } from './services'
import './style.css'

const Notification = (props) => {
	const [data, setData] = useState([])

	const fetchData = async () => {
		const response = await serviceGetData()
		console.log('response', response.data)
		setData(response.data.data)
	}
	useEffect(() => {
		fetchData()
	}, [])

	const content = data.map((item, key) => {
		return (
			<p key={key.toString()}>
				<img style={{ width: '12px' }} src={item.image} alt={item.title} />
				<span>&nbsp;{item.title}</span>
			</p>
		)
	})

	return (
		<>
			<Popover content={content} title='Title' trigger='hover'>
				<Button style={{ margin: '0px 5px' }} shape='circle'>
					<NotificationOutlined />
				</Button>
			</Popover>
		</>
	)
}

export default Notification
