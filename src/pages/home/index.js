/** @format */

import React from 'react'
import { Button, DatePicker } from 'antd'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Account from '../../components/Account/Account'

import './style.css'
import serviceGetAccounts from './services'

class Home extends React.Component {
	constructor(props) {
		super(props)
		console.log('1. constructor')
		this.state = {
			title: 'Hola Mundo!',
			service: null,
			accounts: {}
		}
	}


	async componentDidMount () {
		console.log('3. componentDidMount')
		let accounts = await serviceGetAccounts()

		this.setState({ 
			service: accounts.itemsPerPage,
			accounts: accounts.data
		})
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
				<p> Servicio nuevo: { this.state.service }</p>

				<Account items={this.state.accounts}/>
			
				<Footer />
			</div>
		)
	}
}

export default Home
