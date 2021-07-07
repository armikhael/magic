/** @format */

import axios from 'axios'

const serviceGetData = async () => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/promotion/`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})

	return returnResponse
}

export { serviceGetData }
