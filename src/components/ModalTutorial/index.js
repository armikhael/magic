/** @format */

import React, { useState } from 'react'
import { Modal } from 'antd'
import Vimeo from '@u-wave/react-vimeo'

import './style.css'

export default function ModalTutorial(props) {
	const [isModalVisible, setIsModalVisible] = useState(false)

	const handleShowModal = () => {
		setIsModalVisible(true)
	}

	const handleOk = () => {
		setIsModalVisible(false)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}
	return (
		<>
			<p
				style={{ textAlign: 'center', cursor: 'pointer', color: '#EC3E73' }}
				onClick={handleShowModal}
				shape='circle'>
				{props.componentTitle}
			</p>
			<Modal title={props.componentHeader} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<Vimeo video={`${props.componentData.video}`} autoplay responsive={true} />
			</Modal>
		</>
	)
}
