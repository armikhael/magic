/** @format */
import axios from 'axios'

export default async function serviceGetAccounts(item) {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account`,
		params: {
			query: { eneable: true },
			sort: { counter_day: -1, counter: -1 },
			page: item,
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
