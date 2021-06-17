/** @format */

import axios from 'axios'
import { notification } from 'antd'

const serviceGetLinks = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/link/${item}`,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response.data.data
			} else {
				notification['error']({
					message: `Error ${response.data.statusCode}`,
					description: `Problemas con el servico.`,
				})
			}
		})
		.catch((e) => {
			returnResponse = e.response.data
		})
	return returnResponse
}

export { serviceGetLinks }
