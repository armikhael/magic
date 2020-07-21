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

	handleRepeat(props){
		if (props.length >= 0) {
			return <Account items={props}/>
		} else {
			return <p>Cargando ...</p>
		}
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
				<ul>
					{ this.handleRepeat(this.state.accounts) }	
				</ul>
				<Footer />
			</div>
		)
	}
}

export default Home
