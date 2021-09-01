/** @format */

import axios from 'axios'

const serviceGetData = async (item) => {
	let returnResponse
	await axios({
		method: 'POST',
		url: `${process.env.REACT_APP_HOST}/post/search`,
		data: {
			query: {
				type: item.type,
			},
			sort: {},
			page: 0,
		},
	})
		.then((response) => {
			returnResponse = response.data.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}
export { serviceGetData }
