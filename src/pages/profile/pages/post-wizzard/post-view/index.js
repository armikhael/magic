/** @format */

import React, { useEffect, useState } from 'react'

import { serviceGetData } from './services'
import './style.css'

const PostView = (props) => {
	const [data, setData] = useState()

	useEffect(() => {
		serviceGetData(props.match.params.id).then((response) => {
			console.log('promesa', response)
			setData(response)
		})
		console.log('useEffects')
	}, [props])

	return (
		<>
			Detalles de la Publiccion
			{data != undefined && (
				<ul>
					<li>Titulo: {data.title}</li>
					<li>Descripcion: {data.text_html}</li>
					<li>Imagen: {data.image}</li>
					<li>Telefono: {data.phone}</li>
					<li>Tiempo Limite: {data.limit_time}</li>
					<li>Moneda: {data.currency}</li>
					<li>Precio Regular: {data.price_regular}</li>
					<li>Precio Promocional: {data.price_promotional}</li>
				</ul>
			)}
		</>
	)
}

export default PostView
