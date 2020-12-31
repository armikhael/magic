/** @format */

import axios from 'axios'

export default async function serviceGetCategories() {
	let returnResponse
	await axios({
		method: 'GET',
        url: `${process.env.REACT_APP_HOST}/category`,
	})
    .then((response) => {
        returnResponse = response.data
    })
    .catch((error) => {
        returnResponse = error.response.data
    })

	return returnResponse
}
