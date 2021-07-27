/** @format */

import React, { useState } from 'react'
import renderHTML from 'react-render-html'
import { Modal } from 'antd'
import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

const ModalService = (props) => {
	const [isModalVisible, setIsModalVisible] = useState(false)

	const showModal = () => {
		setIsModalVisible(true)
	}

	const handleOk = () => {
		setIsModalVisible(false)
		serviceEventGoogleAnalytics({
			action: 'click',
			category: props.componentCategory,
			label: props.componentData.name,
		})
		window.open(
			`${process.env.REACT_APP_WHATSAPP}?phone=${props.componentData.code}${props.componentData.phone}&text=Hola ${props.componentData.account}, te encontre desde ${process.env.REACT_APP_DOMAIN}/${props.componentData.name} y me interesa: ${props.componentType} por ${props.componentValue} dólares`
		)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}
	return (
		<>
			<span onClick={showModal} className='cv-detail-actiones-title-a' style={{ cursor: 'pointer' }}>
				Click aquí
			</span>
			<Modal title={props.componentHeader} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				{renderHTML(props.componentDescription)}
				<p> Puedes realizar depósitos o transferencias en tu moneda local.</p>
			</Modal>
		</>
	)
}

export default ModalService
