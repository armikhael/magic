/** @format */

import axios from 'axios'

const serviceGetAccountsInactives = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/admin/inactive/`,
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
		url: `${process.env.REACT_APP_HOST}/admin/${item}`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

const serviceUpdateData = async (body) => {
	console.log(body)
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

export { serviceGetAccountsInactives, serviceDeleteAccount, serviceUpdateData }
