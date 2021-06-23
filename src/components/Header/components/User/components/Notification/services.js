/** @format */

import axios from 'axios'

const serviceGetData = async () => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/promotion/`,
		data: {
			query: {
				type_promotion: 'account',
			},
			sort: {},
			page: 1,
		},
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
