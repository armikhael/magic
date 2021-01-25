/** @format */

import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { Row, Col, List, Avatar } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'
import PageError from '../../components/Errors/PageError'
import CreateUser from './components/CreateUser'
import { serviceGetAccount } from '../../components/ServiceCommons/GetAccount'

import './style.css'

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
		console.log(data)
		if (data.statusCode) {
			this.setState({ loading: false, error: data })
		} else {
			this.setState({ loading: false, profile: data })
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
									href={`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.profile.code}${this.state.profile.phone}&text=Hola%20${this.state.profile.account}, te+encontre+en+cuentasvirales.com+y+queria+conocer+más+sobre+tus+servicios+publicitarios`}>
									<WhatsAppOutlined className='cv-detail-whatsapp-icon-i' />
								</a>
							</Col>
							<Col span={24} className='cv-detail-content-account-detail'>
								<h1 className='cv-detail-title-main'>
									{this.state.profile.account}
									{this.state.profile.eneable && (
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
										{this.state.profile.createdAt}
									</Moment>
									<Link to={`/category/${this.state.profile.categories[0]}`}>
										<span className='cv-detail-account-category-title'>
											{this.state.profile.categories[0]}
										</span>
									</Link>
								</h3>
								<div className='cv-detail-account-img-main-contnet'>
									<Row>
										<Col xs={24} sm={24} md={7} className='cv-detail-account-img-main-content'>
											<img
												title={this.state.profile.name}
												alt={this.state.profile.name}
												className='cv-detail-account-img-main'
												src={this.state.profile.image}
											/>
										</Col>
										<Col xs={24} sm={24} md={15} className='cv-detail-account-content-info'>
											<h3 className='cv-detail-account-content-info-country'>
												{this.state.profile.country}
											</h3>
											<a
												href={'https://www.instagram.com/' + this.state.profile.account}
												target='_blank'
												rel='noopener noreferrer'>
												<h3 className='cv-detail-account-content-info-account'>
													{this.state.profile.type === 'instagram' && (
														<img
															width='30px'
															src='https://i.ibb.co/hymRJXG/instagram.png'
															alt='instagram'
															title='instagram'
														/>
													)}
													&nbsp;&nbsp; @{this.state.profile.account}
												</h3>
											</a>
											<h3 className='cv-detail-account-content-info-email'>
												{this.state.profile.email}
											</h3>
											<h3 className='cv-detail-account-content-info-detail'>
												{this.state.profile.biography}
											</h3>
										</Col>
									</Row>
									<div className='cv-masonry-item-card-image-bg'></div>
								</div>
								<p className='cv-detail-account-descript'>{this.state.profile.description}</p>
								<div>
									{this.state.profile.categories.map(function (item, i) {
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
							<CreateUser email={this.state.profile.email} />
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
										src='https://www.womgp.com/blog/wp-content/uploads/2018/04/5-tendencias-influencer-marketing-2017-810x473.jpg'
									/>
								</div>
								<h3 className='cv-detail-plans-title'>Planes</h3>
								<div className='cv-detail-plans-hr'></div>
								<List
									className='cv-detail-plans-list'
									itemLayout='horizontal'
									dataSource={this.state.profile.plans}
									renderItem={(item) => (
										<a
											href={`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.profile.code}${this.state.profile.phone}&text=Hola,+te+encontre+en+cuentasvirales.com+y+quisiera+este+paquete+publicitario:+${item.description} por ${item.price} ${item.currency}`}>
											<List.Item actions={[<WhatsAppOutlined />]}>
												<List.Item.Meta
													avatar={<Avatar src={this.state.profile.image} />}
													title={item.description}
													description={`Precio: ${item.price} ${item.currency}`}
												/>
											</List.Item>
										</a>
									)}
								/>
							</div>
						</div>
					</Col>
					<div className='cv-detail-accounts-user-email-xs'>
						<CreateUser email={this.state.profile.email} />
					</div>
				</Row>
			</React.Fragment>
		)
	}
}

export default Account
