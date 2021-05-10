/** @format */

import axios from 'axios'
import { notification } from 'antd'

const authRecoveryPassword = async (item, redirect) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${process.env.REACT_APP_HOST}/auth/recovery-password`,
		data: item,
	})
		.then((response) => {
			console.log(response)
			if (response.data.statusCode === 200) {
				notification['success']({
					message: `Contraseña enviada`,
					description: `Revisa tu correo electrónico para ver tu nueva contraseña`,
				})
				let timer = setTimeout(() => {
					redirect.history.push('/auth/login')
				}, 7000)
				return () => clearTimeout(timer)
			} else {
				notification['warning']({
					message: `Algo Salio mal`,
					description: `${response.message}`,
				})
			}
			returnResponse = response.data
		})
		.catch(() => {
			notification['error']({
				message: `Problemas de Servicios`,
				description: `process.env.REACT_APP_HOST/auth/signin`,
			})
		})
	return returnResponse
}

export { authRecoveryPassword }
