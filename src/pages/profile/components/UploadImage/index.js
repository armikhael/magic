/** @format */

import React, { useState } from 'react'

import { Upload, Button } from 'antd'
import ImgCrop from 'antd-img-crop'

import { serviceUploadImage, serviceUpdateImage } from './services'
import './style.css'

export default function UploadImage(props) {
	const [fileList, setFileList] = useState([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: props.account.image,
			image: props.account.image,
			image_thumb: props.account.image_thumb,
		},
	])
	const [isButtom, setButtom] = useState(false)

	const handleOnChange = ({ fileList: item }) => {
		setFileList(item)
		if (item.length > 0) {
			setButtom(true)
		}
	}

	const handleSaveImage = () => {
		let formData = new FormData()
		formData.append('image', fileList[0].originFileObj)
		formData.append('name', props.account.name)
		formData.append('key', 'a37ed9ea9a4369226c2d0c16e8c5d076')
		serviceUploadImage(formData).then((response) => {
			console.log('imagen subida', response)
			serviceUpdateImage(props.account._id, response).then((response) => {
				console.log('imagen guardada', response.data.image)
				if (props.componentHandle) {
					handleComponent(response.data.image)
				}
			})
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

	const handleComponent = props.componentHandle

	return (
		<>
			<ImgCrop>
				<Upload
					className='cv-upload-img'
					listType='picture-card'
					fileList={fileList}
					onChange={handleOnChange}
					onPreview={handleOnPreview}>
					{fileList.length < 1 && '+ Imagen'}
				</Upload>
			</ImgCrop>
			<br />
			{isButtom && (
				<Button className='cv-upload-img-update' type='primary' onClick={handleSaveImage}>
					Actualizar
				</Button>
			)}
		</>
	)
}
