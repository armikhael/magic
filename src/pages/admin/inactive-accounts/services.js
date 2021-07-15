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

export { serviceGetAccountsInactives, serviceDeleteAccount }
