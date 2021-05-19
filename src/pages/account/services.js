/** @format */

import axios from 'axios'
import { notification } from 'antd'

const serviceViewAccount = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/detail/${item}`,
	})
		.then((response) => {
			if (response.data.statusCode <= 200) {
				returnResponse = response.data.data
			} else {
				notification['error']({
					message: `Error ${response.data.statusCode}`,
					description: `Problemas con el servico.`,
				})
			}
		})
		.catch((error) => {
			returnResponse = error.response.data
			console.log(process.env.REACT_APP_HOST, error)
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

const serviceGetLnks = async (item) => {
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

export { serviceViewAccount, serviceGetPromotions, serviceGetLnks }
