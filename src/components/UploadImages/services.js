/** @format */

import axios from 'axios'

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

export { serviceUploadImage }
