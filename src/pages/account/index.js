/** @format */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'

import './style.css'
import serviceGetAccount from './services'

class Account extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			name: null,
			account: null,
		}
	}
	async componentDidMount () {
		const { match, history } = this.props;
		this.setState({ name: match.params.name })
		console.log('Montando componente de cuenta')
		const data = await serviceGetAccount(match.params.name)
		this.setState({ account: data })
	}
	
	handleObject(){
		if (this.state.account != null) {
			return JSON.stringify(this.state.account)
		} else {
			return 'Buscando data ...'
		}

	}
	render() {
		
		return (
			<div>
				<h1>Account: { this.state.name }</h1>
				<Button type='primary' onClick={() => { this.props.history.go(-1) }}>Back</Button>
				<p>{this.handleObject()}</p>
			</div>
		)
	}
	
}
export default Account = withRouter(Account);
