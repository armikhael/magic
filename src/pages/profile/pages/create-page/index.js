/** @format */

import React, { useState, useEffect } from 'react'
import FormPage from '../../components/FormPage'
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
			<FormPage data={data}></FormPage>
		</>
	)
}

export default CreatePage
