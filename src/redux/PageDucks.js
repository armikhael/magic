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
			console.log('GET_DATA', action.payload)
			return { state: action.payload }
		case 'UPDATE_PAGE':
			console.log(state)
			return { ...state, ...action.payload }
		case 'UPDATE_ONE':
			console.log(state)
			return { state: action.payload }
		case 'UPDATE_DATA':
			console.log(state)
			return { state: action.payload }

		default:
			return { state }
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
