/** @format */

import React, { useState } from 'react'
import { Modal, Button } from 'antd'

const ModalEditLinktree = (props) => {
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
			<span onClick={showModal}>Editar</span>
			<Modal title={props.componentHeader} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<Button
					block
					style={{ margin: '8px 0px' }}
					shape='round'
					href={`/profile/linktree-info/${props.componentData.name}/modify`}>
					Editar Información
				</Button>
				<Button
					block
					style={{ margin: '8px 0px' }}
					shape='round'
					href={`/profile/linktree-urls/${props.componentData.name}/modify`}>
					Editar Enlaces
				</Button>
				<Button
					block
					style={{ margin: '8px 0px' }}
					shape='round'
					href={`/profile/linktree-color/${props.componentData.name}/modify`}>
					Editar Colores
				</Button>
			</Modal>
		</>
	)
}

export default ModalEditLinktree
