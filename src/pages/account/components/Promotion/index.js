/** @format */

import React, { Component } from 'react'
import AwesomeSwiper from 'react-awesome-swiper'

import { serviceEventGoogleAnalytics } from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

export default class Promotion extends Component {
	state = {
		config: {
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
					slidesPerView: 1,
					spaceBetween: 0,
				},
				768: {
					slidesPerView: 1,
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

	swiperRef = null
	render() {
		return (
			<>
				{this.props.promotion.length > 0 && (
					<>
						<AwesomeSwiper ref={(ref) => (this.swiperRef = ref)} config={this.state.config}>
							<div className='swiper-wrapper'>
								{this.props.promotion.map(function (item, i) {
									return (
										<div
											className='swiper-slide'
											key={i}
											style={{ cursor: 'pointer' }}
											onClick={() => {
												serviceEventGoogleAnalytics({
													category: 'giveaway',
													action: 'click-giveaway',
													label: `${item.title} - ${item.type_promotion}`,
												})
												window.open(item.redirect)
											}}>
											<img
												title='Publicidad'
												alt='Publicidad'
												className='cv-detail-plans-images'
												src={item.image}
											/>
										</div>
									)
								})}
							</div>
						</AwesomeSwiper>
					</>
				)}
			</>
		)
	}
}
