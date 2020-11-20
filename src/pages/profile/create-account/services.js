/** @format */

import axios from 'axios'

const serviceGetCategories = async () => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/category`,
	})
		.then((response) => {
			returnResponse = response.data.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

const serviceSaveAccount = async (body) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${process.env.REACT_APP_HOST}/account`,
		data: body,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response
		})
	return returnResponse
}

const serviceGetInstagramAccount = async (param) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `https://www.instagram.com/${param}`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response
		})
	return returnResponse
}

export { serviceGetCategories, serviceSaveAccount, serviceGetInstagramAccount }
