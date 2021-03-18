/** @format */

import axios from 'axios'
import { notification } from 'antd'

const serviceViewAccount = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/detail/${item}`,
	})
		.then((response) => {
			console.log(response)
			if (response.data.statusCode <= 200) {
				returnResponse = response.data.data
			} else {
				notification['error']({
					message: `Error ${response.data.statusCode}`,
					description: `Problemas con el servico.`,
				})
			}
		})
		.catch((error) => {
			returnResponse = error.response.data
			notification['error']({
				message: `Error`,
				description: `Problemas con el servico process.env.REACT_APP_HOST`,
			})
		})

	return returnResponse
}

export { serviceViewAccount }
