/** @format */

import React from 'react'

import { Layout } from 'antd'

import Footer from '../../components/Footer/Footer'
import Loading from '../../components/Loading/Loading'
import ListMasonry from '../../components/ListMasonry/'

import './style.css'
import serviceGetAccounts from './services'

const { Content } = Layout

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			accounts: {},
			loading: true,
		}
	}

	async componentDidMount() {
		let accounts = await serviceGetAccounts()
		console.log(accounts.data)
		this.setState({
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
				<Content className='cv-container-main'>
					<ListMasonry listMasonry={this.state.accounts.data} />
				</Content>
				<Footer />
			</React.Fragment>
		)
	}
}

export default Home
