/** @format */

import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import { Row, Col, List, Avatar, Layout } from 'antd'
import { WhatsAppOutlined, UserOutlined } from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'
import PageError from '../../components/Errors/PageError'
import { config } from '../../components/ServiceCommons/Config'

import CreateUser from './components/CreateUser'
import AccountsRelations from './components/AccountsRelations'

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
		serviceViewAccount(this.props.match.params.name).then((response) => {
			console.log('response', response.asociation)
			this.setState({
				loading: false,
				detail: response.account[0],
				relations: response.relations,
				asociation: response.asociation,
			})
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
				<Content className='cv-container-main'>
					<Row>
						<Col xs={24} sm={24} md={18}>
							<Row className='cv-detail-content-accoun'>
								<Col span={24}>
									<a
										className='cv-detail-whatsapp-icon'
										rel='noopener noreferrer'
										target='_blank'
										href={`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.detail.code}${this.state.detail.phone}&text=Hola%20${this.state.detail.account}, te+encontre+en+cuentasvirales.com+y+queria+conocer+más+sobre+tus+servicios+publicitarios`}>
										<WhatsAppOutlined className='cv-detail-whatsapp-icon-i' />
									</a>
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
											<Col
												xs={24}
												sm={24}
												md={7}
												className='cv-detail-account-img-main-content'>
												<img
													title={this.state.detail.name}
													alt={this.state.detail.name}
													className='cv-detail-account-img-main'
													src={this.state.detail.image}
												/>
											</Col>
											<Col
												xs={24}
												sm={24}
												md={15}
												className='cv-detail-account-content-info'>
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
												<p>
													Cantidad de Visitas: {this.state.detail.counter}
												</p>
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
									<p className='cv-detail-account-descript'>
										{this.state.detail.description}
									</p>
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
								<CreateUser
									email={this.state.detail.email}
									asociation={this.state.asociation}
								/>
								<AccountsRelations relations={this.state.relations} />
							</div>
						</Col>
						<Col xs={24} sm={24} md={6}>
							<div className='cv-detail-content-plans'>
								<div className='cv-detail-content-plans-main'>
									<div className='cv-detail-plans-content-images'>
										<a
											href={`${config.linkSeguidores}`}>
											<img
												title='Publicidad'
												alt='Publicidad'
												className='cv-detail-plans-images'
												src='https://i.ibb.co/KGb2pSt/seguidores.gif'
											/>
										</a>
									</div>
									<div className='cv-detail-inter-canj-content'>
										<a
											href={`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.detail.code}${this.state.detail.phone}&text=Hola ${this.state.detail.account},+te+encontre+en+cuentasvirales.com+y+quisiera+conversar+sobre+un+intercambio+por+publicidad`}>
											<WhatsAppOutlined />
											&nbsp;Intercambios & Canjes a Convenir
										</a>
									</div>
									<h3 className='cv-detail-plans-title'>Planes</h3>
									<div className='cv-detail-plans-hr'></div>
									<List
										className='cv-detail-plans-list'
										itemLayout='horizontal'
										dataSource={this.state.detail.plans}
										renderItem={(item) => (
											<a
												href={`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.detail.code}${this.state.detail.phone}&text=Hola ${this.state.detail.account},+te+encontre+en+cuentasvirales.com+y+quisiera+este+paquete+publicitario:+${item.description} por ${item.price} ${item.currency}`}>
												<List.Item actions={[<WhatsAppOutlined />]}>
													<List.Item.Meta
														avatar={
															<Avatar src={this.state.detail.image} />
														}
														title={item.description}
														description={`Precio: ${item.price} ${item.currency}`}
													/>
												</List.Item>
											</a>
										)}
									/>
								</div>
							</div>
							<div className='cv-account-detail-content'>
								<a
									rel="noopener noreferrer"
									href={`${config.linkYoutube}`}
									target="_blank">
									<img
										width='100%'
										src='https://i.ibb.co/kSX3Zdt/burger-king2.gif'
										alt='Publicidad'
									/>
								</a>
							</div>
						</Col>
						<div className='cv-detail-accounts-user-email-xs'>
							<CreateUser
								email={this.state.detail.email}
								asociation={this.state.asociation}
							/>
							<div className='cv-detail-accounts-user-publicidad'>
								<a
									href={`${process.env.REACT_APP_WHATSAPP}?phone=${process.env.REACT_APP_CONTACT}&text=Hola!%20Vi%20un%20anuncio%20en%20cuentasvirales.com%20y%20quisiera%20posicionar%20mi%20cuenta%20de%20instagram`}>
									<img
										title='Publicidad'
										alt='Publicidad'
										className='cv-detail-plans-images'
										src='https://i.postimg.cc/j5MYMCkK/publicidad-2.png'
									/>
								</a>
							</div>
							<AccountsRelations relations={this.state.relations} />
							<div className='cv-detail-accounts-user-publicidad'>
								<a
									href={`${process.env.REACT_APP_WHATSAPP}?phone=${process.env.REACT_APP_CONTACT}&text=Hola!%20vi%20su%20anucio%20en%20cuentasvirales.com%20y%20quisiera%20recibir%20asesoría%20para%20mejorar%20mi%20cuenta`}>
									<img
										width='100%'
										src='https://i.postimg.cc/jjQbJMHD/publicidad-1.jpg'
										alt='Publicidad'
									/>
								</a>
							</div>
						</div>
					</Row>
				</Content>
			</>
		)
	}
}
