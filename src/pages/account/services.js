/** @format */
/** @format */

import axios from 'axios'

const serviceGetAccount = async (name) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/name/${name}`,
	})
	.then((response) => {
		returnResponse = response.data[0]
	})
	.catch((error) => {
		returnResponse = error.response.data
	})

	return returnResponse
}

const updateAccount = async (body) => {
	let returnResponse
	await axios({
		method: 'PUT',
		url: `${process.env.REACT_APP_HOST}/account`,
		data: body
	})
	.then((response) => {
		returnResponse = response.data[0]
	})
	.catch((error) => {
		returnResponse = error.response.data
	})

	return returnResponse
}

export { serviceGetAccount, updateAccount }

