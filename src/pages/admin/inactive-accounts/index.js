/** @format */

import React from 'react'
import { Layout, Button, notification, Divider } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'
import { serviceGetAccountsInactives, serviceDeleteAccount, serviceUpdateData } from './services'
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

	handleEneableAccount = async (item) => {
		console.log(item)
		item.eneable = true
		try {
			const responseUpdate = await serviceUpdateData(item)
			this.setState({ list: responseUpdate.data })
			notification['success']({
				message: `Great!`,
				description: `Eliminada con exito`,
			})

			const responseList = await serviceGetAccountsInactives()
			this.setState({ list: responseList.data })
		} catch (error) {
			console.log(error)
			notification['error']({
				message: `Ups!`,
				description: `Algo inesperado ocurrió`,
			})
		}
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
										<li> Fecha de Registro: {item.createdAt}</li>
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
										<li>Código de Activación: {btoa(item.name)}</li>

										<li>
											<Button href={item.interface.link} target='__blank'>
												Ir a la cuenta de: {item.account}
											</Button>
										</li>

										<li>
											<Button
												onClick={() => {
													this.handleEneableAccount(item)
												}}>
												Activar cuenta: {item.account}
											</Button>
										</li>

										<Divider></Divider>
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
