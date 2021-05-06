import axios from 'axios'

const serviceGetCountry = async () => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/country`,
	})
		.then((response) => {
			returnResponse = response.data.data
		})
		.catch((error) => {
			returnResponse = error.response.data
		})
	return returnResponse
}

export { serviceGetCountry }
