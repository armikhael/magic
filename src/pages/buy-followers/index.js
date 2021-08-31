/** @format */

import React from 'react'
import AwesomeSwiper from 'react-awesome-swiper'

import { Layout, Row, Col, Button } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

import data from './data.json'
import './style.css'

const { Content } = Layout

export default function BuyFollowers() {
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

	return (
		<>
			<section className='cv-buy-followers-content-section'>
				<Content className='cv-container-main'>
					<Row className='cv-buy-followers-row-main' align='middle'>
						<Col xs={24} sm={24} md={12} className='cv-buy-followers-row-main-col-publi'>
							<h3 className='cv-buy-followers-title-dest'>
								<span>Cuentas Virales</span>, la aplicación de{' '}
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
							Método de Posicionamiento <span>100%</span> Orgánico
						</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
					<div className='cv-buy-followers-title-two'>
						<h3>Planes</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</p>
					</div>
					<br></br>
					<Row>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-buy-followers-card'>
								<center>
									<h3>individual</h3>
								</center>
								<ul>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> Valor individual por
										cada imagen
									</li>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> Valor individual por
										cada imagen
									</li>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> Valor individual por
										cada imagen
									</li>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> Valor individual por
										cada imagen
									</li>
								</ul>
								<center>
									<h3 className='cv-buy-followers-card-price'>
										$18.737<span>CLP</span>
									</h3>
									<br></br>
									<Button className='cv-buy-followers-btn-buy' type='primary'>
										Comprar
									</Button>
								</center>
							</div>
						</Col>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-buy-followers-card'>
								<center>
									<h3>Silver</h3>
								</center>
								<ul>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> Valor individual por
										cada imagen
									</li>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> Valor individual por
										cada imagen
									</li>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> Valor individual por
										cada imagen
									</li>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> Valor individual por
										cada imagen
									</li>
								</ul>
								<center>
									<h3 className='cv-buy-followers-card-price'>
										$18.737<span>CLP</span>
									</h3>
									<br></br>
									<Button className='cv-buy-followers-btn-buy' type='primary'>
										Comprar
									</Button>
								</center>
							</div>
						</Col>
						<Col xs={24} sm={24} md={8} className=''>
							<div className='cv-buy-followers-card'>
								<center>
									<h3>Gold</h3>
								</center>
								<ul>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> Valor individual por
										cada imagen
									</li>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> Valor individual por
										cada imagen
									</li>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> Valor individual por
										cada imagen
									</li>
									<li>
										<CheckCircleOutlined className='cv-buy-followers-card-i' /> Valor individual por
										cada imagen
									</li>
								</ul>
								<center>
									<h3 className='cv-buy-followers-card-price'>
										$18.737<span>CLP</span>
									</h3>
									<br></br>
									<Button className='cv-buy-followers-btn-buy' type='primary'>
										Comprar
									</Button>
								</center>
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
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
								<h3>Tener la cuenta pública</h3>
							</div>
						</Col>
						<Col xs={12} sm={12} md={6} className=''>
							<div className='cv-buy-followers-card-reque'>
								<img
									src='https://i.ibb.co/zGbxHyc/feed.png'
									alt='Contar ccon 3 publicaciones'
									title='Contar ccon 3 publicaciones'
								/>
								<h3>Contar cson 3 publicaciones</h3>
							</div>
						</Col>
						<Col xs={12} sm={12} md={6} className=''>
							<div className='cv-buy-followers-card-reque'>
								<img src='http://imgfz.com/i/elojRWr.png' alt='Publicidad' title='Publicidad' />
								<h3>No pagar publicidad</h3>
							</div>
						</Col>
					</Row>
					<br></br>
					<br></br>
					<Row className='mt15'>
						<Col xs={24} sm={24} md={12} className=''>
							<div className='cv-buy-followers-tablet'>
								<iframe
									width='100%'
									height='380'
									autoplay=''
									src='https://www.youtube.com/embed/aA0w_002Nxw'
									title='Posicionamiento'
									frameborder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>
								<div className='cv-buy-followers-tablet-btn'></div>
							</div>
						</Col>
						<Col xs={24} sm={24} md={12} className=''>
							<div className='cv-buy-followers-title-tre p20'>
								<h3>¿Cómo lo hacemos?</h3>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</p>
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
