/** @format */

import React, { useEffect } from 'react'

import { serviceGetLinks } from './services'
import serviceEventGoogleAnalytics from '../../components/ServiceCommons/EventsGoogleAnalitycs'

export default function LinkTree(props) {
	useEffect(() => {
		serviceGetLinks(props.match.params.name).then((response) => {
			console.log(response)
			serviceEventGoogleAnalytics({
				category: 'enlace-personalizado',
				action: 'view',
				label: props.match.params.name,
			})
		})
	}, [props.match.params.name])
	return (
		<>
			<h1>Hola</h1>
		</>
	)
}
