/** @format */

import React from 'react'

import { Avatar } from 'antd'

import './style.css'

class User extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className='cv-navbar-user-content'>
					<Avatar>U</Avatar>
				</div>
			</React.Fragment>
		)
	}
}

export default User
