/** @format */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends React.Component {
	render() {
		let isAuthenticated = localStorage.getItem('user')
		if (isAuthenticated) {
			return <Route {...this.props} />
		}
		return <Redirect to='/auth/login' />
	}
}
export default PrivateRoute
