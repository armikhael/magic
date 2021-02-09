/** @format */

import axios from 'axios'

const serviceViewAccount = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/view/${item}`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})

	return returnResponse
}

export { serviceViewAccount }
