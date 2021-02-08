/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { Carousel } from 'antd'

import './style.css'

export default class Slider extends React.Component {
	render() {
		return (
			<>
				<Carousel className='cv-home-carousel-content' autoplay>					
					<div>
						<Link to={`/help`}>
							<img
								width='100%'
								src='https://i.postimg.cc/ty3J2F7P/banner-cv-general.jpg'
								alt='Banner Publicitario'
							/>
						</Link>
					</div>
					<div>
						<Link to={`/profile/create-account`}>
							<img
								width='100%'
								src='https://i.postimg.cc/fTgDSzC7/banner-cv-influencer.jpg'
								alt='Banner Publicitario'
							/>
						</Link>
					</div>
				</Carousel>
			</>
		)
	}
}
