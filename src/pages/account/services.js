/** @format */
/** @format */

import axios from 'axios'

export default async function serviceGetAccount(name) {
	let returnResponse
	await axios({
		method: 'get',
		url: `https://cuentas-virales.herokuapp.com/account/${name}`,
	})
		.then((response) => {
			returnResponse = response.data[0]
		})
		.catch((error) => {
			returnResponse = error.response.data
		})

	return returnResponse
}
