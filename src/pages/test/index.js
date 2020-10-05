/** @format */

import React from 'react'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

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

		var finished_rendering = function() {
			console.log("finished rendering plugins");
			var spinner = document.getElementById("spinner");
			spinner.removeAttribute("style");
			spinner.removeChild(spinner.childNodes[0]);
		}
		const responseFacebook = (response) => {
			console.log(response);
		}

		const responseGoogle = (response) => {
			console.log(response);
		  }
		return (
			<div className='App'>
				<p>Biografia: {this.state.biography}</p>
				<p>Seguidores: {this.state.followers}</p>
				<p>Seguidos: {this.state.followed}</p>
				<p>Publicaciones: {this.state.post}</p>
				<hr></hr>
				{/* <FacebookLogin
					appId="2737781739844102"
					autoLoad
					callback={responseFacebook}
					render={renderProps => (
						<button onClick={renderProps.onClick}>This is my custom FB button</button>
					)}
				/>

				<div
					class="fb-login-button"
					data-max-rows="1"
					data-size="large"
					data-button-type="continue_with"
					data-use-continue-as="true"
				></div> */}

				<hr></hr>
				<GoogleLogin
					clientId="264087860616-jckkkgv633q5r4n2othpppgk6rarhf03.apps.googleusercontent.com"
					render={renderProps => (
						<button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
					)}
					buttonText="Login"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={'single_host_origin'}
				/>
			</div>
		)
	}
}

export default Test
