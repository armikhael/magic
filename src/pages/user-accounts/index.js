/** @format */

import React from 'react'

import { Layout } from 'antd'

import ListMasonry from '../../components/ListMasonry/'

import { serviceGetAccountByEmail } from './service'
import './style.css'

const { Content } = Layout

export default class userAccounts extends React.Component {
	state = {
		list: [],
	}

	componentDidMount() {
		serviceGetAccountByEmail(atob(this.props.match.params.name)).then((response) => {
			this.setState({ list: response })
		})
	}

	render() {
		return (
			<>
				<Content className='cv-container-main'>
					<div className='cv-category-content-title'>
						<h1 className='cv-category-title'>
							Cuentas asociadas de: {atob(this.props.match.params.name)}
						</h1>
						<ListMasonry listMasonry={this.state.list} />
					</div>
				</Content>
			</>
		)
	}
}
