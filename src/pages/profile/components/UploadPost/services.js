/** @format */

import axios from 'axios'
import { notification } from 'antd'

const serviceUploadImage = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `https://api.imgbb.com/1/upload`,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		data: item,
	})
		.then((response) => {
			returnResponse = response.data.data
		})
		.catch((error) => {
			returnResponse = error.response
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
			if (response.data.statusCode === 200) {
				notification['success']({
					message: `!Imagen subida con Exito!`,
					description: `Recuerda que puedes cambiarla cuando quieras...`,
				})
			} else {
				notification['error']({
					message: `Problemas de Servicios`,
					description: `Error al cargar la imagen`,
				})
			}
		})
		.catch((e) => {
			returnResponse = e.response.data
		})
	return returnResponse
}

export { serviceUploadImage, serviceUpdateData }
