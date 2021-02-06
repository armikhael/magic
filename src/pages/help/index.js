/** @format */

import React, { useState } from 'react'
import renderHTML from 'react-render-html'

import { Layout, Row, Col, Result, Button } from 'antd'

import { help } from './data.js'
import './style.css'

const { Content } = Layout

export default function Help() {
	const [isDetail, setDetail] = useState()

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
											<li onClick={() => setDetail(item)}>{item.title}</li>
										</div>
									)
								})}
							</div>
						</Col>
						<Col xs={24} sm={24} md={16}>
							<div className='cv-help-content'>
								{isDetail && (
									<>
										<h3 className='cv-help-detail-title'>{isDetail.title}</h3>
										{renderHTML(isDetail.description)}
										<br />
										<iframe
											className='cv-help-detail-iframe'
											width='100%'
											height='400'
											src={isDetail.url_video}
											frameBorder='0'
											allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
											allowFullScreen
											title='AboutUs'></iframe>
									</>
								)}
								{!isDetail && (
									<>
										<Result
											title='¿Dinos qué necesitas?'
											subTitle='Si tienes alguna duda Verifica esta documentación, si sientes que faltas algo contactarnos haciendo click en el botón contactar.'
											extra={
												<Button
													className='cv-help-button-contact'
													type='primary'
													key='btn-help-contact'
													href='https://api.whatsapp.com/send?phone=56979582051&text=Hola,+quisiera+solicitar+una+nuevo+pa%C3%ADs:'
													target='_blank'>
													Conactar
												</Button>
											}
										/>
									</>
								)}
							</div>
						</Col>
					</Row>
				</Layout>
			</Content>
		</>
	)
}
