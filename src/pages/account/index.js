/** @format */

import React from 'react'

import Loading from '../../components/Loading/Loading'
import PageError from '../../components/Errors/PageError'

import './style.css'
import serviceGetAccount from './services'

class Account extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			accounts: null,
			loading: true,
		}
	}

	async componentDidMount() {
		await serviceGetAccount(this.props.match.params.name).then((data) => {
			if (data.statusCode) {
				this.setState({ loading: false, error: data })
			} else {
				this.setState({ loading: false, accounts: data })
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
			<div>
				<h1>Account: {this.state.accounts.name}</h1>
				<p>Account: {JSON.stringify(this.state.accounts)}</p>
			</div>
		)
	}
}

export default Account
