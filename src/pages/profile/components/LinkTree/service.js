/** @format */

import axios from 'axios'

const serviceDelete = async (item) => {
	let returnResponse
	await axios({
		method: 'DELETE',
		url: `${process.env.REACT_APP_HOST}/link/${item._id}`,
	})
		.then((response) => {
			returnResponse = response.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

export default serviceDelete
