/** @format */

import React from 'react'
import AwesomeSwiper from 'react-awesome-swiper'
import { useHistory } from 'react-router-dom'

import { Layout, Row, Col, Button } from 'antd'

import serviceEventGoogleAnalytics from '../../../components/ServiceCommons/EventsGoogleAnalitycs'

import data from './data.json'
import './style.css'

const { Content } = Layout

export default function Company() {
	const history = useHistory()
	const handleClickEnlace = () => {
		if (localStorage.getItem('user')) {
			history.push('profile/linktree-name')
			serviceEventGoogleAnalytics({
				category: 'homee',
				action: 'click-enlace-negocio',
				label: 'btn home negocio',
			})
		} else {
			history.push('/auth/register')
		}
	}
	const swiper = {
		config: {
			swiperRef: null,
			spaceBetween: 0,
			loop: true,
			autoplay: {
				delay: 3000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			},
			preloadImages: false,
			lazy: true,
			speed: 500,

			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				1024: {
					slidesPerView: 4,
					spaceBetween: 0,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				640: {
					slidesPerView: 2,
					spaceBetween: 0,
				},
				320: {
					slidesPerView: 2,
					spaceBetween: 0,
				},
				250: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
			},
		},
	}
	return (
		<>
			<section className=''>
				<Content className='cv-container-main'>
					<Row className='cv-models-row-firts' align='middle'>
						<Col xs={24} sm={24} md={12} className='center'>
							<img
								className='cv-models-firts-img'
								src='https://i.ibb.co/c6FVtS2/Grupo-45.png'
								title='Telefonos'
								alt='Telefonos'
							/>
						</Col>
						<Col xs={24} sm={24} md={12} className='cv-models-col-firts'>
							<h3 className='cv-models-firts-title'>
								<span className='cv-models-firts-title-900'>
									Mejora la gestión
								</span>{' '}
								de tu empresa y de tus clientes en un sólo lugar,{' '}
								<span className='cv-models-firts-title-900'>
									administrando los enlaces
								</span>{' '}
								de todas tus redes sociales y páginas webs en un mismo sitio
							</h3>
							<br />
							<Button
								className='cv-buy-followers-btn-buy'
								type='primary'
								onClick={() => {
									handleClickEnlace()
								}}>
								Crear mi enlace
							</Button>
						</Col>
					</Row>
					<div className='cv-models-title-two cv-company-title-two'>
						<h3>
							¿Por qué registrarme como{' '}
							<span className='cv-models-firts-title-900'>Negocio </span>?
						</h3>
						<p>Aquí te dejamos algunos de los beneficios más importantes</p>
					</div>
					<AwesomeSwiper
						ref={(ref) => (swiper.swiperRef = ref)}
						config={swiper.config}>
						<div className='swiper-wrapper'>
							{data.carrusel.map(function (item, i) {
								return (
									<div className='swiper-slide' key={i}>
										<div className='cv-buy-followers-swiper-slide'>
											<img src={item.icon} title={item.text} alt={item.text} />
											<br></br>
											{item.text}
										</div>
									</div>
								)
							})}
						</div>
					</AwesomeSwiper>
				</Content>
			</section>
			{/* 
			<div className='cv-models-title-two'>
				<h3>
					¿A quién va dirigido este tipo de <span className='cv-models-firts-title-900'>enlaces</span>?
				</h3>
				<p>Los negocios que estan usando estos enlaces son...</p>
			</div>
			<section className='cv-models-content-section-two'>
				<Content className='cv-container-main'>
					<Row className='cv-models-row-req' align='middle' justify='center'>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-models-row-req-item'>
								<img
									title='Debes tener mínimo'
									alt='Debes tener mínimo'
									src='https://i.ibb.co/5BrF4mg/Grupo-28.png'
								/>
								<h3>Restaurantes</h3>
							</div>
						</Col>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-models-row-req-item'>
								<img
									title='Debes tener mínimo'
									alt='Debes tener mínimo'
									src='https://i.ibb.co/YRryS7q/Grupo-11.png'
								/>
								<h3>Periódicos</h3>
							</div>
						</Col>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-models-row-req-item'>
								<img
									title='Debes tener entre 6 a 9'
									alt='Debes tener entre 6 a 9'
									src='https://i.ibb.co/7WL6x4c/Grupo-33.png'
								/>
								<h3>Profesionales/Freelances</h3>
							</div>
						</Col>
					</Row>
					<Row className='' align='middle' justify='center'>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-models-row-req-item'>
								<img
									title='Debes tener fotos de'
									alt='Debes tener fotos de'
									src='https://i.ibb.co/6HJdyJw/Grupo-29.png'
								/>
								<h3>Tienda Online</h3>
							</div>
						</Col>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-models-row-req-item'>
								<img
									title='Debes tener mínimo'
									alt='Debes tener mínimo'
									src='https://i.ibb.co/HPchgHR/Grupo-30.png'
								/>
								<h3>Blogueros</h3>
							</div>
						</Col>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-models-row-req-item'>
								<img
									title='Ser mayor de 18 años'
									alt='Ser mayor de 18 años'
									src='https://i.ibb.co/H25rT5r/Grupo-34.png'
								/>
								<h3>Empresas de envíos</h3>
							</div>
						</Col>
					</Row>
				</Content>
			</section>
			*/}
		</>
	)
}
