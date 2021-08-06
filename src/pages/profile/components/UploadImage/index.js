/** @format */

import React, { useEffect, useState } from 'react'

import { Upload, notification } from 'antd'
import ImgCrop from 'antd-img-crop'

import { CONSTANTS } from '../../../../components/ServiceCommons/Constant'

import { serviceUploadImage, serviceUpdateData } from './services'
import './style.css'

export default function UploadImage(props) {
	const [count, setCount] = useState(0)
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

	useEffect(() => {
		if (!props.account.image) {
			setFileList([])
		}
		console.log('useEffect')
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
		console.log('name', props.account.name)
		let formData = new FormData()
		formData.append('image', item[0].originFileObj)
		formData.append('name', `${props.account.name}`)
		formData.append('key', process.env.REACT_APP_IMBB_API_KEY)
		serviceUploadImage(formData).then((response) => {
			console.log('imagen subida', response)
			props.account.image = response.image.url
			props.account.image_thumb = response.thumb.url
			serviceUpdateData(props.account).then((response) => {
				console.log('imagen guardada', response.data.image)
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
