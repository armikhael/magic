/** @format */

import React from 'react'

import { Layout } from 'antd'

import Loading from '../../components/Loading/Loading'
import ListMasonry from '../../components/ListMasonry/'
import PageError from '../../components/Errors/PageError'
import Footer from '../../components/Footer/Footer'

import './style.css'
import serviceGetAccounts from './services'

const { Content } = Layout

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			accounts: {},
			loading: true,
			error: null,
		}
	}

	async componentDidMount() {
		await serviceGetAccounts().then((data) => {
			if (data.status === 200) {
				this.setState({
					accounts: data.data,
					loading: false,
				})
			} else {
				this.setState({
					loading: false,
					error: data,
				})
			}
		})
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		if (this.state.error) {
			return <PageError detailError={this.state.error} />
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
