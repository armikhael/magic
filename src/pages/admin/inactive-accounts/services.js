/** @format */
/** @format */

import axios from 'axios'

const serviceGetAccountsInactives = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/inactive/`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

const serviceActiveAccount = async (item) => {
	let returnResponse
	await axios({
		method: 'PUT',
    url: `${process.env.REACT_APP_HOST}/account/active/`,
    data: item
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

export { serviceGetAccountsInactives, serviceActiveAccount }
