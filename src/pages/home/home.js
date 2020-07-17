/** @format */

import React from 'react'
import { Button, DatePicker } from 'antd'

class Home extends React.Component {
	render() {
		return (
			<div>
				<h1>Hola mundo!</h1>
				<p>{process.env.REACT_APP_ENVIROMENT}</p>
				<>
					<Button type='primary'>PRESS ME</Button>
					<DatePicker placeholder='select date' />
				</>
			</div>
		)
	}
}
export default Home
