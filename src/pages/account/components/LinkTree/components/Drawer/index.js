/** @format */

import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, Drawer, Row, Col, Layout } from 'antd'
import { BellOutlined } from '@ant-design/icons'

import serviceEventGoogleAnalytics from '../../../../../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'

const DrawerLinktree = () => {
	const { Content } = Layout
	const [showDrawer, setShowDrawer] = useState(false)
	const [isMobil, setMobile] = useState('260')
	const history = useHistory()
	const data = [
		{
			key: '1',
			text: 'Publicidad en Instagram',
			description: 'Conoce nuestro servicio de posicionamiento',
			link: '/pricing',
			img: 'https://i.ibb.co/0txC9QY/1.jpg',
		},
		{
			key: '2',
			text: 'Enlace Personalizado',
			description: 'Registrate como negocio y sigue los pasos',
			link: '/auth/register',
			img: 'https://i.ibb.co/QKzTjfR/3.jpg',
		},
	]

	useEffect(() => {
		if (window.innerWidth < 1025) {
			setMobile('400')
		}
	}, [])

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
				key={'bottom'}
				height={isMobil}>
				<Content className='cv-container-main'>
					<div className='cv-account-linktree-drawer-titles-contens'>
						<br />
						<h3 className='cv-account-linktree-drawer-title'>
							Te Ayudamos a{' '}
							<span className='cv-account-linktree-drawer-title-color'>
								crecer
							</span>{' '}
							en tu cuenta{' '}
						</h3>
						<span className='cv-account-linktree-drawer-sub-title'>
							Ten más seguidores, más interacción, más ventas...
						</span>
					</div>
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
						{data.map((item) => {
							return (
								<Col
									xs={24}
									sm={24}
									md={8}
									onClick={() => {
										serviceEventGoogleAnalytics({
											action: 'click-linktree',
											category: 'anuncios',
											label: item.text,
										})
										history.push(item.link)
									}}>
									<Row className='cv-account-linktree-content-card'>
										<Col xs={7} sm={7} md={7}>
											<img
												className='cv-account-linktree-content-card-img'
												width='100%'
												src={item.img}
												title='Información'
												alt='Información'
											/>
										</Col>
										<Col
											xs={17}
											sm={17}
											md={17}
											className='cv-account-linktree-content-card-two'>
											<h3>{item.text}</h3>
											<p>{item.description}</p>
											<div>
												<Button
													className='cv-account-linktree-drawer-card-button'
													type='primary'>
													Click aquí
												</Button>
											</div>
										</Col>
									</Row>
								</Col>
							)
						})}
					</Row>
				</Content>
			</Drawer>
		</>
	)
}

export default DrawerLinktree
