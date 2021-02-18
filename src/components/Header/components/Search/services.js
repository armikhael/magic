/** @format */

import axios from 'axios'

const serviceGetCategories = async () => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/home/`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response
		})
	return returnResponse
}

export { serviceGetCategories }
