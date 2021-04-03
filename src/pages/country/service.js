/** @format */

import axios from 'axios'

const serviceGetAccountByCountry = async (name, page, sort) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/search?country=${name}&page=${page}&sort=${sort}`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

export { serviceGetAccountByCountry }
