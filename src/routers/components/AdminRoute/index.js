/** @format */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'

class AdminRoute extends React.Component {
	render() {
    let admin = [
      'diego.carciente@gmail.com',
      'carlosarmikhael@gmail.com',
      'carlos.espinoza@pharol.cl'
    ]

    let isAuthenticated = JSON.parse(localStorage.getItem('user'))
		if (admin.includes(isAuthenticated.email)) {
			return <Route {...this.props} />
		}
		return <Redirect to='/' />
	}
}
export default AdminRoute
