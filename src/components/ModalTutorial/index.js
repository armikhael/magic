/** @format */

import React, { useState } from 'react'
import { Modal } from 'antd'
import Vimeo from '@u-wave/react-vimeo'

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
			<span style={{ margin: '0px 5px', cursor: 'pointer', color: '#EC3E73' }} onClick={showModal} shape='circle'>
				¿Ayuda?
			</span>
			<Modal title={props.componentHeader} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<Vimeo video={`${props.componentData.id}`} width='360' height='640' autoplay />
			</Modal>
		</>
	)
}
