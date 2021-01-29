/** @format */

import axios from 'axios'

const updateAccount = async (item) => {
	let returnResponse
	await axios({
		method: 'PUT',
		url: `${process.env.REACT_APP_HOST}/account`,
		data: item,
	})
		.then((response) => {
			returnResponse = response.data[0]
		})
		.catch((error) => {
			returnResponse = error.response.data
		})

	return returnResponse
}

export { updateAccount }
