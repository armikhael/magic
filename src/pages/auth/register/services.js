/** @format */

import axios from 'axios'
import { notification } from 'antd'

const authRegisterServices = async (item, redirect) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${process.env.REACT_APP_HOST}/auth/signin`,
		data: item,
	})
		.then((response) => {
			console.log(response)
			if (response.data.statusCode <= 200) {
				notification['success']({
					message: `!Bienvenido a Cuentas Virales!`,
					description: `Su cuenta fue registrada con exito...`,
				})
				let timer = setTimeout(() => {
					redirect.history.push('/auth/login')
				}, 7000)
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
			returnResponse = error.response.data
			notification['error']({
				message: `Problemas de Servicios`,
				description: `process.env.REACT_APP_HOST/auth/signin`,
			})
		})
	return returnResponse
}

export { authRegisterServices }
