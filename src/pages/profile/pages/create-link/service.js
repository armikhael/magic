/** @format */

// import axios from 'axios'

const serviceGetData = async () => {
	// await axios({
	// 	method: 'PUT',
	// 	url: `${process.env.REACT_APP_HOST}/account/`,
	// 	data: body,
	// })
	// .then((response) => {
	// 	returnResponse = response.data
	// })
	// .catch((e) => {
	// 	returnResponse = e.response.data
	// })
	return {
		name: 'diegoCarciente',
		links: [
			{ title: 'titulo del Link', url: 'url del link' },
			{ title: 'titulo del Link', url: 'url del link' },
			{ title: 'titulo del Link', url: 'url del link' },
		],
	}
}

export { serviceGetData }
