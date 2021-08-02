/** @format */

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { notification, Row, Button, Col, Tag, Result } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CloseOutlined, CopyOutlined } from '@ant-design/icons'

import ModalEdit from '../../components/ModalEdit'
import ModalConfiguration from '../../components/ModalConfiguration'
import { serviceDelete } from './service'

const Accounts = (props) => {
	const history = useHistory()
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
			{data.map((item, key) => {
				return (
					<div key={key.toString()}>
						<Row className='cv-profile-card-account-content'>
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
										<ModalEdit componentData={item} componentHeader={'Modificar Información'} />
										{item.eneable === true && (
											<>
												<ModalConfiguration
													componentData={item}
													componentHeader={'Condiguración'}
												/>

												<CopyToClipboard
													text={`${process.env.REACT_APP_CUENTAS_VIRALES}/${item.name}`}>
													<Button
														style={{ margin: '0px 5px' }}
														shape='round'
														onClick={() => {
															notification['success']({
																message: '¡Excelente!',
																description: `Enlace copiado, listo para compartir.`,
																key: key,
															})
														}}>
														<CopyOutlined />
														Compartir
													</Button>
												</CopyToClipboard>
											</>
										)}

										<Button
											key={key.toString()}
											style={{ margin: '0px 5px' }}
											type='danger'
											shape='round'
											onClick={() => {
												handleDeleteAccount(item)
											}}>
											<CloseOutlined />
											Eliminar
										</Button>
									</Col>
								</Row>
							</Col>
						</Row>
					</div>
				)
			})}

			{data.length > 0 && (
				<Row>
					<Button
						onClick={() => {
							history.push(`/profile/account-user`)
						}}
						className={'cv-account-wizzard-button-submit'}>
						Agregar
					</Button>
				</Row>
			)}

			{data.length <= 0 && (
				<div className='cv-profile-card-account-content'>
					<Result
						status='error'
						title='Cuentas Registradas'
						subTitle='No tienes ninguna red social registrada, para poder registrar una solo debes hacer click en el siguiente boton o en Menú también encontraras un acceso directo.'
						extra={[
							<Button
								onClick={() => {
									history.push(`/profile/account-user`)
								}}
								className={'cv-account-wizzard-button-submit'}
								key={'button'}>
								Registrar
							</Button>,
						]}></Result>
				</div>
			)}
		</>
	)
}

export default Accounts
