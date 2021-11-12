/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Form, Button, notification, Col, Card, Row } from 'antd'

import InputField from '../../../../../components/Form/Input'
import SelectField from '../../../../../components/Form/Select'
import TextAreaField from '../../../../../components/Form/TextArea'
import { serviceGetCountry } from '../../../../../components/ServiceCommons/GetCountry'

import UploadImage from '../../../components/UploadImage'
import UploadCover from '../../../components/UploadCover'

import { serviceGetData, serviceUpdateData, serviceGetCategories } from './services'

const AccountBiography = (props) => {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [isEdit, setEdit] = useState(false)
	const [categories, setCategories] = useState([])
	const [countries, setCountries] = useState([])
	const [listCountry, setListCountry] = useState([])
	const [code, setCode] = useState()
	const [isModify, setIsModify] = useState(false)
	const [buttonText, setButtonText] = useState('Continuar')
	const [imageProfile, setImageProfile] = useState(undefined)
	const [imageCover, setImageCover] = useState(undefined)

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		console.log(response)
		setData(response)
		setCode(response.code)
		setImageProfile(response.image)
		setImageCover(response.image_cover)
		setEdit(true)
		serviceGetCategories(response.type_account).then((data) => {
			let result = data.map((item) => {
				return {
					value: item.name,
					name: item.name,
				}
			})
			setCategories([...result])
		})
	}

	useEffect(() => {
		if (props.match.params.modify) {
			setIsModify(true)
			setButtonText('Actualizar')
		}
		fetchData(props.match.params.name)
		serviceGetCountry().then((data) => {
			setListCountry(data)
			let result = data.map((item) => {
				return {
					value: item.name.toLowerCase(),
					name: item.name,
				}
			})
			setCountries([...result])
		})
		console.log('useEffects')
	}, [props])

	const handleChangeCountry = (item) => {
		const findCurrency = listCountry.find((iterator) => {
			return iterator.name.toLowerCase() === item
		})
		setCode(findCurrency.code)
	}

	const handleSetImageProfile = (item) => {
		console.log(item)
		setImageProfile(item)
		console.log('entro por props')
	}

	const handleSetImageCover = (item) => {
		console.log(item)
		setImageCover(item)
		console.log('entro por props')
	}

	const handleButtonSkip = () => {
		if (isModify === true) {
			return (
				<>
					<Button
						onClick={() => {
							history.push(`/profile/accounts`)
						}}
						className={'cv-account-wizzard-button-submit'}>
						Omitir
					</Button>
				</>
			)
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

		item._id = data._id
		item.code = code
		console.log(item)
		serviceUpdateData(item).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				console.log(response.data.name)
				if (isModify === false) {
					history.push(`/profile/account-links/${response.data.name}`)
				} else {
					history.push(`/profile/accounts`)
				}
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
					<Col xs={23} sm={20} xl={12} className='cv-account-wizzard-main-content'>
						<div className='cv-account-wizzard-content'>
							<Card className='cv-account-wizzard-card' title='Agrega tus datos (2/4)' bordered={false}>
								<Form form={form} initialValues={data} onFinish={handleOnFinish}>
									<div className='ph-auth-login-form-container'>
										<InputField
											componentClass={'cv-auth-login-field-input'}
											componentName={'account'}
											componentLabel={'Nombre de tu usuario'}
											componentRules={'rulesAccount'}
											componentPlaceholder={'Usuario'}
											componentType={'text'}
											componentValue={data.account}
											componentDisabled={isEdit}
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
										<TextAreaField
											componentClass={'cv-auth-login-field-input'}
											componentName={'biography'}
											componentLabel={'Biografía'}
											componentPlaceholder={'Resumen'}
											componentRows={4}
											componentRules={'required'}
											componentValue={data.biography}
										/>
										<SelectField
											componentClass={'cv-global-select-field-input'}
											componentLabel={'¿País de residencia?'}
											componentName={'country'}
											componentOnChange={handleChangeCountry}
											componentPlaceholder={'Seleccione una opción'}
											componentRules={'rulesSelect'}
											componentOptions={countries}
										/>
										<InputField
											componentClass={'cv-auth-login-field-input'}
											componentName={'phone'}
											componentLabel={'Número de Conacto'}
											componentPlaceholder={'WhatsApp'}
											componentType={'text'}
											componentRules={'rulesPhone'}
											componentValue={data.phone}
										/>
										<SelectField
											componentClass={'cv-global-select-field-input'}
											componentLabel={'Categorías'}
											componentName={'categories'}
											componentMode={'single'}
											componentPlaceholder={'Seleccione una opción'}
											componentOptions={categories}
											componentRules={'rulesSelect'}
											componentMaxTagCount={5}
										/>
										<TextAreaField
											componentClass={'cv-auth-login-field-input'}
											componentName={'faq'}
											componentLabel={'Términos y Condiciones (Opcional)'}
											componentPlaceholder={'Coloca tu condiciones'}
											componentRows={4}
											componentValue={data.faq}
										/>
									</div>
									<Row className='cv-account-wizzard-upload-image-container'>
										<Col xs={10} sm={10} md={8}>
											<UploadImage account={data} componentHandle={handleSetImageProfile} />
										</Col>
										<Col xs={14} sm={14} md={16}>
											<div className='cv-account-wizzard-upload-image-mobile-title-container'>
												<div>
													<h3 className='cv-account-wizzard-upload-image-mobile-title'>
														Imagen de Perfil
													</h3>
													<h3 className='cv-account-wizzard-upload-image-mobile-subtitle'>
														Click en el recuadro
													</h3>
													<h3 className='cv-account-wizzard-upload-image-mobile-description'>
														(obligatoria)
													</h3>
												</div>
											</div>
										</Col>
									</Row>
									{data.type_account === 'personal' && (
										<Row className='cv-account-wizzard-upload-image-container'>
											<Col xs={10} sm={10} md={8}>
												<UploadCover account={data} componentHandle={handleSetImageCover} />
											</Col>
											<Col xs={14} sm={14} md={16}>
												<div className='cv-account-wizzard-upload-image-mobile-title-container'>
													<div>
														<h3 className='cv-account-wizzard-upload-image-mobile-title'>
															Imagen de Portada
														</h3>
														<h3 className='cv-account-wizzard-upload-image-mobile-subtitle'>
															Click en el recuadro
														</h3>
														<h3 className='cv-account-wizzard-upload-image-mobile-description'>
															(obligatoria)
														</h3>
													</div>
												</div>
											</Col>
										</Row>
									)}
									<Form.Item className='cv-right'>
										<Button htmlType={'submit'} className={'cv-account-wizzard-button-submit'}>
											{buttonText}
										</Button>
										{handleButtonSkip()}
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

export default AccountBiography
