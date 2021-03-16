/** @format */

import React, { useState, useEffect } from 'react'

import { Upload, Button } from 'antd'
import ImgCrop from 'antd-img-crop'

import { serviceGetAccount, serviceUploadImage, serviceUpdateImage } from './services'

export default function Test() {
	const [fileList, setFileList] = useState([])
	const [isButtom, setButtom] = useState(false)
	const [isAccount, setAccount] = useState(null)

	useEffect(() => {
		serviceGetAccount('euforiastral-instagram').then((response) => {
			console.log(response)
			setFileList([
				{
					uid: '-1',
					name: 'image.png',
					status: 'done',
					url: response.image,
					image: response.image,
					image_thumb: response.image_thumb,
				},
			])
			setAccount(response)
		})
	}, [])

	const handleOnChange = ({ fileList: item }) => {
		setFileList(item)
		if (item.length > 0) {
			setButtom(true)
		}
	}

	const handleSaveImage = () => {
		let formData = new FormData()
		formData.append('image', fileList[0].originFileObj)
		formData.append('name', isAccount.name)
		formData.append('key', 'a37ed9ea9a4369226c2d0c16e8c5d076')
		serviceUploadImage(formData).then((response) => {
			serviceUpdateImage(isAccount._id, response).then((response) => {})
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
				<Button type='primary' onClick={handleSaveImage}>
					Enviar
				</Button>
			)}
		</>
	)
}
