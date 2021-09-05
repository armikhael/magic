/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { Carousel } from 'antd'

import './style.css'

export default class Slider extends React.Component {
	render() {
		return (
			<>
				<Carousel className='cv-home-carousel-content cv-home-slider-web ' autoplay>
					<div>
						<Link to={`/help/quienes-somos`}>
							<img width='100%' src='https://i.ibb.co/pZ5PV4H/d112.jpg' alt='Quienes Somos' />
						</Link>
					</div>
					<div>
						<Link to={`/pricing`}>
							<img width='100%' src='https://i.ibb.co/GJB3LkQ/d114.jpg' alt='Posicionamiento' />
						</Link>
					</div>
					<div>
						<Link to={`/help/mis-cuentas`}>
							<img width='100%' src='https://i.ibb.co/Pz1rc9w/d116.jpg' alt='Mis Cuentas' />
						</Link>
					</div>
				</Carousel>
				<Carousel className='cv-home-carousel-content cv-home-slider-mobil' autoplay>
					<div>
						<Link to={`/help/quienes-somos`}>
							<img width='100%' src='https://i.ibb.co/hB2LFCf/d113.jpg' alt='Quienes Somos' />
						</Link>
					</div>
					<div>
						<Link to={`/pricing`}>
							<img width='100%' src='https://i.ibb.co/ZSf8J4w/d115.jpg' alt='Posicionamiento' />
						</Link>
					</div>
					<div>
						<Link to={`/help/mis-cuentas`}>
							<img width='100%' src='https://i.ibb.co/r0tKtbv/d117.jpg' alt='Mis Cuentas' />
						</Link>
					</div>
				</Carousel>
			</>
		)
	}
}
