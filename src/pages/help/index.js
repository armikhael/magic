/** @format */

import React, { useEffect, useState } from 'react'
import renderHTML from 'react-render-html'
import { Link } from 'react-router-dom'
import { Layout, Row, Col, notification, Button } from 'antd'
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
	const [phone] = useState('56979582051')
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

	const handleReferalContact = () => {
		return (
			<Row justify='center'>
				{props.match.params.name === 'posicionamiento' && !props.match.params.account && (
					<Button
						shape={'round'}
						className={'cv-help-button'}
						onClick={() => {
							window.open(
								`${process.env.REACT_APP_WHATSAPP}?phone=${phone}&text=Hola vengo de cuentasvirales.com donde vi la información que ustedes ofrecen el servicio de posicionamiento y me interesa el paquete de:`
							)
						}}>
						Solicitar atención de un Ejecutivo
					</Button>
				)}

				{props.match.params.account && (
					<Button
						shape={'round'}
						className={'cv-help-button'}
						onClick={() => {
							window.open(
								`${process.env.REACT_APP_WHATSAPP}?phone=${phone}&text=Hola, desde el perfil de ${props.match.params.account} vi que en cuentasvirales.com ofrecen el servicio de posicionamiento y me interesa el paquete de:`
							)
						}}>
						Solicitar atención de un Ejecutivo
					</Button>
				)}
			</Row>
		)
	}

	if (isLoading) {
		return <Loading />
	}
	if (isError) {
		return <PageError detailError={isError} />
	}
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

													{handleReferalContact()}

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
														<Vimeo video={item.url_embed} autoplay responsive={true} />
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
