/** @format */

import React, { useState, useEffect } from 'react'

import { Upload, notification } from 'antd'
import ImgCrop from 'antd-img-crop'
import { CONSTANTS } from '../ServiceCommons/Constant'
import { serviceUploadImage } from './services'
import './style.css'

export default function UploadOneImage(props) {
	const [count, setCount] = useState(0)
	const [fileList, setFileList] = useState([])

	useEffect(() => {
		console.log('useEffect', props.componentName)
	}, [props])

	const beforeUpload = (file) => {
		console.log('beforeUpload', file)
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
		console.log('name', props.componentName)
		let formData = new FormData()
		formData.append('image', item[0].originFileObj)
		formData.append('name', `${props.componentName}`)
		formData.append('key', process.env.REACT_APP_IMBB_API_KEY)
		serviceUploadImage(formData).then((response) => {
			console.log('imagen subida', response)
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
					{fileList.length <= 0 && '+ Imagen'}
				</Upload>
			</ImgCrop>
		</>
	)
}
