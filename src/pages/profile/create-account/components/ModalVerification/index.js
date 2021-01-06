/** @format */

import React from 'react'

import { Modal } from 'antd'
import { WhatsAppOutlined } from '@ant-design/icons'

import './style.css'

export default class ModalsVerification extends React.Component {
	render() {
		return (
			<>
				<Modal
					title='!Verifiquemos su cuenta!'
					visible={this.props.modalsVerification}
					onOk={this.handleContact}
					okText='Verificar'
					onCancel={this.props.handleCloseModalsVerification}
					cancelText='Cancelar'>
					<p>
						Para asegurarnos de que la cuenta es de su propuedad, sólo debe colocar
						la palabra <b>@PUBLILOVERS</b> en la biografía de su cuenta durante 1 día
						y luego podrá removerlo, si tiene dudas de como hacerlo puede contarcarnos
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
