/** @format */
/** @format */

import axios from 'axios'

export default async function serviceSaveUser(item) {
	let returnResponse
	await axios({
		method: 'POST',
        url: `${process.env.REACT_APP_HOST}/auth/`,
        data: item
	})
	.then((response) => {
		returnResponse = response.data
	})
	.catch((error) => {
		returnResponse = error.response.data
	})

	return returnResponse
}
