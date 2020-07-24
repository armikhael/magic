/** @format */

import React from 'react'
import { Button, DatePicker } from 'antd'

import Footer from '../../components/Footer/Footer'
import Loading from '../../components/Loading/Loading'
import Account from '../../components/Account/Account'

import './style.css'
import serviceGetAccounts from './services'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: 'Hola Mundo!',
			service: null,
			accounts: {},
			loading: true,
		}
	}

	async componentDidMount() {
		let accounts = await serviceGetAccounts()
		console.log(accounts)

		this.setState({
			service: accounts.itemsPerPage,
			accounts: accounts.data,
			loading: false,
		})
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		return (
			<React.Fragment>
				<h1>{this.state.title}</h1>
				<p>{process.env.REACT_APP_ENVIROMENT}</p>
				<>
					<Button type='primary'>PRESS ME</Button>
					<DatePicker placeholder='select date' />
				</>
				<p> Servicio nuevo: {this.state.service}</p>
				<ul>
					<Account items={this.state.accounts} />
				</ul>
				<Footer />
			</React.Fragment>
		)
	}
}

export default Home
