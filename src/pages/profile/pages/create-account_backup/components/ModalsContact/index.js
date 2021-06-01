/** @format */

import React from 'react'

import { Modal } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'

import './style.css'

export default class ModalsContact extends React.Component {
	handleContact = () => {
		window.location.href = 'https://api.whatsapp.com/send?phone=56982565380'
	}

	render() {
		return (
			<>
				<Modal
					title='!Mensaje Important!'
					visible={this.props.modalsContact}
					onOk={this.handleContact}
					okText='Contactar'
					onCancel={this.props.handleCloseModalsConctac}
					cancelText='Cerrar'>
					<p>
						Lo sentimos pero tu cuenta no cuenta con 10.000 seguidores para
						poder ser registrada. Si quieres tener mas seguidores o hacer crecer
						tu cuenta contactanos y te explicamos todo.
					</p>
					<center>
						<a href='https://api.whatsapp.com/send?phone=56982565380'>
							<WhatsAppOutlined
								style={{ fontSize: '18px', color: '#00bb2d' }}
							/>
							&nbsp;+56 9 8256 5380
						</a>
					</center>
				</Modal>
			</>
		)
	}
}
