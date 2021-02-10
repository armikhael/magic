/** @format */

import React from 'react'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'

import { help } from './data.js'
import './style.css'

const { Content } = Layout

export default function Help(props) {
	return (
		<>
			<Content className='cv-container-main'>
				<div className='cv-help-content'>
					<h1 className='cv-help-title'>¿Necesitas Ayuda?</h1>
				</div>
				<Layout>
					<Row>
						<Col xs={24} sm={24} md={8}>
							<div className='cv-help-content'>
								{help.map(function (item, index) {
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
								{help.map(function (item, index) {
									return (
										<div key={index}>
											{props.match.params.name === item.slug && (
												<>
													<h3 className='cv-help-detail-title'>{item.title}</h3>
													{renderHTML(item.description)}
													<br />
													<iframe
														className='cv-help-detail-iframe'
														width='100%'
														height='400'
														src={item.url_video}
														frameBorder='0'
														allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
														allowFullScreen
														title='AboutUs'></iframe>
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
		</>
	)
}
