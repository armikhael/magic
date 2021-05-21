/** @format */

import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import { Row, Col, List, Avatar, Layout, notification } from 'antd'
import { WhatsAppOutlined, UserOutlined } from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'
import PageError from '../../components/Errors/PageError'
import { serviceEventGoogleAnalytics } from '../../components/ServiceCommons/EventsGoogleAnalitycs'

import CreateUser from './components/CreateUser'
import AccountsRelations from './components/AccountsRelations'
import Views from './components/Views'
import Promotion from './components/Promotion'

import './style.css'
import { serviceViewAccount, serviceGetPromotions, serviceGetLnks } from './services'

const { Content } = Layout

export default class AccountDetail extends React.Component {
	state = {
		detail: null,
		asociation: null,
		relations: null,
		loading: true,
		promotion: [],
		links: [],
		errored: false,
	}

	async componentDidMount() {
		serviceEventGoogleAnalytics({
			category: 'account-details',
			action: 'view',
			label: this.props.match.params.name,
		})

		try {
			let redSocial = ['-instagram', '-facebook', '-tiktok']
			const includeName = redSocial.find((item) => {
				return this.props.match.params.name.includes(item)
			})
			if (includeName !== undefined) {
				serviceViewAccount(this.props.match.params.name).then((response) => {
					this.setState({
						loading: false,
						image: response.account[0].image,
						detail: response.account[0],
						relations: response.relations,
						asociation: response.asociation,
						views: response.statitics_view,
						totalView: response.total_week_view,
					})

					serviceGetPromotions().then(({ data }) => {
						this.setState({
							promotion: this.handleVerifyPromotion(data, response.account[0]),
						})
					})
				})
			} else {
				serviceGetLnks(this.props.match.params.name).then((response) => {
					this.setState({
						loading: false,
						links: response[0].links,
					})
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
			errored: true,
		})
	}

	handleVerifyPromotion = (promotion, account) => {
		const date = new Date()
		let itemFilter = []
		promotion.forEach((iterator) => {
			let filterCountry = iterator.country.find((item) => {
				let newItem = ''
				if (item === account.country || item === 'all') {
					newItem = item
				}
				return newItem
			})
			if (
				date.getDate() <= iterator.day &&
				date.getMonth() === iterator.month &&
				filterCountry !== undefined
			) {
				itemFilter.push(iterator)
			}
		})
		return itemFilter
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
				{this.state.detail !== null && (
					<Content className='cv-container-main'>
						<div className='cv-detail-content-mobil cv-xs'>
							<img
								className='cv-detail-img-main '
								title={this.state.detail.name}
								alt={this.state.detail.name}
								src={this.state.image}
							/>
						</div>
						<Row>
							<Col xs={24} sm={24} md={18}>
								<Row className='cv-detail-content-accoun cv-md'>
									<p className='cv-detail-content-accoun-p'>
										¿Quieres conocer cómo funciona Cuentas Virales? haz{' '}
										<a href={`${process.env.REACT_APP_DOMAIN}/help/cuentas-virales`}> click aquí</a>
									</p>
								</Row>
								<Row className='cv-detail-content-accoun'>
									<Col span={24} className='center'>
										<span
											className='cv-detail-whatsapp-icon'
											rel='noopener noreferrer'
											target='_blank'
											onClick={() => {
												serviceEventGoogleAnalytics({
													category: 'contacto',
													action: 'click-contacto',
													label: this.state.detail.name,
												})
												window.open(
													`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.detail.code}${this.state.detail.phone}&text=Hola%20${this.state.detail.account}, te+encontre+en+cuentasvirales.com+y+queria+conocer+más+sobre+tus+servicios+publicitarios`
												)
											}}>
											<WhatsAppOutlined className='cv-detail-whatsapp-icon-i' />
											&nbsp;
											<span>Contactame</span>
										</span>
									</Col>
									<Col span={24} className='cv-detail-content-account-detail'>
										<h1 className='cv-detail-title-main'>
											{this.state.detail.account}
											{this.state.detail.eneable && (
												<img
													className='cv-detail-img-content-account-verified'
													src='https://i.ibb.co/DwZbZB6/verificacion.png'
													alt='verificado'
													title='verificado'
												/>
											)}
										</h1>
										<h3 className='cv-detail-sub-title'>
											<Moment format='LLLL' withTitle>
												{this.state.detail.createdAt}
											</Moment>
											<Link to={`/category/${this.state.detail.categories[0]}`}>
												<span className='cv-detail-account-category-title'>
													{this.state.detail.categories[0]}
												</span>
											</Link>
										</h3>
										<div className='cv-detail-account-img-main-contnet'>
											<Row>
												<Col xs={24} sm={24} md={7} className='cv-detail-account-img-main-content'>
													<img
														title={this.state.detail.name}
														alt={this.state.detail.name}
														className='cv-detail-account-img-main'
														src={this.state.image}
													/>
												</Col>
												<Col xs={24} sm={24} md={15} className='cv-detail-account-content-info'>
													<h3 className='cv-detail-account-content-info-country'>
														{this.state.detail.country}
													</h3>
													<a
														href={this.state.detail.interface.link}
														target='_blank'
														rel='noopener noreferrer'>
														<div className='cv-detail-account-content-info-account'>
															<img
																width='30px'
																src={this.state.detail.interface.icon}
																alt={this.state.detail.type}
															/>
															<h3>@{this.state.detail.account}</h3>
														</div>
													</a>
													<p>Cantidad de Visitas: {this.state.detail.counter}</p>
													<h3 className='cv-detail-account-content-info-email'>
														{this.state.detail.email}
													</h3>
													<div className='mt10 mb10'>
														<UserOutlined />{' '}
														<span className='cv-detail-followers'>
															{this.state.detail.interface.followers}
														</span>{' '}
														Seguidores
													</div>
													<h3 className='cv-detail-account-content-info-detail'>
														{this.state.detail.biography}
													</h3>
												</Col>
											</Row>
											<div className='cv-masonry-item-card-image-bg'></div>
										</div>
										<p className='cv-detail-account-descript'>{this.state.detail.description}</p>
										<div>
											{this.state.detail.categories.map(function (item, i) {
												return (
													<Link to={`/category/${item}`} key={i}>
														<span className='cv-detail-category-tag'>#{item}&nbsp;&nbsp;</span>
													</Link>
												)
											})}
										</div>
									</Col>
								</Row>
								<div className='cv-detail-accounts-user-email-md'>
									<Views
										views={this.state.views}
										total={this.state.totalView}
										detail={this.state.detail}
									/>
									<AccountsRelations relations={this.state.relations} />
								</div>
							</Col>
							<Col xs={24} sm={24} md={6}>
								<div className='cv-detail-content-plans'>
									<div className='cv-detail-content-plans-main'>
										<div className='cv-detail-plans-content-images'>
											{this.state.promotion.length > 0 && (
												<Promotion
													promotion={this.state.promotion}
													detailAccount={this.state.detail}></Promotion>
											)}
										</div>
										<h3 className='cv-detail-plans-title'>Planes</h3>
										<div className='cv-detail-plans-hr'></div>
										<List
											className='cv-detail-plans-list'
											itemLayout='horizontal'
											dataSource={this.state.detail.plans}
											renderItem={(item) => (
												<span
													onClick={() => {
														console.log('contratacion')
														serviceEventGoogleAnalytics({
															category: 'pago',
															action: 'click-contratacion',
															label: this.state.detail.name,
														})
														window.open(
															`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.detail.code}${this.state.detail.phone}&text=Hola ${this.state.detail.account},+te+encontre+en+cuentasvirales.com+y+quisiera+este+paquete+publicitario:+${item.description} por ${item.price} ${item.currency}`
														)
													}}>
													<List.Item actions={[<WhatsAppOutlined />]}>
														<List.Item.Meta
															avatar={<Avatar src={this.state.detail.image} />}
															title={item.description}
															description={`Precio: ${item.price} ${item.currency}`}
														/>
													</List.Item>
												</span>
											)}
										/>
									</div>
								</div>
								{/* <div className='cv-account-detail-content'>
								<a rel='noopener noreferrer' href={`${config.linkYoutube}`} target='_blank'>
									<img width='100%' src='https://i.ibb.co/kSX3Zdt/burger-king2.gif' alt='Publicidad' />
								</a>
								</div> */}
								<CreateUser email={this.state.detail.email} asociation={this.state.asociation} />
							</Col>
							<div className='cv-detail-accounts-user-email-xs'>
								<Views
									views={this.state.views}
									total={this.state.totalView}
									detail={this.state.detail}
								/>
								<div className='cv-detail-accounts-user-publicidad'>
									<Promotion
										promotion={this.state.promotion}
										detailAccount={this.state.detail}></Promotion>
								</div>
								<AccountsRelations relations={this.state.relations} />
							</div>
						</Row>
					</Content>
				)}

				{this.state.links.length > 0 && (
					<Content className='cv-container-main'>
						<Row>
							<ul>
								Links Asociados
								{this.state.links.map((item, key) => {
									return (
										<li key={key}>
											{item.title} - {item.url}
										</li>
									)
								})}
							</ul>
						</Row>
					</Content>
				)}
			</>
		)
	}
}
