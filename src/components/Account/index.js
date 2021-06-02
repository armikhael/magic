/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import 'moment/locale/es'

import { Row, Col } from 'antd'
import { EyeOutlined, ClockCircleOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons'

import './style.css'

export default class Account extends React.Component {
	state = {
		image: this.props.account.image,
		errored: false,
	}
	handleOnError = () => {
		this.setState({
			image: `${process.env.REACT_APP_LOGO}`,
			errored: true,
		})
	}

	render() {
		return (
			<div className='cv-masonry-item'>
				<div className='cv-masonry-item-card'>
					{/* 
					<div className='cv-masonry-item-share-card'>
						<ShareAltOutlined />
						&nbsp; SHARE
					</div>
					*/}
					<Link to={`/${this.props.account.name}`}>
						<div className='cv-masonry-item-card-image'>
							<img
								title={this.props.account.name}
								alt={this.props.account.name}
								className='cv-masonry-item-image'
								src={this.state.image}
								onError={this.handleOnError}
							/>
							<div className='cv-masonry-item-card-image-bg'></div>
							<EyeOutlined className='cv-fa-eye' />
						</div>
					</Link>
					<div className='cv-masonry-item-card-titles'>
						<Link to={`/${this.props.account.name}`}>
							<h3 className='cv-masonry-item-title'>
								{this.props.account.eneable && (
									<img
										width='15px'
										src='https://i.ibb.co/DwZbZB6/verificacion.png'
										alt='verificado'
										title='verificado'
									/>
								)}{' '}
								{this.props.account.account}{' '}
							</h3>
						</Link>
						{this.props.accountBio && <p>{this.props.account.biography}</p>}
						<div className='mt10'>
							<UserOutlined />{' '}
							<span className='cv-masonry-followers'>{this.props.account.interface.followers}</span>{' '}
							Seguidores
						</div>
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
											#{this.props.account.categories[0]}
										</span>
									</Link>
								</h3>
							</Col>
							<Col xs={24} sm={12} md={10} className='aling-right'>
								<h3 className='cv-masonry-item-gird-like-card-title'>
									<img
										width='30px'
										src={this.props.account.interface.icon}
										alt={this.props.account.type}
									/>
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
							<div className='mt10'>
								<EyeOutlined style={{ color: '#ca0000', fontSize: '12px' }} />{' '}
								{this.props.account.counter_day} Hoy &nbsp; &nbsp;
								<BarChartOutlined style={{ color: '#ca0000', fontSize: '12px' }} />{' '}
								{this.props.account.interface.counter} Totales
							</div>
						</Row>
					</div>
				</div>
			</div>
		)
	}
}
