/** @format */
import axios from 'axios'

// constants
const dataInitial = {
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
	array: ['Hola'],
}

// reducers
export default function reducerCreatePage(state = dataInitial, action) {
	switch (action.type) {
		case 'GET_DATA':
			return { ...state, array: action.payload }

		default:
			return { state }
	}
}

// actions

export const actionGetCreatePage = () => async (dispatch, getState) => {
	try {
		const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=1&limit=20`)
		console.log(res)
		dispatch({
			type: 'GET_DATA',
			payload: res.data.results,
		})
	} catch (error) {
		console.log(error)
	}
}
