/** @format */

import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import { Row, Col } from 'antd'
import { ShareAltOutlined, UserOutlined } from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'
import PageError from '../../components/Errors/PageError'

import './style.css'
import { serviceGetAccount, updateAccount } from './services'
import { serviceGetInstagramAccount } from '../../components/ServiceCommons/GetAccountInstagram'


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

		console.log(data);
		
		if (data.type === 'instagram') {
			let instagram = await serviceGetInstagramAccount(data.account)

			console.log({
				name: `${instagram.username}-instagram`,
				biography: instagram.biography,
				image: instagram.profile_pic_url_hd,
				followers: instagram.edge_followed_by.count,
				follow: instagram.edge_follow.count,
			});
			await updateAccount({
				name: `${instagram.username}-instagram`,
				biography: instagram.biography,
				image: instagram.profile_pic_url_hd,
				followers: instagram.edge_followed_by.count,
				follow: instagram.edge_follow.count,
			})
			
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
					<Col span={18}>
						<Row className='cv-detail-content-accoun'>
							<Col span={24}>
								<ShareAltOutlined />
								&nbsp; | &nbsp;SHARE
							</Col>
							<Col span={24} className='cv-detail-content-account-detail'>
								<h1 className='cv-detail-title-main'>
									{this.state.accounts.account}
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
									<img
										title={this.state.accounts.name}
										alt={this.state.accounts.name}
										className='cv-detail-account-img-main'
										src={this.state.accounts.image}
									/>
									<div className='cv-masonry-item-card-image-bg'></div>
								</div>
								<p className='cv-detail-account-descript'>
									{this.state.accounts.description}
								</p>
								<div>
									{this.state.accounts.categories.map(function (item, i) {
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
						<div className='cv-detail-contente-user-create'>
							<hr className='cv-detail-hr' />
							<h3 className='cv-detail-user-create-title'>Creado por</h3>
							<UserOutlined />
							&nbsp; Carlos Espinoza
						</div>
					</Col>
					<Col span={6} className='cv-detail-content-plans'>
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
										<img
											className='cv-detail-plans-images-plan'
											title='Plan'
											alt='Plan'
											src='http://pluto.pinsupreme.com/wp-content/uploads/2014/05/AdobeStock_103332683-100x100.jpg'
										/>
										<h3 className='cv-detail-plans-title-plan-title'>
											{item.description}
										</h3>
										<h4 className='cv-detail-plans-title-plan-title-price'>
											Precio: {item.price}
										</h4>
									</div>
								)
							})}
						</div>
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

export default Account
