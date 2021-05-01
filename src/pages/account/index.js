/** @format */

import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import { Row, Col, List, Avatar, Layout, Popconfirm } from 'antd'
import { WhatsAppOutlined, UserOutlined, QuestionCircleOutlined } from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'
import PageError from '../../components/Errors/PageError'
import { serviceEventGoogleAnalytics } from '../../components/ServiceCommons/EventsGoogleAnalitycs'
import { Publicity } from '../../components/Json/Publicity'

import CreateUser from './components/CreateUser'
import AccountsRelations from './components/AccountsRelations'
import Views from './components/Views'

import './style.css'
import { serviceViewAccount } from './services'

const { Content } = Layout

export default class AccountDetail extends React.Component {
	state = {
		detail: null,
		asociation: null,
		relations: null,
		loading: true,
	}

	componentDidMount() {
		serviceEventGoogleAnalytics({
			category: 'account-details',
			action: 'view',
			label: this.props.match.params.name,
		})
		serviceViewAccount(this.props.match.params.name).then((response) => {
			console.log('response', response.asociation)
			this.setState({
				loading: false,
				detail: response.account[0],
				relations: response.relations,
				asociation: response.asociation,
				views: response.statitics_view,
				totalView: response.total_week_view,
				promotion: this.handleVerifyPromotion(Publicity, response.account[0]),
			})
		})
	}

	handleVerifyPromotion = (promotion, account) => {
		const date = new Date()
		let itemFilter = []
		promotion.forEach((iterator) => {
			console.log(iterator.month, iterator.day)
			if (
				date.getDate() <= iterator.day &&
				date.getMonth() === iterator.month &&
				iterator.country === account.country
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
				<Content className='cv-container-main'>
					<Row>
						<Col xs={24} sm={24} md={18}>
							<Row className='cv-detail-content-accoun'>
								<p>
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
													src={this.state.detail.image}
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
								<Views views={this.state.views} total={this.state.totalView} />
								<CreateUser email={this.state.detail.email} asociation={this.state.asociation} />
								<AccountsRelations relations={this.state.relations} />
							</div>
						</Col>
						<Col xs={24} sm={24} md={6}>
							<div className='cv-detail-content-plans'>
								<div className='cv-detail-content-plans-main'>
									{this.state.promotion.length > 0 && (
										<div className='cv-detail-plans-content-images'>
											<span
												style={{ cursor: 'pointer' }}
												onClick={() => {
													serviceEventGoogleAnalytics({
														category: 'giveaway',
														action: 'click-giveaway',
														label: this.state.detail.name,
													})
													window.open(this.state.promotion[0].redirect)
												}}>
												<img
													title='Publicidad'
													alt='Publicidad'
													className='cv-detail-plans-images'
													src={this.state.promotion[0].image}
												/>
											</span>
										</div>
									)}
									<div className='cv-detail-inter-canj-content'>
										<Popconfirm
											title='El influencer hará una mención en su cuenta, tú en la tuya (a esto le llamamos intercambio publicitario) y de esta manera intercambian seguidores (cada influencer tiene sus propias normas) ¿Estás de acuerdo?'
											okText='Si'
											cancelText='No'
											icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
											onConfirm={() => {
												serviceEventGoogleAnalytics({
													category: 'intercambio',
													action: 'click-mencion',
													label: this.state.detail.name,
												})
												window.open(
													`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.detail.code}${this.state.detail.phone}&text=Hola ${this.state.detail.account}, te encontre en cuentasvirales.com y me gustaría que hagamos intercambio publicitario (MENCIÓN x MENCIÓN)`
												)
											}}>
											<a href={'/'}>&nbsp;Mención x Mención</a>
										</Popconfirm>
									</div>
									<div className='cv-detail-inter-canj-content'>
										<Popconfirm
											title='El influencer te pedirá un "PRODUCTO" a cambio de la publicidad, el influencer se quedará con dicho producto que primero debe probar y hará la mención de tu negocio (cada influencer tiene sus propias normas) ¿Estás de acuerdo?'
											okText='Si'
											cancelText='No'
											icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
											onConfirm={() => {
												serviceEventGoogleAnalytics({
													category: 'intercambio',
													action: 'click-producto',
													label: this.state.detail.name,
												})
												window.open(
													`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.detail.code}${this.state.detail.phone}&text=Hola ${this.state.detail.account}, te encontre en cuentasvirales.com y me gustaría darte un PRODUCTO por una mención en tu cuenta`
												)
											}}>
											<a href={'/'}>&nbsp;Producto x Mención</a>
										</Popconfirm>
									</div>
									<div className='cv-detail-inter-canj-content'>
										<Popconfirm
											title='Entregarás un producto al influencer para que haga un "SORTEO" en su cuenta (cada influencer tiene sus propias normas) ¿Estás de acuerdo?'
											okText='Si'
											cancelText='No'
											icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
											onConfirm={() => {
												serviceEventGoogleAnalytics({
													category: 'intercambio',
													action: 'click-sorteo',
													label: this.state.detail.name,
												})
												window.open(
													`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.detail.code}${this.state.detail.phone}&text=Hola ${this.state.detail.account}, te encontre en cuentasvirales.com y me gustaría darte un producto para hacer un SORTEO`
												)
											}}>
											<a href={'/'}>&nbsp;Sorteo x Mención</a>
										</Popconfirm>
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
						</Col>

						<div className='cv-detail-accounts-user-email-xs'>
							<Views views={this.state.views} total={this.state.totalView} />
							<CreateUser email={this.state.detail.email} asociation={this.state.asociation} />
							{/* <div className='cv-detail-accounts-user-publicidad'>
								<a href={`${config.linkSeguidores}`}>
									<img
										title='Publicidad'
										alt='Publicidad'
										className='cv-detail-plans-images'
										src='https://i.ibb.co/KGb2pSt/seguidores.gif'
									/>
								</a>
							</div> */}
							<AccountsRelations relations={this.state.relations} />
							{/* <div className='cv-detail-accounts-user-publicidad'>
								<a rel='noopener noreferrer' href={`${config.linkYoutube}`} target='_blank'>
									<img width='100%' src='https://i.ibb.co/kSX3Zdt/burger-king2.gif' alt='Publicidad' />
								</a>
							</div> */}
						</div>
					</Row>
				</Content>
			</>
		)
	}
}
