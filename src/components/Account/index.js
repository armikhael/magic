/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import 'moment/locale/es'

import { Row, Col } from 'antd'
import { EyeOutlined, ShareAltOutlined, ClockCircleOutlined } from '@ant-design/icons'

import './style.css'

export default class Account extends React.Component {
	render() {
		console.log('locote', this.props.account)
		return (
			<div className='cv-masonry-item'>
				<div className='cv-masonry-item-card'>
					<div className='cv-masonry-item-share-card'>
						<ShareAltOutlined />
						&nbsp; SHARE
					</div>
					<Link to={`/${this.props.account.name}`}>
						<div className='cv-masonry-item-card-image'>
							<img
								title={this.props.account.name}
								alt={this.props.account.name}
								className='cv-masonry-item-image'
								src={this.props.account.image}
							/>
							<div className='cv-masonry-item-card-image-bg'></div>
							<EyeOutlined className='cv-fa-eye' />
						</div>
					</Link>
					<div className='cv-masonry-item-card-titles'>
						<Link to={`/${this.props.account.name}`}>
							<h3 className='cv-masonry-item-title'>
								{this.props.account.account}{' '}
								{this.props.account.eneable && (
									<img
										width='15px'
										src='https://i.ibb.co/0f5YxSt/verificado.png'
										alt='verificado'
										title='verificado'
									/>
								)}
							</h3>
						</Link>
						<div className='cv-masonry-item-card-more'>
							<Link className='cv-masonry-item-card-more-title' to={`/${this.props.account.name}`}>
								Leer más
							</Link>
						</div>
						<Row>
							<Col xs={24} sm={12} md={14}>
								<h3 className='cv-masonry-item-gird-date-card-title'>
									<Link to={`/category/${this.props.account.categories[0]}`}>
										<span className='cv-masonry-item-gird-category-title'>
											{this.props.account.categories[0]}
										</span>
									</Link>
								</h3>
							</Col>
							<Col xs={24} sm={12} md={10} className='aling-right'>
								<h3 className='cv-masonry-item-gird-like-card-title'>
									{this.props.account.type === 'instagram' && (
										<img
											width='30px'
											src='https://i.ibb.co/hymRJXG/instagram.png'
											alt='instagram'
											title='instagram'
										/>
									)}
								</h3>
							</Col>
							<Col xs={24} sm={24} md={24}>
								<h3 className='cv-masonry-item-gird-date-card-title'>
									<ClockCircleOutlined />{' '}
									<Moment format='D MMM YYYY' withTitle>
										{this.props.account.createdAt}
									</Moment>
								</h3>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		)
	}
}
