/** @format */
import axios from 'axios'

export default async function serviceGetAccounts(item) {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account?page=${item}&limit=10`,
	})
		.then((response) => {
			console.log(response.data)
			returnResponse = response
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}
