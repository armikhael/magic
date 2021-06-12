/** @format */

import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'

const ModalEdit = (props) => {
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
			<Button style={{ margin: '0px 5px' }} onClick={showModal} shape='circle'>
				<EditOutlined />
			</Button>
			<Modal title={props.componentHeader} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<Button
					block
					style={{ margin: '8px 0px' }}
					shape='round'
					href={`/profile/account-biography/${props.componentData.name}/modify`}>
					Editar Biografía
				</Button>
				<Button
					block
					style={{ margin: '8px 0px' }}
					shape='round'
					href={`/profile/account-plans/${props.componentData.name}/modify`}>
					Editar Planes
				</Button>
				<Button
					block
					style={{ margin: '8px 0px' }}
					shape='round'
					href={`/profile/account-details/${props.componentData.name}/modify`}>
					Editar Filtros
				</Button>
			</Modal>
		</>
	)
}

export default ModalEdit
