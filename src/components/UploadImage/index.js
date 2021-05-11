/** @format */

import React, { useState } from 'react'

import { Upload, Button } from 'antd'
import ImgCrop from 'antd-img-crop'

import { serviceUploadImage } from './services'
import './style.css'

export default function UploadImage(props) {
	const [fileList, setFileList] = useState([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: 'https://i.postimg.cc/YSQXZWCP/logo.jpg',
			image: 'https://i.postimg.cc/YSQXZWCP/logo.jpg',
			image_thumb: 'https://i.postimg.cc/YSQXZWCP/logo.jpg',
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
		if (fileList[0].size <= 40000) {
			let formData = new FormData()
			console.log()
			formData.append('image', fileList[0].originFileObj)
			formData.append('name', fileList[0].name + fileList[0].uid)
			formData.append('key', 'a37ed9ea9a4369226c2d0c16e8c5d076')

			console.log(formData)
			serviceUploadImage(formData).then((response) => {
				console.log(response)
				componentFunction(response.image.url)
			})
		} else {
			alert('El peso de la imagen es muy alto')
		}
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

	const componentFunction = props.componentFunction
	return (
		<>
			<ImgCrop>
				<Upload
					name={props.componentName}
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
				<Button type='primary' onClick={handleSaveImage}>
					Actualizar
				</Button>
			)}
		</>
	)
}
