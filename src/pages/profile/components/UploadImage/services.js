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

const serviceUpdateImage = async (id, item) => {
	let returnResponse
	await axios({
		method: 'PUT',
		url: `${process.env.REACT_APP_HOST}/account/image`,
		data: {
			id: id,
			image: item.image.url,
			image_thumb: item.thumb.url,
		},
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
		.catch((error) => {
			returnResponse = error.response
		})
	return returnResponse
}

export { serviceUploadImage, serviceUpdateImage }
