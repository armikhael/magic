/** @format */

import React from 'react';
import InstagramLogin from 'react-instagram-login';

class Test extends React.Component {


	componentDidMount() {
		console.log();
	}

	responseInstagram = (response) => {
		console.log(response);
	}

	render() {
		return (
			<InstagramLogin
				clientId="1597947977079398"
				buttonText="Login"
				onSuccess={this.responseInstagram}
				onFailure={this.responseInstagram}
			/>
		)
	}
}



export default Test
