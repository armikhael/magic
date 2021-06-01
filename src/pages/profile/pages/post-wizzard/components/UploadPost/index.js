/** @format */

import React, { useState } from 'react'

import { Upload, Button, notification } from 'antd'
import ImgCrop from 'antd-img-crop'

import { serviceUploadImage } from './services'
import './style.css'

export default function UploadPost(props) {
	const [fileList, setFileList] = useState([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: props.image || 'https://i.postimg.cc/YSQXZWCP/logo.jpg',
			image: props.image || 'https://i.postimg.cc/YSQXZWCP/logo.jpg',
			image_thumb: props.image || 'https://i.postimg.cc/YSQXZWCP/logo.jpg',
		},
	])
	const [isButtom, setButtom] = useState(false)

	const beforeUpload = (file) => {
		console.log('beforeUpload', file)
		const isSize = file.size / 1024 / 1024 <= 0.03
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
			setButtom(true)
		}
	}

	const handleSaveImage = () => {
		let formData = new FormData()
		formData.append('image', fileList[0].originFileObj)
		formData.append('key', 'a37ed9ea9a4369226c2d0c16e8c5d076')
		serviceUploadImage(formData).then((response) => {
			console.log('imagen subida', response)
			handleComponent(response.thumb.url)
			setButtom(false)
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
					onPreview={handleOnPreview}
					beforeUpload={beforeUpload}
					progress={{ strokeWidth: 2, showInfo: false }}
					accept={props.componentAccept || '.jpeg, .png, jpeg'}>
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
