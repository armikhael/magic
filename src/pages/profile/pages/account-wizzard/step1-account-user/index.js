/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, notification, Card, Row, Col } from 'antd'

import InputField from '../../../../../components/Form/Input'
import SelectField from '../../../../../components/Form/Select'
import UploadImagesAlt from '../../../../../components/UploadImagesAlt'
import { serviceGetRedSocial } from '../../../../../components/ServiceCommons/GetRedSocial'
import { CONSTANTS } from '../../../../../components/ServiceCommons/Constant'

import { serviceCreateData } from './services'
import insterfaceForm from './interface'
import './style.css'

export default function AccountUser(props) {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [redSocial, setRedSocial] = useState([])
	const [user, setUser] = useState()
	const [imageProfile, setImageProfile] = useState(undefined)
	const [imageCover, setImageCover] = useState(undefined)
	const [name, setName] = useState()
	const [typeAccount, setTypeAccount] = useState()
	const [textImage, setTextImage] = useState('Imagen de Pefil')

	useEffect(() => {
		serviceGetRedSocial().then((response) => {
			const mapRedSocial = response.map((iterator) => {
				return {
					name: iterator.label,
					value: iterator.name,
				}
			})
			setRedSocial([...mapRedSocial])
		})
		setData(insterfaceForm())

		setUser(JSON.parse(localStorage.getItem('user')))
		console.log('useEffects')
	}, [props])

	const handleChangeImage = (e) => {
		console.log(e)
		setTypeAccount(e)
		if (e === 'personal') {
			setTextImage('Imagen de Perfil')
			setImageCover(undefined)
		} else {
			setTextImage('Su Logo')
			setImageCover(process.env.REACT_APP_LOGO)
		}
	}

	const handleOnFinish = (item) => {
		console.log('imageProfile', imageProfile)
		console.log('imageCover', imageCover)
		if (imageProfile === undefined || imageCover === undefined) {
			notification['error']({
				message: `Ups!`,
				description: `Aún falta cargar las imagenes solicitadas`,
			})
			return
		}

		item.email = user.email
		item.name =
			item.type !== undefined ? `${item.account}-${item.type}` : item.account
		item.image = imageProfile
		item.image_thumb = imageProfile
		item.image_cover = imageCover
		console.log(item)

		serviceCreateData(item).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				console.log(response.data.name)
				history.push(`/profile/account-biography/${response.data.name}`)
			} else {
				notification['error']({
					message: `Ups!`,
					description: `${response.message}`,
				})
			}
		})
	}

	return (
		<>
			{data !== undefined && (
				<Row justify='center' className='cv-account-wizzard-global-content'>
					<Col
						xs={23}
						sm={20}
						xl={10}
						className='cv-account-wizzard-main-content'>
						<div className='cv-account-wizzard-content'>
							<Card
								className='cv-account-wizzard-card'
								title='Reserva tu nombre (1/4)'
								bordered={false}>
								<Form
									form={form}
									initialValues={data}
									onFinish={handleOnFinish}>
									<SelectField
										componentClass={'cv-global-select-field-input'}
										componentLabel={'¿A qué te dedicas?'}
										componentName={'type_account'}
										componentMode={'single'}
										componentPlaceholder={'Seleccione una opción'}
										componentOptions={[...CONSTANTS.TYPE_ACCOUNT]}
										componentRules={'rulesSelect'}
										componentOnChange={handleChangeImage}
									/>

									{typeAccount === 'personal' && (
										<SelectField
											componentClass={'cv-global-select-field-input'}
											componentLabel={'Red Social'}
											componentName={'type'}
											componentMode={'single'}
											componentPlaceholder={'Seleccione una opción'}
											componentOptions={redSocial}
											componentRules={'rulesSelect'}
										/>
									)}

									<InputField
										componentClass={'cv-auth-login-field-input'}
										componentName={'account'}
										componentLabel={'Nombre de tu usuario'}
										componentRules={'rulesAccount'}
										componentPlaceholder={'Usuario'}
										componentType={'text'}
										componentValue={data.account}
										componentOnChange={(e) => setName(e.target.value)}
									/>

									<InputField
										componentClass={'cv-auth-login-field-input'}
										componentName={'followers'}
										componentLabel={'Cantidad de Seguidores'}
										componentPlaceholder={'Seguidores'}
										componentType={'text'}
										componentRules={'required'}
										componentValue={data.followers}
									/>

									{typeAccount !== undefined && (
										<>
											<UploadImagesAlt
												title={textImage}
												componentName={`${name}-${Date.now()}`}
												componentHandle={(e) => {
													setImageProfile(e)
												}}
											/>

											{typeAccount === 'personal' && (
												<>
													<UploadImagesAlt
														title={'Imagen de Portada'}
														componentName={`${name}-${Date.now()}-cover`}
														componentHandle={(e) => {
															setImageCover(e)
														}}
													/>
												</>
											)}

											{typeAccount === 'personal' && (
												<>
													<Card className='cv-account-wizzard-step1-content-card-example'>
														<Row>
															<Col xs={6} sm={6} xl={6}>
																<img
																	className='cv-profile-account-img-phone-type-account'
																	src='https://i.ibb.co/ngHy2q9/Grupo-46.png'
																	title='Telefonos'
																	alt='Telefonos'
																/>
															</Col>
															<Col xs={18} sm={18} xl={18} className='p20'>
																<h3>Cuenta de Influencer</h3>
																<p>
																	Asi luciria tu cuenta de influcer al terminar
																	todo el proceso, asi que animo y continua que
																	falta poco.
																</p>
															</Col>
														</Row>
													</Card>
												</>
											)}
											{typeAccount === 'business' && (
												<>
													<Card className='cv-account-wizzard-step1-content-card-example'>
														<Row>
															<Col xs={6} sm={6} xl={6}>
																<img
																	className='cv-profile-account-img-phone-type-account'
																	src='https://i.ibb.co/c6FVtS2/Grupo-45.png'
																	title='Telefonos'
																	alt='Telefonos'
																/>
															</Col>
															<Col xs={18} sm={18} xl={18} className='p20'>
																<h3>Cuenta de Empresa</h3>
																<p>
																	Asi luciria tu cuenta de Empresa al terminar
																	todo el proceso, asi que animo y continua que
																	falta poco.
																</p>
															</Col>
														</Row>
													</Card>
												</>
											)}
											<br />
											<br />
											<a href='https://www.instagram.com/cuentasvirales/'>
												¿Problemas para cargar tus imágenes?
											</a>
										</>
									)}

									<Form.Item className='mt25 cv-aling-right'>
										<Button
											htmlType={'submit'}
											className={'cv-account-wizzard-button-submit'}>
											Siguiente
										</Button>
									</Form.Item>
								</Form>
							</Card>
						</div>
					</Col>
				</Row>
			)}
		</>
	)
}
