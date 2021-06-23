/** @format */

import axios from 'axios'

const serviceGetData = async () => {
	const date = new Date()
	console.log(date.getMonth(), date.getDate())
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/promotion/`,
		params: {
			query: {
				type_promotion: 'account',
				month: { $gte: date.getMonth() + 1 },
				day: { $gte: date.getDate() },
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
