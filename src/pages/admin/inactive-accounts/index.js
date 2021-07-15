/** @format */

import React from 'react'
import { Layout, Button, notification, Divider } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'
import { serviceGetAccountsInactives, serviceDeleteAccount } from './services'
import './style.css'

const { Content } = Layout

export default class InactiveAccounts extends React.Component {
	state = {
		list: [],
	}

	componentDidMount() {
		serviceGetAccountsInactives().then((response) => {
			console.log(response.data)
			this.setState({ list: response.data })
		})
	}

	handleActiveAccount = async (item) => {
		item.image = this.state.image
		console.log(item)
		serviceGetAccountsInactives(item)
			.then((response) => {
				this.setState({ list: response.data })
				notification['success']({
					message: `Great!`,
					description: `Activada con exito`,
				})
			})
			.catch((error) => {
				console.log(error)
				notification['error']({
					message: `Ups!`,
					description: `Algo inesperado ocurrió`,
				})
			})
	}

	handleDeleteAccount = async (item) => {
		console.log(item._id)
		serviceDeleteAccount(item._id)
			.then((response) => {
				this.setState({ list: response.data })
				notification['success']({
					message: `Great!`,
					description: `Eliminada con exito`,
				})
			})
			.catch((error) => {
				console.log(error)
				notification['error']({
					message: `Ups!`,
					description: `Algo inesperado ocurrió`,
				})
			})
	}

	handleChangeInput = (e) => {
		console.log('write', e.target.name, e.target.value)
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	render() {
		return (
			<>
				<Content className='cv-container-main'>
					<div className='cv-category-content-title'>
						<h1 className='cv-category-title'>Cuentas inactivas ({this.state.list.length})</h1>
					</div>
					{this.state.list.length > 0 && (
						<ul>
							{this.state.list.map((item, i) => {
								return (
									<ul key={i}>
										<li> seguidores: {item.followers}</li>
										<li>
											<img width='150' src={item.image} alt={item.name} />
										</li>
										<li>
											<Button type='danger' onClick={() => this.handleDeleteAccount(item)}>
												Eliminar cuenta
											</Button>
										</li>
										<li>
											<CopyToClipboard
												text={`${process.env.REACT_APP_CUENTAS_VIRALES}/${item.name}`}>
												<Button>
													Copiar Enlace: {item.name} <CopyOutlined />
												</Button>
											</CopyToClipboard>
										</li>
										<li>
											<CopyToClipboard text={`${item.account}`}>
												<Button>
													Copiar Cuenta: {item.account} <CopyOutlined />
												</Button>
											</CopyToClipboard>
										</li>
										<li>
											<CopyToClipboard text={`${item.code}${item.phone}`}>
												<Button>
													Copiar Teléfono <CopyOutlined />
												</Button>
											</CopyToClipboard>
										</li>
										<li>
											<Button
												href={`${process.env.REACT_APP_WHATSAPP}?phone=${item.code}${item.phone}&text=Hola! ${item.account} te escribimos de cuentasvirales.com para informarte que te enviamos el código de activación a tu cuenta de ${item.type}`}
												target='__blank'>
												Ir al WhatsApp
											</Button>
										</li>
										<li>
											<CopyToClipboard text={btoa(item.name)}>
												<Button>
													Copiar Código de Activación <CopyOutlined />
												</Button>
											</CopyToClipboard>
										</li>

										<li>
											<Button href={item.interface.link} target='__blank'>
												Ir a la cuenta de: {item.account}
											</Button>
										</li>
										<li>
											<Button
												type='primary'
												onClick={() => {
													this.handleActiveAccount(item)
												}}>
												activar cuenta
											</Button>
											<Divider></Divider>
										</li>
									</ul>
								)
							})}
						</ul>
					)}
				</Content>
			</>
		)
	}
}
