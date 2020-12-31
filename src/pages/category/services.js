/** @format */

import axios from 'axios'

const serviceGetAccountByCategory = async (name, page) => {
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

export { serviceGetAccountByCategory }
