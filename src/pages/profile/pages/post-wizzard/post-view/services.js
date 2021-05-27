/** @format */

import axios from 'axios'

const serviceGetData = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/post/${item}`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((e) => {
			returnResponse = e.response.data
		})
	return returnResponse
}

export { serviceGetData }
