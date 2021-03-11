/** @format */

import React, { useState } from 'react'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'

export default function Help(props) {
	const [fileList, setFileList] = useState([])

	const onChange = ({ fileList: newFileList }) => {
		setFileList(newFileList)
	}

	const onPreview = async (item) => {
		console.log(item)
		let src = item.url
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader()
				reader.readAsDataURL(item.originFileObj)
				reader.onload = () => resolve(reader.result)
			})
		}
		const image = new Image()
		image.src = src
		const imgWindow = window.open(src)
		imgWindow.document.write(image.outerHTML)
	}

	return (
		<>
			<ImgCrop>
				<Upload
					action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
					listType='picture-card'
					fileList={fileList}
					onChange={onChange}
					onPreview={onPreview}>
					{fileList.length < 1 && '+ Imagen'}
				</Upload>
			</ImgCrop>
		</>
	)
}
