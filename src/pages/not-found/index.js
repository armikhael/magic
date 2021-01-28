/** @format */

import React from 'react'
import { Result, Button } from 'antd'
import { NavLink } from 'react-router-dom'

class NotFound extends React.Component {
	render() {
		return (
			<Result
				status='404'
				title='404'
				subTitle='Lo sentimos no encontramos esta página.'
				extra={
					<Button type='primary'>
						<NavLink to='/'>Volver al Home</NavLink>
					</Button>
				}
			/>
		)
	}
}
export default NotFound
