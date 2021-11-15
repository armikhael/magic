/** @format */

import React from 'react'
import AwesomeSwiper from 'react-awesome-swiper'

import { Layout, notification, Row, Col } from 'antd'

import Loading from '../../components/Loading/Loading'
import PageError from '../../components/Errors/PageError'
import Account from '../../components/Account'

import Models from '../lading-page/models'
import Company from '../lading-page/company'

import './style.css'
import serviceGetAccounts from './services'

const { Content } = Layout

const config = {
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
			slidesPerView: 5,
			spaceBetween: 0,
		},
		768: {
			slidesPerView: 3,
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
}

export default class Home extends React.Component {
	state = {
		list: [],
		loading: true,
		error: null,
	}

	componentDidMount() {
		serviceGetAccounts().then((response) => {
			if (response.statusCode === 200) {
				this.setState({
					list: response.data,
					loading: false,
				})
			} else {
				notification['error']({
					message: `Error ${response.data.statusCode}`,
					description: `Problemas con el servico.`,
				})
			}
		})
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		if (this.state.error) {
			return <PageError detailError={this.state.error} />
		}
		return (
			<>
				<section className='cv-home-header-content'>
					<Content className='cv-global-main-container'>
						<center>
							<h1 className='cv-home-header-title-main'>
								¡Crea tu enlace personalizado<br></br> de forma <span>gratuita</span>!
							</h1>
						</center>
						<Row className='cv-home-header-row'>
							<Col xs={12} sm={12} md={12} className='cv-home-header-col-first'>
								<h3>Enlaces de Influencers</h3>
								<p>
									Modelos, Artistas, Influencers, Cantantes… Un espacio donde podrás tener
									un perfil con todo lo que necesitas.
								</p>
								<br />
								<a href='#models' className='cv-home-header-col-button'>
									¿Qué son?
								</a>
							</Col>
							<Col xs={12} sm={12} md={12} className='cv-home-header-col-second'>
								<h3>Enlaces de Negocio</h3>
								<p>
									Emprendimientos, Tiendas, Freelancers … El mejor espacio para colocar tus
									enlaces y biografía.
								</p>
								<br />
								<a href='#company' className='cv-home-header-col-button'>
									¿Qué son?
								</a>
							</Col>
						</Row>
					</Content>
				</section>
				<div id='models'>
					<Models />
					<Content className='cv-global-main-container'>
						<div className='cv-models-title-account'>
							<h3>
								Lo mejor de
								<span className='cv-models-firts-title-900'> Cuentas Virales</span>
							</h3>
							<p>Aquí te dejamos algunos cuentas Personales</p>
						</div>
						<br />
						<AwesomeSwiper ref={(ref) => (config.swiperRef = ref)} config={config}>
							<div className='swiper-wrapper'>
								{this.state.list.top_accounts.data.map(function (item, i) {
									return (
										<div className='swiper-slide' key={i}>
											<Account account={item} accountBio={false} />
										</div>
									)
								})}
							</div>
						</AwesomeSwiper>
					</Content>
				</div>
				<div id='company'>
					<Company />
					<Content className='cv-global-main-container'>
						<div className='cv-models-title-account'>
							<h3>
								Lo mejor de
								<span className='cv-models-firts-title-900'> Cuentas Virales</span>
							</h3>
							<p>Aquí te dejamos algunas de Empresas</p>
						</div>
						<br />
						<AwesomeSwiper ref={(ref) => (config.swiperRef = ref)} config={config}>
							<div className='swiper-wrapper'>
								{this.state.list.top_bussines.data.map(function (item, i) {
									return (
										<div className='swiper-slide m20' key={i}>
											<a href={item.name}>
												<div className='cv-home-company-content'>
													<img src={item.image} title={item.name} alt={item.name} />
													<h3>{item.name}</h3>
												</div>
											</a>
										</div>
									)
								})}
							</div>
						</AwesomeSwiper>
					</Content>
					<br></br>
				</div>
			</>
		)
	}
}
