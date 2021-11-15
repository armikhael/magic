/** @format */

import React, { useEffect, useState } from 'react'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'
import { Layout, Row, Col, notification } from 'antd'
import InstagramEmbed from 'react-instagram-embed'
import Vimeo from '@u-wave/react-vimeo'

import serviceEventGoogleAnalytics from '../../components/ServiceCommons/EventsGoogleAnalitycs'
import Loading from '../../components/Loading/Loading'
import PageError from '../../components/Errors/PageError'

import { serviceGetData } from './service'
import './style.css'

const { Content } = Layout

export default function Help(props) {
	const [data, setData] = useState()
	const [isLoading, setLoading] = useState(true)
	const [isError, setError] = useState(false)

	useEffect(() => {
		console.log(props)
		serviceEventGoogleAnalytics({
			action: 'view',
			category: 'help',
			label: props.match.params.name,
		})
		serviceGetData({ type: 'help' })
			.then((response) => {
				console.log(response)
				setData(response)
				setLoading(false)
			})
			.catch((e) => {
				console.log(e)
				notification['error']({
					message: `Ups!`,
					description: `Estamos en mantenimiento, intente mas tarde`,
				})
				setError({
					statusCode: 500,
					message: 'Problemas al cargar los datos.',
				})
			})
		console.log('useEffects')
	}, [props])

	if (isLoading) {
		return <Loading />
	}
	if (isError) {
		return <PageError detailError={isError} />
	}
	return (
		<>
			<Content className='cv-global-main-container'>
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
														item.slug === props.match.params.name
															? 'cv-active-li'
															: ''
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

													{item.url_type === 'vimeo' && (
														<Vimeo
															video={item.url_embed}
															autoplay
															responsive={true}
														/>
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
		</>
	)
}
