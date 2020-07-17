/** @format */

import React from 'react'

class Home extends React.Component {
	render() {
		return (
			<div>
				<h1>Hola mundo</h1>
				<p>{process.env.REACT_APP_ENVIROMENT}</p>
			</div>
		)
	}
}
export default Home
