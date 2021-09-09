/** @format */

import axios from 'axios'
import { notification } from 'antd'

const serviceAccountDetail = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${process.env.REACT_APP_HOST}/account/get-detail`,
		data: item,
	})
		.then((response) => {
			if (response.data.statusCode <= 200) {
				returnResponse = response.data.data
			} else {
				returnResponse = response.data
			}
		})
		.catch((e) => {
			returnResponse = e.response.data
			notification['error']({
				message: `Error`,
				description: `Error de conexión, intente mas tarde`,
			})
		})

	return returnResponse
}

const serviceGetPromotions = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/promotion/`,
	})
		.then((response) => {
			returnResponse = response.data.data
		})
		.catch((e) => {
			returnResponse = e.response.data
		})
	return returnResponse
}

const serviceGetLinks = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/link/${item}`,
	})
		.then((response) => {
			returnResponse = response.data.data
		})
		.catch((e) => {
			returnResponse = e.response.data
		})
	return returnResponse
}

const serviceGetPermissions = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/permissions/${item}`,
	})
		.then((response) => {
			returnResponse = response.data.data
		})
		.catch((e) => {
			returnResponse = e.response.data
		})
	return returnResponse
}

export { serviceAccountDetail, serviceGetPromotions, serviceGetLinks, serviceGetPermissions }
