/** @format */

import React, { useState } from 'react'

import { Upload, notification } from 'antd'
import ImgCrop from 'antd-img-crop'

import { CONSTANTS } from '../../../../components/ServiceCommons/Constant'

import { serviceUploadImage, serviceUpdateData } from './services'
import './style.css'

export default function UploadCover(props) {
	const [count, setCount] = useState(0)
	const [fileList, setFileList] = useState([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: props.account.image_cover,
			image: props.account.image_cover,
			image_thumb: props.account.image_cover,
		},
	])

	const beforeUpload = (file) => {
		const isSize = file.size / 1024 / 1024 <= 0.1
		if (!isSize) {
			notification['error']({
				message: `Ups!`,
				description: `La imagen es muy pesada, reduce un poco mas el peso`,
			})
		}
		return isSize
	}

	const handleOnChange = ({ fileList: item }) => {
		console.log('handleOnChange', item)
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
		console.log('handleSaveImage', item)
		let formData = new FormData()
		formData.append('image', item[0].originFileObj)
		formData.append('name', `${props.account.name}-cover`)
		formData.append('key', process.env.REACT_APP_IMBB_API_KEY)
		serviceUploadImage(formData).then((response) => {
			console.log(response.image.url)
			props.account.image_cover = response.image.url
			serviceUpdateData(props.account).then((response) => {
				if (props.componentHandle) {
					props.componentHandle(response.data.image)
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
					accept={props.componentAccept || CONSTANTS.FORMAT}>
					{fileList.length < 1 && '+ Imagen'}
				</Upload>
			</ImgCrop>
		</>
	)
}
