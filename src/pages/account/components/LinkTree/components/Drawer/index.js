/** @format */

import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Drawer, Row, Col } from 'antd'
import { BellOutlined, RightCircleOutlined } from '@ant-design/icons'

import serviceEventGoogleAnalytics from '../../../../../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'

const DrawerLinktree = (props) => {
	const [showDrawer, setShowDrawer] = useState(false)
	const history = useHistory()

	useEffect(() => {
		console.log('useEffect')
	}, [props])

	const data = [
		{
			key: '1',
			text: 'Publicidad en Instagram',
			description: 'Conoce nuestro servicio de posicionamiento',
			link: '/pricing',
		},
		{
			key: '2',
			text: 'Enlace Personalizado',
			description: 'Registrate como negocio y sigue los pasos',
			link: '/auth/register',
		},
	]

	return (
		<>
			<div id='loader'></div>
			<Button
				className='cv-account-btn-linktree'
				shape='circle'
				icon={<BellOutlined className='cv-pulse' />}
				size={'large'}
				style={{ color: '#ec3f7c' }}
				onClick={() => {
					serviceEventGoogleAnalytics({
						action: 'click-linktree',
						category: 'anuncios',
						label: 'boton principal (campaña)',
					})
					setShowDrawer(true)
				}}
			/>
			<Drawer
				placement={'bottom'}
				closable={false}
				onClose={() => {
					setShowDrawer(false)
				}}
				visible={showDrawer}
				key={'bottom'}>
				<Row
					onClick={() => {
						serviceEventGoogleAnalytics({
							action: 'click-linktree',
							category: 'anuncios',
							label: 'Master Class',
						})
						window.open(
							'https://api.whatsapp.com/send?phone=573106044125&text=Hola,%20vi%20un%20anuncio%20en%20@cuentasvirales%20y%20quisiera%20informaci%C3%B3n%20de%20la%20master%20class'
						)
					}}>
					<Col xs={24} sm={24} md={8}>
						<Row className='cv-account-linktree-content-card'>
							<Col xs={3} sm={3} md={3}>
								<img
									src='https://i.postimg.cc/YSQXZWCP/logo.jpg'
									title='Información'
									alt='Información'
								/>
							</Col>
							<Col xs={17} sm={17} md={17} className='cv-account-linktree-content-card-two'>
								<h3>Master Class</h3>
								<p>Mejora el rendimiento de tu cuenta de instagram</p>
							</Col>
							<Col xs={4} sm={4} md={4} className='cv-account-linktree-content-card-three'>
								<RightCircleOutlined style={{ fontSize: '25px', color: '#797979' }} />
							</Col>
						</Row>
					</Col>
				</Row>

				{data.map((item) => {
					return (
						<Row
							onClick={() => {
								serviceEventGoogleAnalytics({
									action: 'click-linktree',
									category: 'anuncios',
									label: item.text,
								})
								history.push(item.link)
							}}>
							<Col xs={24} sm={24} md={8}>
								<Row className='cv-account-linktree-content-card'>
									<Col xs={3} sm={3} md={3}>
										<img
											src='https://i.postimg.cc/YSQXZWCP/logo.jpg'
											title='Información'
											alt='Información'
										/>
									</Col>
									<Col xs={17} sm={17} md={17} className='cv-account-linktree-content-card-two'>
										<h3>{item.text}</h3>
										<p>{item.description}</p>
									</Col>
									<Col xs={4} sm={4} md={4} className='cv-account-linktree-content-card-three'>
										<RightCircleOutlined style={{ fontSize: '25px', color: '#797979' }} />
									</Col>
								</Row>
							</Col>
						</Row>
					)
				})}
			</Drawer>
		</>
	)
}

export default DrawerLinktree
