/** @format */

import axios from 'axios'
import { notification } from 'antd'

const autLoginSocialServices = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${process.env.REACT_APP_HOST}/auth/`,
		data: item,
	})
		.then((response) => {
			returnResponse = response.data
			notification['success']({
				message: `Bienvenido!!`,
				description: `Su cuenta esta autorizada`,
			})
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

const authLoginServices = async (item, redirect) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${process.env.REACT_APP_HOST}/auth/login`,
		data: item,
	})
		.then((response) => {
			console.log(response)
			if (response.data.statusCode <= 200) {
				notification['success']({
					message: `!Bienvenido a Cuentas Virales!`,
					description: `Registra tus cuentas y comienza a vender...`,
				})
				localStorage.setItem(
					'user',
					JSON.stringify({
						email: response.data.data.email,
						image: response.data.data.image,
						first_name: response.data.data.first_name,
						last_name: response.data.data.last_name,
					})
				)
				let timer = setTimeout(() => {
					redirect.history.push('/')
				}, 1000)
				return () => clearTimeout(timer)
			} else {
				notification['warning']({
					message: `Problema para Iniciar Sesión`,
					description: `${response.data.data.message}...`,
				})
			}
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response
			notification['error']({
				message: `Problemas de Servicios`,
				description: `process.env.REACT_APP_HOST/auth/login`,
			})
		})
	return returnResponse
}

export { authLoginServices, autLoginSocialServices }
