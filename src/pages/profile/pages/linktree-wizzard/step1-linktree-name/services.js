/** @format */

import axios from 'axios'

const serviceCreateData = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${process.env.REACT_APP_HOST}/link/`,
		data: item,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((e) => {
			returnResponse = e.response.data.data
		})
	return returnResponse
}

export { serviceCreateData }
