/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'

import { Button, DatePicker, Layout, Row, Col } from 'antd'
import {
	EyeOutlined,
	ShareAltOutlined,
	ClockCircleOutlined,
	HeartOutlined,
} from '@ant-design/icons'

import Footer from '../../components/Footer/Footer'
import Loading from '../../components/Loading/Loading'
import Account from '../../components/Account/Account'

import './style.css'
import serviceGetAccounts from './services'

const { Content } = Layout

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: 'Hola Mundo!',
			service: null,
			accounts: {},
			loading: true,
		}
	}

	async componentDidMount() {
		let accounts = await serviceGetAccounts()
		console.log(accounts)

		this.setState({
			service: accounts.itemsPerPage,
			accounts: accounts.data,
			loading: false,
		})
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		return (
			<React.Fragment>
				<Content className='cv-container-main'>
					<Masonry
						breakpointCols={{ default: 4, 720: 2 }}
						className='cv-masonry-grid'
						columnClassName='cv-masonry-grid_column'>
						{this.state.accounts.data.map(function (item, i) {
							return (
								<div className='cv-masonry-item' key={i}>
									<div className='cv-masonry-item-card'>
										<div className='cv-masonry-item-share-card'>
											<ShareAltOutlined />
											&nbsp; SHARE
										</div>
										<div className='cv-masonry-item-card-image'>
											<img
												title={item.name}
												alt={item.name}
												className='cv-masonry-item-image'
												src={item.image}
											/>
											<div className='cv-masonry-item-card-image-bg'></div>
											<EyeOutlined className='cv-fa-eye' />
										</div>
										<div className='cv-masonry-item-card-titles'>
											<h3 className='cv-masonry-item-title'>{item.name}</h3>
											<p className='cv-masonry-item-description'>
												{item.description}
											</p>
											<div className='cv-masonry-item-card-more'>
												<Link
													className='cv-masonry-item-card-more-title'
													to={`/account/${item.name}`}>
													Leer más
												</Link>
											</div>
											<Row>
												<Col span={18}>
													<h3 className='cv-masonry-item-gird-date-card-title'>
														<span className='cv-masonry-item-gird-category-title'>
															{item.categories[0]}
														</span>
														<ClockCircleOutlined />
														&nbsp; {item.createdAt}
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
						})}
					</Masonry>
				</Content>
				<h1>{this.state.title}</h1>
				<p>{process.env.REACT_APP_ENVIROMENT}</p>
				<>
					<Button type='primary'>PRESS ME</Button>
					<DatePicker placeholder='select date' />
				</>
				<p> Servicio nuevo: {this.state.service}</p>
				<ul>
					<Account items={this.state.accounts.data} />
				</ul>
				<Footer />
			</React.Fragment>
		)
	}
}

export default Home
