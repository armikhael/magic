/** @format */

import axios from 'axios'
import { notification } from 'antd'

const serviceGetAccount = async (item) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/name/${item}`,
	})
		.then((response) => {
			returnResponse = response.data[0]
		})
		.catch((error) => {
			returnResponse = error.response
		})
	return returnResponse
}

export { serviceGetAccount }
