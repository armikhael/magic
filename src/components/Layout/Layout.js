/** @format */

import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga';
import Header from '../../components/Header/'

function Layout(props) {

	useEffect(() => {
			ReactGA.initialize('G-V1CD33BQQ4');
			ReactGA.pageview(window.location.pathname + window.location.search);
	}, [])

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
