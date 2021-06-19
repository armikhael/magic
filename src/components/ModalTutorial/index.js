/** @format */

import React, { useState } from 'react'
import { Modal } from 'antd'

import './style.css'

export default function ModalTutorial(props) {
	const [isModalVisible, setIsModalVisible] = useState(false)

	const showModal = () => {
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
			<span style={{ margin: '0px 5px', cursor: 'pointer' }} onClick={showModal} shape='circle'>
				¿Ayuda?
			</span>
			<Modal title={props.componentHeader} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<iframe
					title='modal-tutorial'
					src={`${props.componentData.url}`}
					width='360'
					height='640'
					frameBorder='0'></iframe>
			</Modal>
		</>
	)
}
