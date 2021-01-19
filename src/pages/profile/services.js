/** @format */
/** @format */

import axios from 'axios'

const serviceGetAccountsByEmail = async (data) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/email/${data}`,
	})
	.then((response) => {
		returnResponse = response.data
	})
	.catch((error) => {
		returnResponse = error.response.data
	})
	return returnResponse
}

const serviceDeleteAccount = async (item) => {
	let returnResponse
	await axios({
		method: 'DELETE',
		url: `${process.env.REACT_APP_HOST}/account/${item.id}/${item.email}`,
	})
	.then((response) => {
		returnResponse = response.data
	})
	.catch((error) => {
		returnResponse = error.response.data
	})
	return returnResponse
}

export { serviceGetAccountsByEmail, serviceDeleteAccount }
