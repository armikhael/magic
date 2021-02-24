/** @format */

import axios from 'axios'
import React from 'react';
import ImageUploader from 'react-images-upload';
import { serviceGetAccount, serviceUploadImage } from './services'


export default class Test extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			account: null,
			name: null
		}
	}
	
	componentDidMount() {
		serviceGetAccount("publicidadcreativa-instagram").then((response) => {
			console.log(response);
			this.setState({ 
				account: response,
				name: response.name
			})
			console.log(this.state.account.name);
		})

	}

	handleUpload(item) {
		console.log(item);
		
		console.log('state', this.state);
		// const formData = new FormData()
  	// formData.append("image", item[0]);
  	// formData.append("name", this.state.account.name);
		// formData.append("key", "a37ed9ea9a4369226c2d0c16e8c5d076");
		// serviceUploadImage(item)
	}

	serviceUpdateImage(item){
		let returnResponse
		axios({
			method: 'PUT',
			url: `${process.env.REACT_APP_HOST}/account/image`,
			data: {
				id: "602ea886f79dee00176827b0",
				image: "https://i.ibb.co/vq3Dj9w/soyjorgegomez-instagram.jpg",
				image_thumb:  "https://i.ibb.co/pwfnLq0/soyjorgegomez-instagram.jpg",
				image_medium: "https://i.ibb.co/sRKtV7m/soyjorgegomez-instagram.jpg"
			}
		})
		.then((response) => {
			returnResponse = response.data[0]
		})
		.catch((error) => {
			returnResponse = error.response
		})
		return returnResponse
	}

	render() {
		return (
			<>
				{this.state.account &&
					<div>
						<p>id: {this.state.account._id}</p>
						<p>name: {this.state.account.name}</p>
					</div>
				}
				<ImageUploader
						withIcon={true}
						buttonText='Choose images'
						onChange={this.handleUpload}
						imgExtension={['.jpg', '.gif', '.png', '.gif']}
						maxFileSize={5242880}
						withPreview={true}
				/>
			</>
		)
	}
}
