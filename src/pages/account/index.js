/** @format */

import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import { Row, Col } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'
import PageError from '../../components/Errors/PageError'

import CreateUser from './components/CreateUser'

import './style.css'
import { serviceGetAccount } from '../../components/ServiceCommons/GetAccount'

class Account extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			accounts: null,
			loading: true,
		}
	}

	async componentDidMount() {
		let data = await serviceGetAccount(this.props.match.params.name)
		if (data.statusCode) {
			this.setState({ loading: false, error: data })
		} else {
			this.setState({ loading: false, accounts: data })
		}
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		if (this.state.error) {
			return <PageError detailError={this.state.error} />
		}
		return (
			<React.Fragment>
				<Row>
					<Col xs={24} sm={24} md={18}>
						<Row className='cv-detail-content-accoun'>
							<Col span={24}>
								<a
									className='cv-detail-whatsapp-icon'
									rel='noopener noreferrer'
									target='_blank'
									href={`https://api.whatsapp.com/send?phone=${this.state.accounts.phone}&text=Hola%20${this.state.accounts.account},%20te%20encontre%20por%20publilovers.com%20por%20tus%20paquetes%20publicitarios`}>
									<WhatsAppOutlined className='cv-detail-whatsapp-icon-i' />
								</a>
							</Col>
							<Col span={24} className='cv-detail-content-account-detail'>
								<h1 className='cv-detail-title-main'>
									{this.state.accounts.account}
									{this.state.accounts.eneable && (
										<img
											className='cv-detail-img-content-account-verified'
											src='https://i.ibb.co/0f5YxSt/verificado.png'
											alt='verificado'
											title='verificado'
										/>
									)}
								</h1>
								<h3 className='cv-detail-sub-title'>
									<Moment format='LLLL' withTitle>
										{this.state.accounts.createdAt}
									</Moment>
									<Link to={`/category/${this.state.accounts.categories[0]}`}>
										<span className='cv-detail-account-category-title'>
											{this.state.accounts.categories[0]}
										</span>
									</Link>
								</h3>
								<div className='cv-detail-account-img-main-contnet'>
									<Row>
										<Col xs={24} sm={24} md={7} className='cv-detail-account-img-main-content'>
											<img
												title={this.state.accounts.name}
												alt={this.state.accounts.name}
												className='cv-detail-account-img-main'
												src={this.state.accounts.image}
											/>
										</Col>
										<Col xs={24} sm={24} md={15} className='cv-detail-account-content-info'>
											<h3 className='cv-detail-account-content-info-country'>
												{this.state.accounts.country}
											</h3>
											<a
												href={'https://www.instagram.com/' + this.state.accounts.account}
												target='_blank'
												rel='noopener noreferrer'>
												<h3 className='cv-detail-account-content-info-account'>
													{this.state.accounts.type === 'instagram' && (
														<img
															width='30px'
															src='https://i.ibb.co/hymRJXG/instagram.png'
															alt='instagram'
															title='instagram'
														/>
													)}
													&nbsp;&nbsp; @{this.state.accounts.account}
												</h3>
											</a>
											<h3 className='cv-detail-account-content-info-email'>
												{this.state.accounts.email}
											</h3>
											<h3 className='cv-detail-account-content-info-detail'>
												{this.state.accounts.biography}
											</h3>
										</Col>
									</Row>
									<div className='cv-masonry-item-card-image-bg'></div>
								</div>
								<p className='cv-detail-account-descript'>{this.state.accounts.description}</p>
								<div>
									{this.state.accounts.categories.map(function (item, i) {
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
							<CreateUser email={this.state.accounts.email} />
						</div>
					</Col>
					<Col xs={24} sm={24} md={6}>
						<div className='cv-detail-content-plans'>
							<div className='cv-detail-content-plans-main'>
								<div className='cv-detail-plans-content-images'>
									<img
										title='Publicidad'
										alt='Publicidad'
										className='cv-detail-plans-images'
										src='http://pluto.pinsupreme.com/wp-content/uploads/2017/12/magic-sidebar.jpg'
									/>
								</div>
								<h3 className='cv-detail-plans-title'>Planes</h3>
								<div className='cv-detail-plans-hr'></div>
								{this.state.accounts.plans.map(function (item, i) {
									return (
										<div className='cv-detail-plans-content-plan' key={i}>
											<h3 className='cv-detail-plans-title-plan-title'>{item.description}</h3>
											<h4 className='cv-detail-plans-title-plan-title-price'>
												Precio: {item.price}
											</h4>
										</div>
									)
								})}
							</div>
						</div>
					</Col>
					<div className='cv-detail-accounts-user-email-xs'>
						<CreateUser email={this.state.accounts.email} />
					</div>
				</Row>
			</React.Fragment>
		)
	}
}

export default Account
