/** @format */

import axios from 'axios'

const serviceGetData = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/name/${item}`,
	})
		.then((response) => {
			returnResponse = response.data[0]
		})
		.catch((error) => {
			returnResponse = error.response.data
		})

	return returnResponse
}

const serviceUpdateData = async (body) => {
	let returnResponse
	await axios({
		method: 'PUT',
		url: `${process.env.REACT_APP_HOST}/account/`,
		data: body,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((e) => {
			returnResponse = e.response.data
		})
	return returnResponse
}

const serviceGetCategories = async (item) => {
	console.log('serviceGetCategories', item)
	let returnResponse
	await axios({
		method: 'POST',
		url: `${process.env.REACT_APP_HOST}/category/search`,
		data: {
			query: {
				type: item,
			},
			sort: { name: 1 },
			page: 1,
		},
	})
		.then((response) => {
			console.log('response', response.data)
			returnResponse = response.data.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

export { serviceGetData, serviceUpdateData, serviceGetCategories }
