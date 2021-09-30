/** @format */
import axios from 'axios'

export default async function serviceGetAccounts() {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/home/top`,
	})
		.then((response) => {
			console.log(response.data)
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}
