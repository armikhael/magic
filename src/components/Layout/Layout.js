/** @format */

import React from 'react'
import { withRouter } from 'react-router-dom'

import Navbar from '../../components/Navbar/Navbar'

function Layout(props) {
	const handleLayouts = () => {
		if (props.location.pathname === '/auth/login') {
			return <>{props.children}</>
		} else {
			return (
				<>
					<Navbar />
					{props.children}
				</>
			)
		}
	}

	return <React.Fragment>{handleLayouts()}</React.Fragment>
}

export default withRouter(Layout)
