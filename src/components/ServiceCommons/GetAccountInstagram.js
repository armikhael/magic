import axios from 'axios'

const serviceGetInstagramAccount = async (param) => {
	let returnResponse
	await axios({
		method: 'GET',
		url: `https://www.instagram.com/${param}`,
	})
	.then((response) => {
		const jsonObject = response.data
		.match(
			/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/
		)[1]
		.slice(0, -1)
		const jsonParse = JSON.parse(jsonObject)
		console.log(jsonParse);
		const userInfo = jsonParse.entry_data.ProfilePage[0].graphql.user
		returnResponse = userInfo
	})
	.catch((error) => {
		returnResponse = error
	})
	return returnResponse
}

export { serviceGetInstagramAccount }
