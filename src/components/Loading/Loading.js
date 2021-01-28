/** @format */

import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

import './style.css'

function Loading() {
	return (
		<div className='loading'>
			<LoadingOutlined style={{ fontSize: 24 }} spin />
		</div>
	)
}

export default Loading
