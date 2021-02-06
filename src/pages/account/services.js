/** @format */

import axios from 'axios'

const serviceViewAccount = async (item) => {
	console.log('name:', item);
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/view/${item}`,
	})
	.then((response) => {
		console.log(response.data);
		returnResponse = response.data
	})
	.catch((error) => {
		returnResponse = error.response.data
	})

	return returnResponse
}

export { serviceViewAccount }
