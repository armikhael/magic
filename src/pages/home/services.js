/** @format */
import axios from 'axios'
require('dotenv').config()

export default async function serviceGetAccounts() {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account?page=1&limit=10`,
	})
		.then((response) => {
			returnResponse = response
		})
		.catch((error) => {
			returnResponse = error.response.data
		})

	return returnResponse
}
