/** @format */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'

class AdminRoute extends React.Component {
	render() {
		let admin = [
			'diego.carciente@gmail.com',
			'diego.carciente@pharol.cl',
			'carlosarmikhael@gmail.com',
			'carlos.espinoza@pharol.cl',
			'yasbarrera2@gmail.com',
			'cuentasvirales@gmail.com',
			'floarditti@gmail.com',
			'cjmulford188@gmail.com',
		]

		let isAuthenticated = JSON.parse(localStorage.getItem('user'))
		if (admin.includes(isAuthenticated.email)) {
			return <Route {...this.props} />
		}
		return <Redirect to='/' />
	}
}
export default AdminRoute
