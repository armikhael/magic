/** @format */

import React from 'react'
import { Result, Button } from 'antd'
import { NavLink } from 'react-router-dom'

class PageError extends React.Component {
	render() {
		return (
			<Result
				status={this.props.detailError.statusCode}
				title={this.props.detailError.statusCode}
				subTitle={this.props.detailError.message}
				extra={
					<Button type='primary'>
						<NavLink to='/'>Back Home</NavLink>
					</Button>
				}
			/>
		)
	}
}
export default PageError
