/** @format */

import React from 'react'
import AwesomeSwiper from 'react-awesome-swiper'
import { useHistory } from 'react-router-dom'

import { Layout, Row, Col, Button } from 'antd'

import serviceEventGoogleAnalytics from '../../../components/ServiceCommons/EventsGoogleAnalitycs'

import data from './data.json'
import './style.css'

const { Content } = Layout

export default function Modeles() {
	const history = useHistory()
	const handleClickEnlace = () => {
		if (localStorage.getItem('user')) {
			history.push('profile/account-user')
			serviceEventGoogleAnalytics({
				category: 'homee',
				action: 'click-enlace-modelos',
				label: 'btn home modelos',
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
			<section className='cv-models-content-section'>
				<Content className='cv-global-main-container'>
					<Row className='cv-models-row-firts' align='middle'>
						<Col xs={24} sm={24} md={12} className='cv-models-col-firts'>
							<h3 className='cv-models-firts-title'>
								Ya son más de <span className='cv-models-firts-title-900'>1000</span>{' '}
								Influencers en Latinoamérica usando nuestros{' '}
								<span className='cv-models-firts-title-900'>enlaces personalizados</span>{' '}
								para gestionar todas sus redes sociales y contenido de forma{' '}
								<span className='cv-models-firts-title-900'>gratuita y simple</span>
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
						<Col xs={24} sm={24} md={12} className='cv-aling-center'>
							<img
								className='cv-models-firts-img'
								src='https://i.ibb.co/ccyGyw7/Grupo-46.png'
								title='Telefonos'
								alt='Telefonos'
							/>
						</Col>
					</Row>
					<div className='cv-models-title-two'>
						<h3>
							¿Por qué crearme un enlace como{' '}
							<span className='cv-models-firts-title-900'>Influencers</span>?
						</h3>
						<p>Aquí te dejamos algunos de los beneficios más importantes</p>
					</div>
					<AwesomeSwiper ref={(ref) => (swiper.swiperRef = ref)} config={swiper.config}>
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
					¿Qué debo hacer para <span className='cv-models-firts-title-900'>registrarme</span>?
				</h3>
				<p>
					Debes cumplir con los siguientes <span>requisitos</span>
				</p>
			</div>
			<section className='cv-models-content-section-two'>
				<Content className='cv-global-main-container'>
					<Row className='cv-models-row-req' align='middle' justify='center'>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-models-row-req-item'>
								<img
									title='Debes tener mínimo'
									alt='Debes tener mínimo'
									src='https://i.ibb.co/ygCRrrK/Grupo-2.png'
								/>
								<h3>
									Debes tener mínimo
									<br /> 1.000 seguidores en tu cuenta
								</h3>
							</div>
						</Col>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-models-row-req-item'>
								<img
									title='Debes tener entre 6 a 9'
									alt='Debes tener entre 6 a 9'
									src='https://i.ibb.co/mqBdgKF/Grupo-4.png'
								/>
								<h3>
									Debes tener entre 6 a 9
									<br /> publicaciones como mínimo
								</h3>
							</div>
						</Col>
					</Row>
					<Row className='' align='middle' justify='center'>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-models-row-req-item'>
								<img
									title='Debes tener fotos de'
									alt='Debes tener fotos de'
									src='https://i.ibb.co/CW53YD1/Grupo-3.png'
								/>
								<h3>
									Debes tener fotos de
									<br /> buena calidad
								</h3>
							</div>
						</Col>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-models-row-req-item'>
								<img
									title='Ser mayor de 18 años'
									alt='Ser mayor de 18 años'
									src='https://i.ibb.co/XLDXBGL/Grupo-5.png'
								/>
								<h3>Ser mayor de 18 años</h3>
							</div>
						</Col>
					</Row>
				</Content>
			</section>
			*/}
		</>
	)
}
