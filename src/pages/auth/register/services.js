/** @format */

import axios from 'axios'
import { notification } from 'antd'

const serviceAuthSignin = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${process.env.REACT_APP_HOST}/auth/signin`,
		data: item,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
			notification['error']({
				message: `Lo sentimos!`,
				description: `Error inesperado, intente mas tarde`,
			})
		})
	return returnResponse
}

export { serviceAuthSignin }
