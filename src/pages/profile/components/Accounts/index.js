/** @format */

import React, { useState } from 'react'
import { notification, Row, Button, Col, Tag, Result } from 'antd'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CloseOutlined, CopyOutlined } from '@ant-design/icons'

import ModalEdit from '../../components/ModalEdit'
import ModalConfiguration from '../../components/ModalConfiguration'
import { serviceDelete } from './service'

const Accounts = (props) => {
	const [data, setData] = useState(props.componentData)
	const handleDeleteAccount = (item) => {
		let btn = (
			<Button
				className='ph-profile-address-button-delete'
				onClick={() => {
					setData(
						data.filter((iterator, key) => {
							return iterator._id !== item._id
						})
					)
					serviceDelete({
						id: item._id,
						email: item.email,
					}).then((response) => {
						console.log('serviceDelete', response)
						notification.close('notiAccountDelete')
					})
				}}>
				<h3 className='ph-profile-address-button-delete-title'>Confirmar</h3>
			</Button>
		)

		notification['error']({
			message: 'Eliminar Cuenta',
			description: `Estas seguro que quieres eliminar la cuenta "${item.account}".`,
			btn,
			key: 'notiAccountDelete',
		})
	}

	return (
		<>
			{data.map((item, i) => {
				return (
					<Row className='cv-profile-card-account-content' key={i}>
						<Col sm={24} md={6} className='cv-profile-upload-image'>
							<img
								className='cv-profile-main-info-inner-container-img'
								src={item.image || process.env.REACT_APP_LOGO}
								alt={item.name}
								title={item.name}
							/>
						</Col>
						<Col sm={24} md={18} className='cv-profile-account-detail-acount'>
							<Row>
								<Col span={24}>
									<h3 className='cv-profile-account-detail-title'>{item.account}</h3>
								</Col>
								<Col span={24} className='mt15'>
									{item.emailAccount}
									<p>{item.biography}</p>
								</Col>
							</Row>
							<Row>
								<Col className='mb15' xs={24} sm={24} md={24} lg={5} xl={5}>
									<Tag color='#EC428D' style={{ textTransform: 'capitalize' }}>
										{item.type}
									</Tag>
								</Col>
								<Col className='mb15' xs={24} sm={24} md={24} lg={24} xl={24}>
									{item.eneable !== true && (
										<Button
											style={{ margin: '0px 5px' }}
											shape='round'
											href={`/profile/account-activation/${item.name}/modify`}>
											Activar Cuenta
										</Button>
									)}

									{item.eneable === true && (
										<>
											<ModalEdit componentData={item} componentHeader={'Modificar Información'} />
											<ModalConfiguration
												componentData={item}
												componentHeader={'Condiguración'}
											/>
											<CopyToClipboard text={`${process.env.REACT_APP_LINKTREE}/${item.name}`}>
												<Button
													style={{ margin: '0px 5px' }}
													shape='circle'
													onClick={() => {
														notification['success']({
															message: '¡Excelente!',
															description: `Enlace Copiado.`,
															key: i,
														})
													}}>
													<CopyOutlined />
												</Button>
											</CopyToClipboard>
										</>
									)}

									<Button
										style={{ margin: '0px 5px' }}
										type='danger'
										shape='circle'
										onClick={() => {
											handleDeleteAccount(item)
										}}>
										<CloseOutlined />
									</Button>
								</Col>
							</Row>
						</Col>
					</Row>
				)
			})}

			{(() => {
				if (data.length === 0) {
					return (
						<div className='cv-profile-card-account-content'>
							<Result
								status='error'
								title='Cuentas Registradas'
								subTitle='No tienes ninguna cuenta registrada, para poder registrar una solo debes hacer click en boton "Registrar cuentas" o en Menú también encontraras un acceso directo.'
								extra={[
									<Link key='profile-link-add-account' to={`/profile/create-account`}>
										<Button key='profile-button-add-account'>Registrar Cuenta</Button>
									</Link>,
								]}></Result>
						</div>
					)
				}
			})()}
		</>
	)
}

export default Accounts
