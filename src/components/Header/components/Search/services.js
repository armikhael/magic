/** @format */

import axios from 'axios'

const serviceGetCategories = async () => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/category`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

const serviceSearch = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/search/${item}`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

export { serviceGetCategories, serviceSearch }
