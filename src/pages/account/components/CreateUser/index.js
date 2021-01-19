/** @format */

import React from 'react'

import { UserOutlined } from '@ant-design/icons'

export default class CreateUser extends React.Component {
	render() {
		return (
			<>
				<div className='cv-detail-contente-user-create'>
					<hr className='cv-detail-hr' />
					<h3 className='cv-detail-user-create-title'>Creado por</h3>
					<UserOutlined />
					&nbsp; {this.props.email}
				</div>
			</>
		)
	}
}
