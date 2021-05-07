/** @format */

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { actionGetCreatePage } from '../../../../redux/CreatePageDucks'
import FormCreatePage from '../../components/FormCreatePage'
import { serviceGetDataPage } from './service'

const EditPage = () => {
	const [data, setData] = useState({})
	const dispatch = useDispatch()
	const dataDucks = useSelector((store) => store.createPage.array)
	const fetchData = async () => {
		const response = await serviceGetDataPage()
		setData(response)
		console.log('dataDucks', dataDucks)
		console.log(response)
	}

	useEffect(() => {
		fetchData()
	}, [dispatch])

	return (
		<>
			<ul>
				{' '}
				Datos relevantes a mostrar
				<li>Estadísticas de visitas: {data.views}</li>
				<li>Clicks Recibidos: {data.clicks}</li>
			</ul>
			<FormCreatePage data={data}></FormCreatePage>

			<button onClick={() => dispatch(actionGetCreatePage())}>Obtener</button>
			<ul>{dataDucks !== undefined && dataDucks.map((item) => <li key={item.name}>{item.name}</li>)}</ul>
		</>
	)
}

export default EditPage
