/** @format */

import axios from 'axios'
import React from 'react';
import ImageUploader from 'react-images-upload';
class Test extends React.Component {

	onDrop(item) {
		console.log(item);
		const formData = new FormData()
  	formData.append("image", item[0]);
  	formData.append("name", 'publicidadcreativa-instagram');
		formData.append("key", "a37ed9ea9a4369226c2d0c16e8c5d076");
		
		axios({
			method: 'POST',
			url: `https://api.imgbb.com/1/upload`,
			headers: {
        "Content-Type": "multipart/form-data"
    	},
			data: formData
		})
		.then((response) => {
			console.log('resultado del upload', response);
		})
		.catch((e) => {
			console.log('error del upload', e);
		})
	}

	render() {
		return (
			<ImageUploader
					withIcon={true}
					buttonText='Choose images'
					onChange={this.onDrop}
					imgExtension={['.jpg', '.gif', '.png', '.gif']}
					maxFileSize={5242880}
					withPreview={true}
			/>
		)
	}
}



export default Test
