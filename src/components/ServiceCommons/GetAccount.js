import axios from 'axios'

const serviceGetAccount = async (name) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `${process.env.REACT_APP_HOST}/account/view/${name}`,
	})
	.then((response) => {
		console.log(response.data);
		returnResponse = response.data
	})
	.catch((error) => {
		returnResponse = error.response.data
	})

	return returnResponse
}

export { serviceGetAccount }
