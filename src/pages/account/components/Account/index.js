/** @format */

import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { Row, Col, Layout } from 'antd'

import { WhatsAppOutlined, UserOutlined } from '@ant-design/icons'

import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'
import InterestAccounts from '../InterestAccounts'
import AccountsRelations from '../AccountsRelations'
import Views from '../Views'
import LinksAccount from '../LinksAccount'

import './style.css'

const { Content } = Layout

const Account = (props) => {
	return (
		<>
			{props.componentData && (
				<Content className='cv-global-main-container'>
					<div className='cv-detail-content-mobil cv-xs'>
						<img
							className='cv-detail-img-main '
							title={props.componentData.account[0].name}
							alt={props.componentData.account[0].name}
							src={
								props.componentData.account[0].image_cover ||
								props.componentData.account[0].image
							}
						/>
						<div
							className='cv-detail-whatsapp-icon-mobil'
							rel='noopener noreferrer'
							target='_blank'
							onClick={() => {
								serviceEventGoogleAnalytics({
									category: 'contacto',
									action: 'click-contacto',
									label: props.componentData.account[0].name,
								})
								window.open(
									`${process.env.REACT_APP_WHATSAPP}?phone=${props.componentData.account[0].code}${props.componentData.account[0].phone}&text=Hola+${props.componentData.account[0].account}, te+encontre+en+cuentasvirales.com+y+quisiera+conocer+tus+servicios+publicid`
								)
							}}>
							<WhatsAppOutlined className='cv-detail-whatsapp-icon-i' />
							&nbsp;
							<span>Contactame</span>
						</div>
					</div>
					<Row>
						<Col xs={24} sm={24} md={18}>
							<Row className='cv-detail-content-accoun'>
								<div className='cv-xs cv-detail-content-accoun-mobil'>
									<Row>
										<Col span={6}>
											<img
												title={props.componentData.account[0].name}
												alt={props.componentData.account[0].name}
												className='cv-detail-account-img-main'
												src={props.componentData.account[0].image}
											/>
										</Col>
										<Col span={18} className='cv-detail-content-accoun-mobil'>
											<h1 className='cv-detail-title-main'>
												{props.componentData.account[0].account}
												{props.componentData.account[0].eneable && (
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
												{props.componentData.account[0].createdAt}
											</Moment>
											<a
												href={props.componentData.account[0].interface.link}
												target='_blank'
												rel='noopener noreferrer'>
												<div className='cv-detail-account-content-info-account'>
													<img
														width='15px'
														src={props.componentData.account[0].interface.icon}
														alt={props.componentData.account[0].type}
													/>
													<h3>@{props.componentData.account[0].account}</h3>
												</div>
											</a>
										</Col>
									</Row>
									<hr className='cv-detail-hr'></hr>
									<br></br>
									<h3 className='cv-detail-account-content-info-country'>
										{props.componentData.account[0].country}
									</h3>
									<Link to={`/category/${props.componentData.account[0].categories[0]}`}>
										<span className='cv-detail-account-category-title'>
											{props.componentData.account[0].categories[0]}
										</span>
									</Link>
									<p>Cantidad de Visitas: {props.componentData.account[0].counter}</p>
									<h3 className='cv-detail-account-content-info-email'>
										{props.componentData.account[0].email}
									</h3>
									<div className='mt10 mb10'>
										<UserOutlined />{' '}
										<span className='cv-detail-followers'>
											{props.componentData.account[0].interface.followers}
										</span>{' '}
										Seguidores
									</div>
									<h3 className='cv-detail-account-content-info-detail'>
										{props.componentData.account[0].biography}
									</h3>
									{/* <Row className={`cv-detail-account-vlc-content-mobil`}>
											<Col xs={8} sm={8} md={8}>
												<img
													width='100%'
													src='https://i.ibb.co/pfFwf3X/pngwing-com.png'
													alt='VLC'
													title='VLC'
												/>
											</Col>
											<Col xs={12} sm={12} md={12} className='pl10'>
												<span className='cv-detail-account-vlc-title'>ViralCoin</span> <br />
												<span className='cv-detail-account-vlc-title-sub'>
													{props.componentData.point} <span>VLC</span>
												</span>{' '}
												<br />
											</Col>
										</Row> */}
									<br></br>
									<div>
										{props.componentData.account[0].categories.map(function (item, i) {
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
												label: props.componentData.account[0].name,
											})

											window.open(
												`${process.env.REACT_APP_WHATSAPP}?phone=${props.componentData.code}${props.componentData.phone}&text=Hola+${props.componentData.account}, te+encontre+en+cuentasvirales.com+y+queria+conocer+más+sobre+tus+servicios+publicitarios`
											)
										}}>
										<WhatsAppOutlined className='cv-detail-whatsapp-icon-i' />
										&nbsp;
										<span>Contactame</span>
									</span>
								</Col>
								<Col span={24} className='cv-detail-content-account-detail cv-md'>
									{/* {props.componentData.point >= 1 && (
											<Row
												className={`${
													this.state.representation
														? 'cv-detail-account-vlc-content-top'
														: 'cv-detail-account-vlc-content-bottom'
												} cv-detail-account-vlc-content`}>
												<Col xs={24} sm={24} md={8}>
													<img
														width='100%'
														src='https://i.ibb.co/pfFwf3X/pngwing-com.png'
														alt='VLC'
														title='VLC'
													/>
												</Col>
												<Col xs={24} sm={24} md={12} className='pl10'>
													<span className='cv-detail-account-vlc-title'>ViralCoin</span>{' '}
													<br />
													<span className='cv-detail-account-vlc-title-sub'>
														{props.componentData.point} <span>VLC</span>
													</span>{' '}
													<br />
												</Col>
											</Row>
										)} */}
									<h1 className='cv-detail-title-main'>
										{props.componentData.account[0].account}
										{props.componentData.account[0].eneable && (
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
											{props.componentData.account[0].createdAt}
										</Moment>
									</h3>
									<Link to={`/category/${props.componentData.account[0].categories[0]}`}>
										<span className='cv-detail-account-category-title'>
											{props.componentData.account[0].categories[0]}
										</span>
									</Link>
									<div className='cv-detail-account-img-main-contnet'>
										<Row>
											<Col
												xs={24}
												sm={24}
												md={7}
												className='cv-detail-account-img-main-content'>
												<img
													title={props.componentData.account[0].name}
													alt={props.componentData.account[0].name}
													className='cv-detail-account-img-main'
													src={props.componentData.account[0].image}
												/>
											</Col>
											<Col
												xs={24}
												sm={24}
												md={15}
												className='cv-detail-account-content-info'>
												<h3 className='cv-detail-account-content-info-country'>
													{props.componentData.account[0].country}
												</h3>
												<a
													href={props.componentData.account[0].interface.link}
													target='_blank'
													rel='noopener noreferrer'>
													<div className='cv-detail-account-content-info-account'>
														<img
															width='30px'
															src={props.componentData.account[0].interface.icon}
															alt={props.componentData.account[0].type}
														/>
														<h3>@{props.componentData.account[0].account}</h3>
													</div>
												</a>
												<p>
													Cantidad de Visitas: {props.componentData.account[0].counter}
												</p>
												<h3 className='cv-detail-account-content-info-email'>
													{props.componentData.account[0].email}
												</h3>
												<div className='mt10 mb10'>
													<UserOutlined />{' '}
													<span className='cv-detail-followers'>
														{props.componentData.account[0].interface.followers}
													</span>{' '}
													Seguidores
												</div>
												<h3 className='cv-detail-account-content-info-detail'>
													{props.componentData.account[0].biography}
												</h3>
											</Col>
										</Row>
										<div className='cv-masonry-item-card-image-bg'></div>
									</div>
									<p className='cv-detail-account-descript'>
										{props.componentData.account[0].description}
									</p>
									<div>
										{props.componentData.account[0].categories.map(function (item, i) {
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
									views={props.componentData.statitics_view}
									total={props.componentData.total_week_view}
									detail={props.componentData}
								/>
								<AccountsRelations relations={props.componentData.relations} />
							</div>
						</Col>
						<Col xs={24} sm={24} md={6}>
							<LinksAccount links={props.componentData.account[0].links} />
							<InterestAccounts interestAccounts={props.componentData.promotions} />
						</Col>
						<div className='cv-detail-accounts-user-email-xs'>
							<Views
								views={props.componentData.statitics_view}
								total={props.componentData.total_week_view}
								detail={props.componentData}
							/>
							<AccountsRelations relations={props.componentData.relations} />
						</div>
					</Row>
				</Content>
			)}
		</>
	)
}

export default Account
