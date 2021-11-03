/** @format */

import React from 'react'

import { notification, Row, Col } from 'antd'
import { EyeOutlined, DeleteOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import ModalEditLinktree from '../ModalEditLinktree'

import './style.sass'

export default function LinkTree(props) {
	return (
		<>
			<div className='cv-profile-business-linktree-notify'>
				{props.checkAcountVerified.length > 0 && (
					<>Tienes {props.checkAcountVerified.length} cuenta(s) pendiente(s) por activación</>
				)}
			</div>
			<Row>
				{props.componentData.map((item, index) => (
					<Col
						xs={24}
						sm={24}
						md={12}
						lg={8}
						xl={8}
						className='cv-profile-business-linktree-list-main-container'
						key={index}>
						<div className='cv-profile-business-linktree-list-container'>
							<div className='cv-profile-business-linktree-list-info-container'>
								<div className='cv-profile-business-linktree-list-info-inner-container'>
									<div className='cv-profile-business-linktree-list-info-avatar-container'>
										<img
											className='cv-profile-business-linktree-list-avatar'
											src={item.image || process.env.REACT_APP_LOGO}
											alt={item.name}
											title={item.name}
										/>
									</div>
									<div className='cv-profile-business-linktree-list-info-data-container'>
										<h3 className='cv-profile-business-linktree-list-info-title'>
											{item.account ? item.account : 'No info.'}
										</h3>
										<h4 className='cv-profile-business-linktree-list-info-nick'>
											<UserOutlined className='cv-profile-business-linktree-list-info-nick-icon' />
											{item.name}
										</h4>
										<h4 className='cv-profile-business-linktree-list-info-email'>
											<MailOutlined className='cv-profile-business-linktree-list-info-email-icon' />
											{item.email}
										</h4>
									</div>
								</div>
								<p className='cv-profile-business-linktree-list-info-description'>
									{item.description ? item.description : 'No info'}
								</p>
								<span
									className='cv-profile-business-linktree-delete-button'
									onClick={() => {
										props.handleDeleteLink(item)
									}}>
									<DeleteOutlined />
								</span>
								<span
									className='cv-profile-business-linktree-preview-button'
									onClick={() => {
										window.open(`/${item.name}`)
									}}>
									<EyeOutlined />
								</span>
							</div>
							<div className='cv-profile-business-linktree-list-actions-container'>
								<CopyToClipboard text={`${process.env.REACT_APP_LINKTREE}/${item.name}`}>
									<div
										className='cv-profile-business-linktree-list-actions-copy'
										onClick={() => {
											notification['success']({
												message: '¡Excelente!',
												description: `Enlace Copiado.`,
											})
										}}>
										Copiar
									</div>
								</CopyToClipboard>
								<div className='cv-profile-business-linktree-list-actions-edit'>
									<ModalEditLinktree
										componentData={item}
										componentHeader={'Modificar Información'}
									/>
								</div>
							</div>
						</div>
					</Col>
				))}
			</Row>
		</>
	)
}
