/** @format */

import axios from 'axios'
import { notification } from 'antd'

const serviceGetAccountsByEmail = async (data) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/email/${data}`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

const serviceDeleteAccount = async (item) => {
	let returnResponse
	await axios({
		method: 'DELETE',
		url: `${process.env.REACT_APP_HOST}/account/${item.id}`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

const serviceChangePassword = async (item, email) => {
	let returnResponse
	await axios({
		method: 'PUT',
		url: `${process.env.REACT_APP_HOST}/auth/change-password`,
		data: {
			email: email,
			password: item.password,
			new_password: item.new_password,
		},
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				notification['success']({
					message: `Cambio de Contraseña!!`,
					description: `Su cambio de contraseña fue exitosa`,
				})
			} else {
				notification['error']({
					message: `${response.data.data.error}`,
					description: `${response.data.data.message}`,
				})
			}
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

export { serviceGetAccountsByEmail, serviceDeleteAccount, serviceChangePassword }
