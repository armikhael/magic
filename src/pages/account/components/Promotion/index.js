/** @format */

import React from 'react'
import { serviceEventGoogleAnalytics } from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

export default function Promotion(props) {
	return (
		<>
			{props.promotion.length > 0 && (
				<span
					style={{ cursor: 'pointer' }}
					onClick={() => {
						serviceEventGoogleAnalytics({
							category: 'giveaway',
							action: 'click-giveaway',
							label: props.detailAccount.name,
						})
						window.open(props.promotion[0].redirect)
					}}>
					<img
						title='Publicidad'
						alt='Publicidad'
						className='cv-detail-plans-images'
						src={props.promotion[0].image}
					/>
				</span>
			)}
		</>
	)
}
