/** @format */

import axios from 'axios'

const serviceUpdateAccount = async (body) => {
  console.log(body);
	let returnResponse
	await axios({
		method: 'PUT',
		url: `${process.env.REACT_APP_HOST}/account/`,
		data: body,
	})
	.then((response) => {
		returnResponse = response.data
	})
	.catch((e) => {
		returnResponse = e.response.data
	})
	return returnResponse
}



export { serviceUpdateAccount }
