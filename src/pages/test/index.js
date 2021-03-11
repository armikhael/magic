/** @format */

import React from 'react'
import ImageUploader from 'react-images-upload'
import { serviceGetAccount, serviceUploadImage, serviceUpdateImage } from './services'

export default class Test extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			account: null,
			name: null,
		}
	}

	componentDidMount() {
		serviceGetAccount('geraldinelopez__-instagram').then((response) => {
			this.setState({
				account: response,
				name: response.name,
			})
		})
	}

	render() {
		const handleUpload = async (item) => {
			const formData = new FormData()
			formData.append('image', item[0])
			formData.append('name', this.state.account.name)
			formData.append('key', 'a37ed9ea9a4369226c2d0c16e8c5d076')
			try {
				const responseUpload = await serviceUploadImage(formData)
				const responseUpdate = await serviceUpdateImage(this.state.account._id, responseUpload)
				if (responseUpdate.statusCode === 200) {
					alert('finalizamos')
				}
			} catch (error) {
				alert(error)
			}
		}

		return (
			<>
				{this.state.account && (
					<div>
						<p>id: {this.state.account._id}</p>
						<p>name: {this.state.account.name}</p>
					</div>
				)}
				<ImageUploader
					withIcon={true}
					buttonText='Choose images'
					onChange={handleUpload}
					imgExtension={['.jpg', '.gif', '.png', '.gif']}
					maxFileSize={5242880}
					withPreview={true}
				/>
			</>
		)
	}
}
