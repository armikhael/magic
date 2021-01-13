/** @format */

import React from 'react'
import { Layout } from 'antd'
import './style.css'
const { Content } = Layout

export default class Activation extends React.Component {

	render() {
		return (
			<>
				<Content className='cv-container-main'>
					<div className='cv-category-content-title'>
						<h1 className='cv-category-title'>
							Nos estaremos comunicando con usted a su cuenta de instagram para verificar su identidad
						</h1>
					</div>
				</Content>
			</>
		)
	}
}
