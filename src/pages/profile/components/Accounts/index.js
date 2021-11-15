/** @format */

import lodash from 'lodash'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { notification, Row, Button, Col, Tag, Result } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Loading from '../../../../components/Loading/Loading'
import { CONSTANTS } from '../../../../components/ServiceCommons/Constant'

import { serviceDelete } from './service'
import './style.css'

const Accounts = (props) => {
	const history = useHistory()
	const [data, setData] = useState(
		lodash.orderBy(props.componentData, ['eneable'], ['asc'])
	)
	const [loading, setLoading] = useState(true)
	const [count, setCount] = useState()
	console.log(data, 'informacion de enlaces')
	useEffect(() => {
		const check = props.componentData.filter((item) => {
			return item.eneable === false
		})
		setCount(check)
		setLoading(false)
	}, [props])

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

	if (loading) {
		return <Loading />
	}

	return (
		<>
			<div className='cv-profile-accounts-pending-titlle'>
				{count.length > 0 && (
					<>Tienes {count.length} cuenta(s) pendiente(s) por activación</>
				)}
			</div>
			<Row>
				{data.map((item, key) => {
					return (
						<Col
							xs={24}
							sm={24}
							md={8}
							xl={8}
							className='cv-profile-accounts-social-media-content'
							key={key.toString()}>
							<div className='cv-profile-accounts-social-media'>
								<Tag color='#EC428D' style={{ textTransform: 'capitalize' }}>
									{item.type}
								</Tag>
							</div>
							{/* 
							{item.eneable !== true && (
								<Row className='cv-profile-accounts-button-active-position ' justify='center'>
									<Col xs={4} sm={4} md={4}>
										<Button
											className='cv-profile-accounts-button-active-style'
											style={{ margin: '0px 5px' }}
											shape='round'
											href={`/profile/account-activation/${item.name}/modify`}>
											Activar
										</Button>
									</Col>
								</Row>
							)}
							*/}
							<div className='cv-profile-accounts-card-content'>
								<div className='cv-profile-accounts-information-content'>
									<Row>
										<Col span={6} className='cv-profile-accounts-upload-image'>
											<img
												className='cv-profile-accounts-image'
												src={item.image || process.env.REACT_APP_LOGO}
												alt={item.name}
												title={item.name}
											/>
										</Col>
										<Col span={18}>
											{' '}
											<Row>
												{' '}
												<Col span={22}>
													<h3 className='cv-profile-account-detail-title'>
														{item.account}
													</h3>
												</Col>
												<Col span={2}>
													<Button
														className='cv-profile-accounts-button-delete'
														block
														style={{ margin: '0px 0px' }}
														type='danger'
														shape='round'
														onClick={() => {
															handleDeleteAccount(item)
														}}>
														<img
															className='cv-profile-account-icon-size'
															src='https://i.ibb.co/rHMc9sY/Vector.png'
															alt=''
														/>
													</Button>
												</Col>
											</Row>
											<Row>
												<Col span={2}>
													<img
														className='cv-profile-account-icon-size'
														src='https://i.ibb.co/37hHcKc/User.png'
														alt=''
													/>
												</Col>
												<Col span={4} className='cv-profile-account-data'>
													{item.interface.followers}
												</Col>
												<Col span={2}>
													<img
														className='cv-profile-account-icon-size'
														src='https://i.ibb.co/VjWS6c8/WhatsApp.png'
														alt=''
													/>
												</Col>
												<Col span={16} className='cv-profile-account-data'>
													{item.phone}
												</Col>
											</Row>
											<Row>
												<Col span={2}>
													{' '}
													<img
														className='cv-profile-account-icon-size'
														src='https://i.ibb.co/pQ6Z6RJ/Mail.png'
														alt=''
													/>
												</Col>
												<Col span={22} className='cv-profile-account-data'>
													{item.email}
												</Col>
											</Row>
										</Col>
									</Row>

									<div>
										{item.emailAccount}
										<p className='cv-profile-accounts-biography'>
											{item.biography}
										</p>
									</div>
								</div>

								<Row>
									<Col span={12}>
										<Button
											className='cv-profile-accounts-button-edit-information'
											block
											style={{ margin: '0px 0px' }}
											shape='round'
											href={`/profile/account-biography/${item.name}/modify`}>
											Editar Información
										</Button>
									</Col>
									<Col span={12}>
										{' '}
										<Button
											className='cv-profile-accounts-button-edit-links'
											block
											style={{ margin: '0px 0px' }}
											shape='round'
											href={`/profile/account-links/${item.name}/modify`}>
											Editar Links
										</Button>
									</Col>{' '}
									{item.followers > CONSTANTS.MIN_FOLLOWERS && (
										<Button
											block
											style={{ margin: '4px 0px' }}
											shape='round'
											href={`/profile/account-plans/${item.name}/modify`}>
											Editar Planes
										</Button>
									)}
									{item.eneable === true && (
										<CopyToClipboard
											text={`${process.env.REACT_APP_CUENTAS_VIRALES}/${item.name}`}>
											<Button
												block
												style={{ margin: '4px 0px' }}
												shape='round'
												onClick={() => {
													notification['success']({
														message: '¡Excelente!',
														description: `Enlace copiado, listo para compartir.`,
														key: key,
													})
												}}>
												Copiar mi enlace
											</Button>
										</CopyToClipboard>
									)}
								</Row>
							</div>
						</Col>
					)
				})}
			</Row>
			{data.length <= 0 && (
				<div className='cv-profile-card-account-content'>
					<Result
						status='error'
						title='Cuentas Registradas'
						subTitle='No tienes ninguna red social registrada, para poder registrar una solo debes hacer click en el siguiente boton o en Menú también encontraras un acceso directo.'
						extra={[
							<h3>Recuerdas que tendras dos modalidades de registro</h3>,
							<Row className='cv-profile-account-phone-type-account-content'>
								<Col xs={12} sm={12} md={12} xl={12}>
									<h3 className='cv-profile-account-title-phone-type-account'>
										Cuentas de Influencer
									</h3>
									<img
										className='cv-profile-account-img-phone-type-account'
										src='https://i.ibb.co/ngHy2q9/Grupo-46.png'
										title='Telefonos'
										alt='Telefonos'
									/>
								</Col>
								<Col xs={12} sm={12} md={12} xl={12}>
									<h3 className='cv-profile-account-title-phone-type-account'>
										Cuentas de Negocios
									</h3>
									<img
										className='cv-profile-account-img-phone-type-account'
										src='https://i.ibb.co/c6FVtS2/Grupo-45.png'
										title='Telefonos'
										alt='Telefonos'
									/>
								</Col>
							</Row>,
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
