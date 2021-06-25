/** @format */
import axios from 'axios'
import { notification } from 'antd'

export default async function serviceGetAccounts(item) {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account?page=${item}&limit=10`,
	})
		.then((response) => {
			if (response.data.statusCode === 200) {
				returnResponse = response
			} else {
				notification['error']({
					message: `Error ${response.data.statusCode}`,
					description: `Problemas con el servico.`,
				})
				returnResponse = response
			}
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}
