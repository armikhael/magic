/** @format */

import axios from 'axios'

export default async function serviceGetAccountByCategory(name, page) {
	let returnResponse
	await axios({
		method: 'GET',
        url: `${process.env.REACT_APP_HOST}/account/category`,
        params: {
            name: name,
            page: page
        }
	})
    .then((response) => {
        returnResponse = response.data
    })
    .catch((error) => {
        returnResponse = error.response.data
    })

	return returnResponse
}
