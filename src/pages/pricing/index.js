/** @format */

import React, { useEffect, useState } from 'react'
import { Layout, Row, Col, Button, Form } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import AwesomeSwiper from 'react-awesome-swiper'

import serviceEventGoogleAnalytics from '../../components/ServiceCommons/EventsGoogleAnalitycs'
import SelectField from '../../components/Form/Select'

import data from './data.json'
import './style.css'

const { Content } = Layout

export default function Pricing(props) {
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
					slidesPerView: 1,
					spaceBetween: 0,
				},
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
				250: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
			},
		},
	}

	useEffect(() => {
		console.log('useEffects')
		serviceEventGoogleAnalytics({
			category: 'pricing',
			action: 'view',
			label: `Pagina Principal (Pricing)`,
		})
	}, [props])

	const price300 = 9
	const price500 = 12
	const price1000 = 15
	const [plan300, setPlan300] = useState(price300)
	const [plan500, setPlan500] = useState(price500)
	const [plan1000, setPlan1000] = useState(price1000)
	const [typeCurrency, setTypeCurrency] = useState('USD')
	const [typeCountry, setTypeCountry] = useState('Dólares')
	const [phone] = useState('56979582051')
	const country = [
		{
			name: 'Dólares',
			value: 'USD',
		},
		{
			name: 'Pesos Colombianos',
			value: 'COP',
		},
		{
			name: 'Pesos Chilenos',
			value: 'CLP',
		},
		{
			name: 'Soles Peruanos',
			value: 'PEN',
		},
		{
			name: 'Pesos Argentinos',
			value: 'ARS',
			bank: 'Santander',
		},
		{
			name: 'Pesos Mexicanos',
			value: 'MXN',
			bank: 'Bancomer',
		},
	]

	const currency = {
		USD: {
			name: 'Dólares',
			value: 1,
			currency: 'USD',
		},
		PAYPAL: {
			name: 'Dólares',
			value: 1,
			currency: 'USD',
		},
		COP: {
			name: 'Pesos Colombianos',
			value: 3600,
			currency: 'COP',
		},
		CLP: {
			name: 'Pesos Chilenos',
			value: 800,
			currency: 'CLP',
		},
		ARS: {
			name: 'Pesos Argentinos',
			value: 160,
			currency: 'ARS',
		},
		PEN: {
			name: 'Soles Peruanos',
			value: 4,
			currency: 'PEN',
		},
		MXN: {
			name: 'Pesos Mexicanos',
			value: 20,
			currency: 'MXN',
		},
	}

	const handleBuy = (item) => {
		if (props.match.params.account) {
			window.open(
				`${process.env.REACT_APP_WHATSAPP}?phone=${phone}&text=Hola @cuentasvirales desde el perfil de ${props.match.params.account} vi que ofrecen el servicio de posicionamiento y me interesa el plan de ${item.plan} seguidores por ${item.amount} ${item.currency}`
			)
		} else {
			window.open(
				`${process.env.REACT_APP_WHATSAPP}?phone=${phone}&text=Hola @cuentasvirales me interesa el plan de ${item.plan} seguidores por ${item.amount} ${item.currency}`
			)
		}
	}

	return (
		<>
			<section className='cv-buy-followers-content-section'>
				<Content className='cv-container-main'>
					<Row className='cv-buy-followers-row-main' align='middle'>
						<Col xs={24} sm={24} md={12} className='cv-buy-followers-row-main-col-publi'>
							<h3 className='cv-buy-followers-title-dest'>
								<span>Cuentas Virales</span>, el buscador de
							</h3>
							<h1 className='cv-buy-followers-title-main'>Publicidad Creativa</h1>
						</Col>
						<Col xs={24} sm={24} md={12} className='center'>
							<img
								className='cv-buy-followers-img-main'
								src='https://i.ibb.co/fqz7xjj/telefonos.png'
								title='Telefonos'
								alt='Telefonos'
							/>
						</Col>
					</Row>
					<div className='cv-buy-followers-title-two'>
						<h3>
							Método de Posicionamiento <span>100%</span> Orgánico en <span>Instagram</span>
						</h3>
						<p>
							Conoce el método de crecimiento en instagram que utilizan Modelos y Negocios para hacer
							crecer sus cuentas de forma explosiva de seguidores 100% orgánicos.
						</p>
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
					<br></br>
					<Row className='mt15' align='middle'>
						<Col xs={24} sm={24} md={12} className=''>
							<div className='cv-buy-followers-title-tre p20'>
								<h3>¿Cómo funciona nuestro método?</h3>
								<p>
									Aparecerás en nuestra sección de recomendaciones hasta que logres la meta
									solicitada. Si no ves cambios en 1 semana ¡Te devolvemos tú dinero!
								</p>
							</div>
						</Col>
						<Col xs={24} sm={24} md={12} className=''>
							<div className='cv-buy-followers-tablet'>
								<iframe
									width='100%'
									height='380'
									autoPlay={false}
									src='https://www.youtube.com/embed/aA0w_002Nxw'
									title='Posicionamiento'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>
								<div className='cv-buy-followers-tablet-btn'></div>
							</div>
						</Col>
					</Row>
					<br></br>
					<br></br>
					<Row className='mt15' align='middle' justify='center'>
						<Col xs={24} sm={24} md={6} className=''>
							<div className='cv-buy-followers-title-tre p20'>
								<h3>Requisitos</h3>
								<p>
									Estos son los requisitos mínimos que necesitamos para que nuestra estrategia
									funcione.
								</p>
							</div>
						</Col>
						<Col xs={12} sm={12} md={6} className=''>
							<div className='cv-buy-followers-card-reque'>
								<img
									src='https://i.ibb.co/bz5hq1g/cuenta.png'
									alt='cuenta pública'
									title='cuenta pública'
								/>
								<h3>Tener la cuenta pública durante el proceso</h3>
							</div>
						</Col>
						<Col xs={12} sm={12} md={6} className=''>
							<div className='cv-buy-followers-card-reque'>
								<img
									src='https://i.ibb.co/zGbxHyc/feed.png'
									alt='Contar ccon 3 publicaciones'
									title='Contar ccon 3 publicaciones'
								/>
								<h3>Contar mínimo con 3 publicaciones</h3>
							</div>
						</Col>
						<Col xs={12} sm={12} md={6} className=''>
							<div className='cv-buy-followers-card-reque'>
								<img src='http://imgfz.com/i/elojRWr.png' alt='Publicidad' title='Publicidad' />
								<h3>No hacer publicidad durante el proceso</h3>
							</div>
						</Col>
					</Row>
					<div className='cv-buy-followers-title-two'>
						<h3>Planes</h3>
						<p>¡En todos los paquetes publicitarios quedarás publicado hasta lograr la meta contratada!</p>
					</div>
					<Row justify='center'>
						<Col xs={20} sm={20} md={6}>
							<Form>
								<SelectField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'¿En qué moneda deseas hacer el pago?'}
									componentName={'currency'}
									componentMode={'single'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={country}
									componentRules={''}
									componentOnChange={(e) => {
										setPlan300((price300 * currency[e].value).toLocaleString('de-DE'))
										setPlan500((price500 * currency[e].value).toLocaleString('de-DE'))
										setPlan1000((price1000 * currency[e].value).toLocaleString('de-DE'))
										setTypeCurrency(currency[e].currency)
										setTypeCountry(currency[e].name)
									}}
								/>
							</Form>
						</Col>
					</Row>
					<br></br>
					<Row>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-buy-followers-card'>
								<center>
									<h3>300 Seguidores</h3>
								</center>
								<ul>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> 100% Reales
									</li>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> 100% Latinos
									</li>
								</ul>
								<center>
									<h3 className='cv-buy-followers-card-price'>
										{plan300}{' '}
										<span>
											{typeCountry} ({typeCurrency})
										</span>
									</h3>
									<br></br>
									<Button
										className='cv-buy-followers-btn-buy'
										type='primary'
										onClick={() => {
											serviceEventGoogleAnalytics({
												category: 'pricing',
												action: 'click',
												label: `300 Seguidores`,
											})
											handleBuy({ plan: '300', amount: plan300, currency: typeCountry })
										}}>
										Reservar Cupo
									</Button>
								</center>
							</div>
						</Col>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-buy-followers-card'>
								<center>
									<h3>500 Seguidores</h3>
								</center>
								<ul>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> 100% Reales
									</li>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> 100% Latinos
									</li>
								</ul>
								<center>
									<h3 className='cv-buy-followers-card-price'>
										{plan500}{' '}
										<span>
											{typeCountry} ({typeCurrency})
										</span>
									</h3>

									<br></br>
									<Button
										className='cv-buy-followers-btn-buy'
										type='primary'
										onClick={() => {
											serviceEventGoogleAnalytics({
												category: 'pricing',
												action: 'click',
												label: `500 Seguidores`,
											})
											handleBuy({ plan: '500', amount: plan500, currency: typeCountry })
										}}>
										Reservar Cupo
									</Button>
								</center>
							</div>
						</Col>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-buy-followers-card'>
								<center>
									<h3>1.000 Seguidores</h3>
								</center>
								<ul>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> 100% Reales
									</li>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> 100% Latinos
									</li>
								</ul>
								<center>
									<h3 className='cv-buy-followers-card-price'>
										{plan1000}{' '}
										<span>
											{typeCountry} ({typeCurrency})
										</span>
									</h3>
									<br></br>
									<Button
										className='cv-buy-followers-btn-buy'
										type='primary'
										onClick={() => {
											serviceEventGoogleAnalytics({
												category: 'pricing',
												action: 'click',
												label: `1000 Seguidores`,
											})
											handleBuy({ plan: '1000', amount: plan1000, currency: typeCountry })
										}}>
										Reservar Cupo
									</Button>
								</center>
							</div>
						</Col>
					</Row>
					<br></br>
					<br></br>
				</Content>
			</section>
		</>
	)
}
