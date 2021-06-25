/** @format */
import axios from 'axios'
import { notification } from 'antd'

export default async function serviceGetAccounts(item) {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account`,
		params: {
			query: { eneable: true },
			sort: { counter_day: -1, counter: -1 },
			page: item,
		},
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
