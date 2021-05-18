/** @format */

import React, { useEffect, useState } from 'react'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'
import { Layout, Row, Col, notification } from 'antd'
import InstagramEmbed from 'react-instagram-embed'

import { serviceGetData } from './service'

import './style.css'

const { Content } = Layout

export default function Help(props) {
	const [data, setData] = useState()

	useEffect(() => {
		serviceGetData({ type: 'help' })
			.then((response) => {
				setData(response)
			})
			.catch((e) => {
				console.log(e)
				notification['error']({
					message: `Ups!`,
					description: `Estamos en mantenimiento, intente mas tarde`,
				})
			})
		console.log('useEffects')
	}, [props])

	return (
		<>
			{data !== undefined && (
				<Content className='cv-container-main'>
					<div className='cv-help-content'>
						<h1 className='cv-help-title'>¿Necesitas Ayuda?</h1>
					</div>
					<Layout>
						<Row>
							<Col xs={24} sm={24} md={8}>
								<div className='cv-help-content'>
									{data.map((item, index) => {
										return (
											<div className={`cv-help-content-list`} key={index}>
												<li>
													<Link
														className={`cv-help-list-li ${
															item.slug === props.match.params.name ? 'cv-active-li' : ''
														}`}
														to={`/help/${item.slug}`}>
														{item.title}
													</Link>
												</li>
											</div>
										)
									})}
								</div>
							</Col>
							<Col xs={24} sm={24} md={16}>
								<div className='cv-help-content'>
									{data.map((item, index) => {
										return (
											<div key={index}>
												{props.match.params.name === item.slug && (
													<>
														<h3 className='cv-help-detail-title'>{item.title}</h3>
														{renderHTML(item.text_html)}
														<br />
														<br />

														{item.url_type === 'youtube' && (
															<iframe
																className='cv-help-detail-iframe'
																width='100%'
																height='400'
																src={item.url_embed}
																frameBorder='0'
																allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
																allowFullScreen
																title='AboutUs'></iframe>
														)}

														{item.url_type === 'instagram' && (
															<InstagramEmbed
																url={item.url_embed}
																clientAccessToken='1859534864215755|384af0e04ea985f5638bf838d902a5b9'
																maxWidth={320}
																hideCaption={false}
																containerTagName='div'
																protocol=''
																injectScript
																onLoading={() => {}}
																onSuccess={() => {}}
																onAfterRender={() => {}}
																onFailure={() => {}}
															/>
														)}
													</>
												)}
											</div>
										)
									})}
								</div>
							</Col>
						</Row>
					</Layout>
				</Content>
			)}
		</>
	)
}
