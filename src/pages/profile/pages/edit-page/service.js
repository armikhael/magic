/** @format */

// import axios from 'axios'

const serviceGetDataPage = async () => {
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
		title: 'Titulo Promocional',
		image: 'https://i.postimg.cc/YSQXZWCP/logo.jpg',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		priceRegular: '50000',
		pricePromotional: '2000',
		phone: '99999999',
		dateLimit: '01/01/9999',
		views: '2000',
		clicks: '213',
	}
}

export { serviceGetDataPage }
