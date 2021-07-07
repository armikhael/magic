/** @format */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Row, Col } from 'antd'
import { SubnodeOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import './style.css'

const ModalOption = (props) => {
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
			<span className='ml10' onClick={handleShowModal}>
				{props.componentTitle}
			</span>
			<Modal title={props.componentHeader} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<Row>
					<Col xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
						<Link to={`/profile/account-user`}>
							<div className='cv-profile-card-item-img'>
								<UsergroupAddOutlined className='cv-profile-card-item-img-icon' />
							</div>
							<p>Marca Personal</p>
						</Link>
					</Col>
					<Col xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
						<Link to={`/profile/linktree-name`}>
							<div className='cv-profile-card-item-img'>
								<SubnodeOutlined className='cv-profile-card-item-img-icon' />
							</div>
							<p>Crear Enlaces</p>
						</Link>
					</Col>
				</Row>
			</Modal>
		</>
	)
}

export default ModalOption
