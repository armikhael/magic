/** @format */

import React from 'react'
import axios from 'axios'
import { createStore } from 'redux'

const initialState = {
	email: null,
	firstName: null,
	lastName: null
}
				
const mutation = (state = initialState, action) => {
	state[action.type] = action.payload
	return state
}

const store = createStore(mutation)

		

class Test extends React.Component {
	
	state = {
		list: [],
		pageNumber: 1,
		items: 15,
		hasMore: true,
		object: {}
	}

	componentDidMount() {
		//initial request is sent
		this.testInit()
	}

	testInit = async () => {
		const { data } = await axios.get('https://www.instagram.com/jpixelat')
		const jsonObject = data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)
		const jsonParse = JSON.parse(jsonObject);
		const userInfo = jsonParse.entry_data.ProfilePage[0].graphql.user
		this.setState({
			object: userInfo,
			biography: userInfo.biography,
			followers: userInfo.edge_followed_by.count,
			followed: userInfo.edge_follow.count,
			post: userInfo.edge_owner_to_timeline_media.count,
		})
		console.log(userInfo);
	}


	render() {


		store.subscribe(() => {
			console.log('Update store', store.getState());
		})
		
					
		store.dispatch({
			type: 'email',
			payload: 'diego.carciente@gmail.com'
		})

		store.dispatch({
			type: 'firstName',
			payload: 'Diego'
		})

		store.dispatch({
			type: 'lastName',
			payload: 'Carciente'
		})
		
		return (
			<div className='App'>
				<p>Biografia: {this.state.biography}</p>
				<p>Seguidores: {this.state.followers}</p>
				<p>Seguidos: {this.state.followed}</p>
				<p>Publicaciones: {this.state.post}</p>
				<hr></hr>
				
			</div>
		)
	}
}

export default Test
