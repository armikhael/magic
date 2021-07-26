/** @format */

import axios from 'axios'
import { notification } from 'antd'

const serviceGetData = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/profile/by-email/${item}`,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response.data
			} else {
				notification['error']({
					message: `Error ${response.data.statusCode}`,
					description: `Problemas con el servico.`,
				})
			}
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

export { serviceGetData }
