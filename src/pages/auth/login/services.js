/** @format */
/** @format */

import axios from 'axios'
import { notification } from 'antd'

export default async function serviceSaveUser(item) {
	let returnResponse
	await axios({
		method: 'POST',
        url: `${process.env.REACT_APP_HOST}/auth/`,
        data: item
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
