/** @format */

import React, { useState, useEffect } from 'react'
import FormCreatePage from '../../components/FormCreatePage'
import { serviceGetDataPage } from './service'

const EditPage = () => {
	const [data, setData] = useState({})

	const fetchData = async () => {
		const response = await serviceGetDataPage()
		setData(response)
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<ul>
				{' '}
				Datos relevantes a mostrar
				<li>Estadísticas de visitas: {data.views}</li>
				<li>Clicks Recibidos: {data.clicks}</li>
			</ul>
			<FormCreatePage data={data}></FormCreatePage>
		</>
	)
}

export default EditPage
