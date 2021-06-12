/** @format */

import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { CloseCircleTwoTone, CheckCircleTwoTone, SettingOutlined } from '@ant-design/icons'

const ModalConfiguration = (props) => {
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
				<SettingOutlined />
			</Button>
			<Modal title={props.componentHeader} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<ul>
					<li>
						Verificada:{' '}
						{props.componentData.eneable === true ? (
							<CheckCircleTwoTone twoToneColor='#52c41a' />
						) : (
							<CloseCircleTwoTone twoToneColor='#eb2f96' />
						)}
					</li>
					<li>
						Mención x Mención:{' '}
						{props.componentData.mention === true ? (
							<CheckCircleTwoTone twoToneColor='#52c41a' />
						) : (
							<CloseCircleTwoTone twoToneColor='#eb2f96' />
						)}
					</li>
					<li>
						GoFoundme:{' '}
						{props.componentData.gofoundme === true ? (
							<CheckCircleTwoTone twoToneColor='#52c41a' />
						) : (
							<CloseCircleTwoTone twoToneColor='#eb2f96' />
						)}
					</li>
					<li>
						Canjes:{' '}
						{props.componentData.product === true ? (
							<CheckCircleTwoTone twoToneColor='#52c41a' />
						) : (
							<CloseCircleTwoTone twoToneColor='#eb2f96' />
						)}
					</li>
					<li>
						Marca Personal:{' '}
						{props.componentData.business === true ? (
							<CheckCircleTwoTone twoToneColor='#52c41a' />
						) : (
							<CloseCircleTwoTone twoToneColor='#eb2f96' />
						)}
					</li>
				</ul>
			</Modal>
		</>
	)
}

export default ModalConfiguration
