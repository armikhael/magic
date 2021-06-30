/** @format */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Row, Col } from 'antd'

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
					<Col xs={12} sm={12} md={12}>
						<Link to={`/profile/account-user`}>
							<img width='128px' src='https://i.ibb.co/4YMC9HP/miscuentas.png' alt='Multiples enlaces' />
							<p>Marca Personal</p>
						</Link>
					</Col>
					<Col xs={12} sm={12} md={12}>
						<Link to={`/profile/linktree-name`}>
							<img width='128px' src='https://i.ibb.co/W3mYPYP/links.png' alt='Multiples enlaces' />
							<p>Enlaces Personalizados</p>
						</Link>
					</Col>
				</Row>
			</Modal>
		</>
	)
}

export default ModalOption
