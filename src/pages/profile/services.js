/** @format */
/** @format */

import axios from 'axios'

export default async function serviceGetAccountsByEmail(data) {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/email/${data}`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})

	return returnResponse
}
