/** @format */
/** @format */

import axios from 'axios'

export default async function serviceSaveUser(data) {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${process.env.REACT_APP_HOST}/auth/`,
		data: data,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})

	return returnResponse
}
