/** @format */

import axios from 'axios'

const serviceCreateData = async (body) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${process.env.REACT_APP_HOST}/account`,
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

const serviceGetData = async () => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/red-social/`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})

	return returnResponse
}

export { serviceCreateData, serviceGetData }
