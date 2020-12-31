/** @format */

import React from 'react'
import { withRouter } from 'react-router-dom'

import Header from '../../components/Header/'

function Layout(props) {
	const handleLayouts = () => {
		if (props.location.pathname === '/auth/login') {
			return <>{props.children}</>
		} else {
			return (
				<>
					<Header />
					{props.children}
				</>
			)
		}
	}

	return <React.Fragment>{handleLayouts()}</React.Fragment>
}

export default withRouter(Layout)
