/** @format */

import axios from 'axios'
import { notification } from 'antd'

export const serviceGetData = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/profile/by-email/${item}`,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response.data.accounts
			} else {
				notification['error']({
					message: `Error ${response.data.statusCode}`,
					description: `Problemas con el servico.`,
				})
			}
		})
		.catch(() => {
			notification['error']({
				message: `Error!`,
				description: `Problemas con el servico.`,
			})
		})
	return returnResponse
}
