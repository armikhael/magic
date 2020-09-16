/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import { Row, Col } from 'antd'
import {
	EyeOutlined,
	ShareAltOutlined,
	ClockCircleOutlined,
	HeartOutlined,
} from '@ant-design/icons'

import './style.css'

class Account extends React.Component {
	render() {
		return (
			<div className='cv-masonry-item'>
				<div className='cv-masonry-item-card'>
					<div className='cv-masonry-item-share-card'>
						<ShareAltOutlined />
						&nbsp; SHARE
					</div>
					<div className='cv-masonry-item-card-image'>
						<Link to={`/account/${this.props.account.name}`}>
							<img
								title={this.props.account.name}
								alt={this.props.account.name}
								className='cv-masonry-item-image'
								src={this.props.account.image}
							/>
							<div className='cv-masonry-item-card-image-bg'></div>
							<EyeOutlined className='cv-fa-eye' />
						</Link>
					</div>
					<div className='cv-masonry-item-card-titles'>
						<Link to={`/account/${this.props.account.name}`}>
							<h3 className='cv-masonry-item-title'>
								{this.props.account.name}
							</h3>
						</Link>
						<p className='cv-masonry-item-description'>
							{this.props.account.description}
						</p>
						<div className='cv-masonry-item-card-more'>
							<Link
								className='cv-masonry-item-card-more-title'
								to={`/account/${this.props.account.name}`}>
								Leer más
							</Link>
						</div>
						<Row>
							<Col span={18}>
								<h3 className='cv-masonry-item-gird-date-card-title'>
									<span className='cv-masonry-item-gird-category-title'>
										{this.props.account.categories[0]}
									</span>
									<ClockCircleOutlined />
									&nbsp;{' '}
									<Moment format='D MMM YYYY' withTitle>
										{this.props.account.createdAt}
									</Moment>
								</h3>
							</Col>
							<Col span={6}>
								<h3 className='cv-masonry-item-gird-like-card-title'>
									<HeartOutlined className='cv-fa-heart' /> 3476
								</h3>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		)
	}
}

export default Account
