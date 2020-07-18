/** @format */

import React from 'react'
import { Button, DatePicker } from 'antd'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

import './style.css'
import servicesHome from './services'

class Home extends React.Component {
	constructor(props) {
		super(props)
		console.log('1. constructor')

		this.state = {
			title: 'Hola Mundo!',
		}
	}

	handleServicesHome = (item) => {
		servicesHome(this.state.title)
	}

	componentDidMount() {
		console.log('3. componentDidMount')
		this.handleServicesHome()
	}

	render() {
		return (
			<div>
				<Navbar />
				<h1>{this.state.title}</h1>
				<p>{process.env.REACT_APP_ENVIROMENT}</p>
				<>
					<Button type='primary'>PRESS ME</Button>
					<DatePicker placeholder='select date' />
				</>
				<Footer />
			</div>
		)
	}
}
export default Home
