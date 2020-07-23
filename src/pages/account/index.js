/** @format */

import React from 'react'

import Loading from '../../components/Loading/Loading'

import './style.css'
import serviceGetAccount from './services'

class Account extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: null,
			account: null,
			loading: true,
		}
	}

	async componentDidMount() {
		this.setState({ name: this.props.match.params.nameId })
		const data = await serviceGetAccount(this.props.match.params.nameId)
		this.setState({ account: data, loading: false })
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		return (
			<div>
				<h1>Account: {this.state.name}</h1>
				<pre>{JSON.stringify(this.state.account)}</pre>
			</div>
		)
	}
}

export default Account
