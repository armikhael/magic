/** @format */

import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { Row, Col, Layout, notification } from 'antd'
import { WhatsAppOutlined, UserOutlined } from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'
import PageError from '../../components/Errors/PageError'
import serviceEventGoogleAnalytics from '../../components/ServiceCommons/EventsGoogleAnalitycs'

import CreateUser from './components/CreateUser'
import AccountsRelations from './components/AccountsRelations'
import Views from './components/Views'
import LinkTree from './components/LinkTree'
import Plans from './components/Plans'

import './style.css'
import { serviceAccountDetail, serviceGetLinks, serviceGetPermissions } from './services'

const { Content } = Layout

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
				const accountDetail = await serviceAccountDetail({ name: this.props.match.params.name })
				console.log(accountDetail)
				if (accountDetail.account[0].representation === true) {
					this.setState({ representation: true, textContact: 'Intercambios' })
					accountDetail.account[0].code = 56
					accountDetail.account[0].phone = 979582051
				}

				this.setState({
					image: accountDetail.account[0].image,
					image_cover: accountDetail.account[0].image_cover || accountDetail.account[0].image,
					detail: accountDetail.account[0],
					relations: accountDetail.relations,
					asociation: accountDetail.asociation,
					views: accountDetail.statitics_view,
					totalView: accountDetail.total_week_view,
				})

				if (localStorage.getItem('user')) {
					const userProfile = JSON.parse(localStorage.getItem('user'))
					console.log(userProfile.email)
					if (userProfile.email !== undefined) {
						const permissions = await serviceGetPermissions(userProfile.email)
						console.log('permissions', permissions)
						this.setState({
							permissions: permissions,
						})
					}
				}

				this.setState({
					loading: false,
				})
			} else {
				serviceGetLinks(this.props.match.params.name).then((response) => {
					console.log(response)
					if (response.length > 0) {
						this.setState({
							loading: false,
							links: response[0],
						})
					} else {
						this.setState({
							loading: false,
							pageError: { statusCode: 404, message: 'Página no encontrada' },
						})
					}
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
				{this.state.detail !== null && (
					<Content className='cv-container-main'>
						<div className='cv-detail-content-mobil cv-xs'>
							<img
								className='cv-detail-img-main '
								title={this.state.detail.name}
								alt={this.state.detail.name}
								src={this.state.image_cover}
							/>
							<div
								className='cv-detail-whatsapp-icon-mobil'
								rel='noopener noreferrer'
								target='_blank'
								onClick={() => {
									serviceEventGoogleAnalytics({
										category: 'contacto',
										action: 'click-contacto',
										label: this.state.detail.name,
									})
									console.log(this.state.representation)
									if (this.state.representation === true) {
										window.open(
											`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.detail.code}${this.state.detail.phone}&text=Hola+${this.state.detail.account}, te+encontre+en+cuentasvirales.com+y+quisiera+conocer+tus+servicios+por+medio+de+intercambios`
										)
									} else {
										window.open(
											`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.detail.code}${this.state.detail.phone}&text=Hola+${this.state.detail.account}, te+encontre+en+cuentasvirales.com+y+queria+conocer+más+sobre+tus+servicios+publicitarios`
										)
									}
								}}>
								<WhatsAppOutlined className='cv-detail-whatsapp-icon-i' />
								&nbsp;
								<span>{this.state.textContact}</span>
							</div>
						</div>
						<Row>
							<Col xs={24} sm={24} md={18}>
								<Row className='cv-detail-content-accoun'>
									<div className='cv-xs cv-detail-content-accoun-mobil'>
										<Row>
											<Col span={6}>
												<img
													title={this.state.detail.name}
													alt={this.state.detail.name}
													className='cv-detail-account-img-main'
													src={this.state.image}
												/>
											</Col>
											<Col span={18} className='cv-detail-content-accoun-mobil'>
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
												<Moment
													format='LLLL'
													withTitle
													className='cv-detail-moment-title-mobil'>
													{this.state.detail.createdAt}
												</Moment>
												<a
													href={this.state.detail.interface.link}
													target='_blank'
													rel='noopener noreferrer'>
													<div className='cv-detail-account-content-info-account'>
														<img
															width='15px'
															src={this.state.detail.interface.icon}
															alt={this.state.detail.type}
														/>
														<h3>@{this.state.detail.account}</h3>
													</div>
												</a>
											</Col>
										</Row>
										<hr className='cv-detail-hr'></hr>
										<br></br>
										<h3 className='cv-detail-account-content-info-country'>
											{this.state.detail.country}
										</h3>
										<Link to={`/category/${this.state.detail.categories[0]}`}>
											<span className='cv-detail-account-category-title'>
												{this.state.detail.categories[0]}
											</span>
										</Link>
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
										<br></br>
										<div>
											{this.state.detail.categories.map(function (item, i) {
												return (
													<Link to={`/category/${item}`} key={i}>
														<span className='cv-detail-category-tag'>
															#{item}&nbsp;&nbsp;
														</span>
													</Link>
												)
											})}
										</div>
									</div>
									<Col span={24}>
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
												if (this.state.representation === true) {
													window.open(
														`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.detail.code}${this.state.detail.phone}&text=Hola+${this.state.detail.account}, te+encontre+en+cuentasvirales.com+y+quisiera+conocer+tus+servicios+por+medio+de+intercambios`
													)
												} else {
													window.open(
														`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.detail.code}${this.state.detail.phone}&text=Hola+${this.state.detail.account}, te+encontre+en+cuentasvirales.com+y+queria+conocer+más+sobre+tus+servicios+publicitarios`
													)
												}
											}}>
											<WhatsAppOutlined className='cv-detail-whatsapp-icon-i' />
											&nbsp;
											<span>{this.state.textContact}</span>
										</span>
									</Col>
									<Col span={24} className='cv-detail-content-account-detail cv-md'>
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
												<Col
													xs={24}
													sm={24}
													md={7}
													className='cv-detail-account-img-main-content'>
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
														<span className='cv-detail-category-tag'>
															#{item}&nbsp;&nbsp;
														</span>
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
										permissions={this.state.permissions}
									/>

									<AccountsRelations relations={this.state.relations} />
								</div>
							</Col>
							<Col xs={24} sm={24} md={6}>
								<Plans componentData={this.state.detail} />
								<CreateUser email={this.state.detail.email} asociation={this.state.asociation} />
							</Col>
							<div className='cv-detail-accounts-user-email-xs'>
								<Views
									views={this.state.views}
									total={this.state.totalView}
									detail={this.state.detail}
									permissions={this.state.permissions}
								/>
								<AccountsRelations relations={this.state.relations} />
							</div>
						</Row>
					</Content>
				)}

				{this.state.links !== null && <LinkTree componentData={this.state.links} />}
			</>
		)
	}
}
