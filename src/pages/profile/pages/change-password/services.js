/** @format */

import axios from 'axios'

const serviceUpdateData = async (item) => {
	let returnResponse
	await axios({
		method: 'PUT',
		url: `${process.env.REACT_APP_HOST}/auth/change-password`,
		data: {
			email: item.email,
			password: item.password,
			new_password: item.new_password,
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

export { serviceUpdateData }
