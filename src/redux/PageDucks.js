/** @format */
// import axios from 'axios'
import { serviceGetDataPage } from '../pages/profile/pages/edit-page/service'

// constants
const dataInitial = {}

// reducers
export default function reducerPage(state = dataInitial, action) {
	console.log(action)
	switch (action.type) {
		case 'GET_DATA':
			return { ...action.payload }
		case 'UPDATE_PAGE':
			return { ...state, ...action.payload }
		case 'UPDATE_ONE':
			const newObject = state
			newObject[action.payload.attriute] = action.payload.value
			return { ...newObject }
		case 'UPDATE_DATA':
			return { ...action.payload }

		default:
			return state
	}
}

// actions

export const GET_DATA = () => async (dispatch, getState) => {
	try {
		const res = await serviceGetDataPage()
		dispatch({
			type: 'GET_DATA',
			payload: res,
		})
	} catch (error) {
		console.log(error)
	}
}

export const UPDATE_ONE = (item) => async (dispatch, getState) => {
	try {
		console.log('action', item)
		dispatch({
			type: 'UPDATE_ONE',
			payload: item,
		})
	} catch (error) {
		console.log(error)
	}
}

export const UPDATE_DATA = (item) => async (dispatch, getState) => {
	try {
		console.log('action', item)
		dispatch({
			type: 'UPDATE_DATA',
			payload: item,
		})
	} catch (error) {
		console.log(error)
	}
}
