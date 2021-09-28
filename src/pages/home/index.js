/** @format */

import React from 'react'

import { Layout, notification, Row, Col } from 'antd'

import Loading from '../../components/Loading/Loading'
import PageError from '../../components/Errors/PageError'

import Models from '../lading-page/models'
import Company from '../lading-page/company'

import './style.css'
import serviceGetAccounts from './services'

const { Content } = Layout

export default class Home extends React.Component {
	state = {
		list: [],
		loading: true,
		error: null,
	}

	componentDidMount() {
		serviceGetAccounts().then((response) => {
			if (response.statusCode === 200) {
				console.log(response)
				this.setState({
					list: response.data,
					loading: false,
				})
			} else {
				notification['error']({
					message: `Error ${response.data.statusCode}`,
					description: `Problemas con el servico.`,
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
			<>
				<section className='cv-home-header-content'>
					<Content className='cv-container-main'>
						<center>
							<h1 className='cv-home-header-title-main'>
								¡Crea tu enlace personalizado<br></br> de forma{' '}
								<span>gratuita</span>!
							</h1>
						</center>
						<Row className='cv-home-header-row'>
							<Col xs={12} sm={12} md={12} className='cv-home-header-col-first'>
								<h3>Enlaces Personales</h3>
								<p>
									Modelos, Artistas, Influencers, Cantantes… lorem ipsum dolor
									sit amet, consectetur adipiscing, sed do eiusmod tempor.
								</p>
								<br />
								<a href='#models' className='cv-home-header-col-button'>
									¿Qué son?
								</a>
							</Col>
							<Col
								xs={12}
								sm={12}
								md={12}
								className='cv-home-header-col-second'>
								<h3>Enlaces de Negocio</h3>
								<p>
									Emprendimientos, Tiendas, Freelancers … lorem ipsum dolor sit
									amet, consectetur adipiscing, sed do eiusmod tempor.
								</p>
								<br />
								<a href='#company' className='cv-home-header-col-button'>
									¿Qué son?
								</a>
							</Col>
						</Row>
					</Content>
				</section>
				<div id='models'>
					<Models />
					<Content className='cv-container-main'>
						<div className='cv-models-title-account'>
							<h3>
								Lo mejor de
								<span className='cv-models-firts-title-900'>
									{' '}
									Cuentas Virales
								</span>
							</h3>
							<p>Aquí te dejamos algunos cuentas Personales</p>
						</div>
					</Content>
				</div>
				<div id='company'>
					<Company />
					<Content className='cv-container-main'>
						<div className='cv-models-title-account'>
							<h3>
								Lo mejor de
								<span className='cv-models-firts-title-900'>
									{' '}
									Cuentas Virales
								</span>
							</h3>
							<p>Aquí te dejamos algunos de Empresas</p>
						</div>
					</Content>
				</div>
			</>
		)
	}
}
