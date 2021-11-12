/** @format */

import React from 'react'
import { notification } from 'antd'
import publicIp from 'public-ip'

import Loading from '../../components/Loading/Loading'
import PageError from '../../components/Errors/PageError'
import serviceEventGoogleAnalytics from '../../components/ServiceCommons/EventsGoogleAnalitycs'

import LinkTree from './components/LinkTree'
import Account from './components/Account'

import { serviceAccountDetail } from './services'
import './style.css'

export default class AccountDetail extends React.Component {
	state = {
		detail: null,
		asociation: null,
		relations: null,
		loading: true,
		promotion: [],
		links: null,
		pageError: false,
		permissions: undefined,
		representation: false,
		textContact: 'Contactame',
		promotions: null,
	}

	async componentDidMount() {
		serviceEventGoogleAnalytics({
			category: 'account-details',
			action: 'view',
			label: this.props.match.params.name,
		})
		try {
			const ipv4 = await publicIp.v4()
			const accountDetail = await serviceAccountDetail({
				name: this.props.match.params.name,
				ip: ipv4,
			})
			console.log('accountDetail', accountDetail)
			this.setState({ detail: accountDetail.account[0] })
			if (accountDetail.account[0].type_account === 'personal') {
				if (accountDetail.statusCode === 409) {
					this.setState({
						loading: false,
						pageError: {
							statusCode: 404,
							message: 'Este usuario no existe o no esta habilitado',
						},
					})
				}

				this.setState({
					detail: accountDetail,
					loading: false,
				})
			} else {
				console.log('linktree', accountDetail.account[0])
				this.setState({
					loading: false,
					links: accountDetail.account[0],
				})
			}
		} catch (e) {
			console.log(e)
			notification['error']({
				message: `Ups!`,
				description: `Disculpe estamos en mantenimiento, intente más tarde`,
			})
		}
	}

	handleOnError = () => {
		this.setState({
			image: `${process.env.REACT_APP_LOGO}`,
			pageError: true,
		})
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		if (this.state.pageError) {
			return <PageError detailError={this.state.pageError} />
		}
		return (
			<>
				{this.state.detail.account[0].type_account === 'personal' && (
					<Account componentData={this.state.detail} />
				)}
				{this.state.detail.account[0].type_account === 'business' && (
					<LinkTree componentData={this.state.links} />
				)}
			</>
		)
	}
}
