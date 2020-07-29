/** @format */
/** @format */

import axios from 'axios'

export default async function serviceGetAccount(name) {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/name/${name}`,
	})
	.then((response) => {
		returnResponse = response.data[0]
	})
	.catch((error) => {
		returnResponse = error.response.data
	})

	return returnResponse
}
