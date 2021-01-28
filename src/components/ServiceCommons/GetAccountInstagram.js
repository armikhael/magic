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



	// handleFindAccount = async (props) => {
	// 	if (this.state.type === 'instagram') {
	// 		serviceGetInstagramAccount(props)
	// 			.then((response) => {
	// 				this.setState({
	// 					name: response.username,
	// 					biography: response.biography,
	// 					image: response.profile_pic_url_hd,
	// 					followers: response.edge_followed_by.count,
	// 					follow: response.edge_follow.count,
	// 					emailAccount: response.business_email,
	// 				})
	// 				if (response.edge_followed_by.count < 10000) {
	// 					this.setState({ 
	// 						agree: false, 
	// 						modalsContact: true, 
	// 					})
	// 					return
	// 				}
					
	// 				console.log(response.biography);
	// 				let word = response.biography.toLowerCase()
	// 				let isTrue = word.includes(process.env.REACT_APP_SECRET)
	// 				console.log(isTrue);
	// 				if (!isTrue) {
	// 					this.setState({ 
	// 						agree: false, 
	// 						modalsVerification: true,
	// 					})
	// 					return 
	// 				}

	// 				this.setState({ agree: true })
	// 			})
	// 			.catch(() => {
	// 				notification['error']({
	// 					message: `Error!`,
	// 					description: `Esta cuenta es inválida`,
	// 				})
	// 			})
	// 	}
	// }