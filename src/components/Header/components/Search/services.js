/** @format */

import axios from 'axios'

const serviceGetData = async () => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/home/`,
	})
		.then((response) => {
			console.log(response.data)
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response
		})
	return returnResponse
}

export { serviceGetData }
