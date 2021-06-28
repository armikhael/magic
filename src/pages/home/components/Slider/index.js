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
						<Link to={`/help/cuentas-virales`}>
							<img
								width='100%'
								src='https://i.postimg.cc/ty3J2F7P/banner-cv-general.jpg'
								alt='Banner Publicitario'
							/>
						</Link>
					</div>
				</Carousel>
				<Carousel className='cv-home-carousel-content cv-home-slider-mobil' autoplay>
					<div>
						<Link to={`/help/cuentas-virales`}>
							<img
								width='100%'
								src='https://i.postimg.cc/bwz8f8tc/banner-general-mobile.jpg'
								alt='Banner Publicitario'
							/>
						</Link>
					</div>
				</Carousel>
			</>
		)
	}
}
