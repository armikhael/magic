/** @format */

import React, { useState, useEffect } from 'react'

import { Upload, notification, Row, Col } from 'antd'
import ImgCrop from 'antd-img-crop'
import { CONSTANTS } from '../ServiceCommons/Constant'
import { serviceUploadImage } from './services'
import './style.css'

export default function UploadOneImage(props) {
	const [count, setCount] = useState(0)
	const [fileList, setFileList] = useState([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: props.componentData.image,
			image: props.componentData.image,
			image_thumb: props.componentData.image,
		},
	])

	useEffect(() => {
		if (!props.componentData.image) {
			setFileList([])
		}
	}, [props])

	const beforeUpload = (file) => {
		const isSize = file.size / 1024 / 1024 <= 0.5
		if (!isSize) {
			notification['error']({
				message: `Ups!`,
				description: `La imagen es muy pesada, reduce un poco mas el peso`,
			})
		}
		return isSize
	}

	const handleOnChange = ({ fileList: item }) => {
		setFileList(item)
		if (item.length > 0) {
			if (count === 0) {
				handleSaveImage(item)
				setCount(1)
			}
		} else {
			setCount(0)
			props.componentHandle(undefined)
		}
	}

	const handleSaveImage = (item) => {
		let formData = new FormData()
		formData.append('image', item[0].originFileObj)
		formData.append('name', props.componentData.name)
		formData.append('key', process.env.REACT_APP_IMBB_API_KEY)
		serviceUploadImage(formData).then((response) => {
			props.componentData.image = response.image.url
			props.componentHandle(response.image.url)
		})
	}

	const handleOnPreview = async (item) => {
		let src = item.url
		if (!src) {
			src = await new Promise((resolve) => {
				let reader = new FileReader()
				reader.readAsDataURL(item.originFileObj)
				reader.onload = () => resolve(reader.result)
			})
		}
		let image = new Image()
		image.src = src
		let imgWindow = window.open(src)
		imgWindow.document.write(image.outerHTML)
	}

	return (
		<Row className='cv-upload-images-global-container'>
			<Col xs={10} sm={10} md={8}>
				<ImgCrop>
					<Upload
						className='cv-upload-images'
						listType='picture-card'
						fileList={fileList}
						onChange={handleOnChange}
						onPreview={handleOnPreview}
						beforeUpload={beforeUpload}
						progress={{ strokeWidth: 2, showInfo: false }}
						accept={props.componentAccept || CONSTANTS.FORMAT}>
						{fileList.length <= 0 && '+ Imagen'}
					</Upload>
				</ImgCrop>
			</Col>
			<Col xs={14} sm={14} md={16}>
				<div className='cv-upload-images-description-container'>
					<div>
						<h3 className='cv-upload-images-description-title'>{props.title}</h3>
						<h3 className='cv-upload-images-description-subtitle'>Click en el recuadro</h3>
						<h3 className='cv-upload-images-description-subtitle-2'>(obligatoria)</h3>
					</div>
				</div>
			</Col>
		</Row>
	)
}
