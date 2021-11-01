/** @format */

import axios from 'axios'

import { notification } from 'antd'

export const serviceGetData = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/profile/by-email/${item}`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

export const serviceDelete = async (item) => {
	let returnResponse
	await axios({
		method: 'DELETE',
		url: `${process.env.REACT_APP_HOST}/link/${item._id}`,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response.data.data
				notification['success']({
					message: `¡Felicidades!`,
					description: `El enlace ha sido eliminado correctamente`,
				})
			} else {
				notification['error']({
					message: `¡Ups!`,
					description: response.data.message,
				})
			}
		})
		.catch(() => {
			notification['error']({
				message: `¡Advertencia!`,
				description: `Verifica tu conexión a internet`,
			})
		})
	return returnResponse
}
