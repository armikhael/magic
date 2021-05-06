import axios from 'axios'

const serviceGetAccount = async (item) => {
	console.log('name:', item);
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/name/${item}`,
	})
	.then((response) => {
		returnResponse = response.data[0]
	})
	.catch((error) => {
		returnResponse = error.response.data
	})

	return returnResponse
}

export { serviceGetAccount }
