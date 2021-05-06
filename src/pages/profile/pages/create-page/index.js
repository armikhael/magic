/** @format */

import React, { useState, useEffect } from 'react'
import FormCreatePage from '../../components/FormCreatePage'
import { interfaceCreatePage } from './service'

const CreatePage = () => {
	const [data, setData] = useState({})

	const fetchData = async () => {
		const response = await interfaceCreatePage()
		setData(response)
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<FormCreatePage data={data}></FormCreatePage>
		</>
	)
}

export default CreatePage
