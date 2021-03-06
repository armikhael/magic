/** @format */

import axios from 'axios'

const serviceGetData = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/post/${item}`,
	})
		.then((response) => {
			returnResponse = response.data.data[0]
		})
		.catch((e) => {
			returnResponse = e.response.data
		})
	return returnResponse
}

const serviceCreateData = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${process.env.REACT_APP_HOST}/post/`,
		data: item,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((e) => {
			returnResponse = e.response.data.data
		})
	return returnResponse
}

const serviceUpdateData = async (item) => {
	let returnResponse
	await axios({
		method: 'PUT',
		url: `${process.env.REACT_APP_HOST}/post/`,
		data: item,
	})
		.then((response) => {
			returnResponse = response
		})
		.catch((e) => {
			returnResponse = e.response.data
		})
	return returnResponse
}

export { serviceGetData, serviceCreateData, serviceUpdateData }
