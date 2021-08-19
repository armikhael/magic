/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Form, Button, notification, Col, Card, Row } from 'antd'

import { CONSTANTS } from '../../../../../components/ServiceCommons/Constant'
import InputField from '../../../../../components/Form/Input'
import SelectField from '../../../../../components/Form/Select'
import TextAreaField from '../../../../../components/Form/TextArea'
import { serviceGetCategories } from '../../../../../components/ServiceCommons/GetCategory'
import { serviceGetCountry } from '../../../../../components/ServiceCommons/GetCountry'
import { serviceGetRedSocial } from '../../../../../components/ServiceCommons/GetRedSocial'

import UploadImage from '../../../components/UploadImage'
import UploadCover from '../../../components/UploadCover'

import { serviceGetData, serviceUpdateData } from './services'

const AccountBiography = (props) => {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [isEdit, setEdit] = useState(false)
	const [categories, setCategories] = useState([])
	const [countries, setCountries] = useState([])
	const [redSocial, setRedSocial] = useState([])
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

		const responseRedSocial = await serviceGetRedSocial()
		const filterRedSocial = responseRedSocial.filter((iterator) => {
			return iterator.name === response.type
		})
		const mapRedSocial = filterRedSocial.map((iterator) => {
			return {
				name: iterator.label,
				value: iterator.name,
			}
		})
		setRedSocial([...mapRedSocial])
		setCode(response.code)
		setImageProfile(response.image)
		setImageCover(response.image_cover)
		setEdit(true)
	}

	useEffect(() => {
		if (props.match.params.modify) {
			setIsModify(true)
			setButtonText('Actualizar')
		}
		fetchData(props.match.params.name)
		serviceGetCategories().then((data) => {
			let result = data.map((item) => {
				return {
					value: item.name,
					name: item.name,
				}
			})
			setCategories([...result])
		})

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

		setRedSocial([...CONSTANTS.RED_SOCIAL])
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
				if (isModify === false && response.data.followers <= CONSTANTS.MIN_FOLLOWERS) {
					history.push(`/profile/account-details/${response.data.name}`)
				} else if (isModify === false && response.data.followers > CONSTANTS.MIN_FOLLOWERS) {
					history.push(`/profile/account-plans/${response.data.name}`)
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
				<Row justify='center'>
					<Col xs={23} sm={20} xl={12}>
						<div className='cv-account-wizzard-content'>
							<Card
								className='cv-account-wizzard-card mt20'
								title='Datos de la cuenta (2/4)'
								bordered={false}>
								<Form form={form} initialValues={data} onFinish={handleOnFinish}>
									<div className='ph-auth-login-form-container'>
										<SelectField
											componentClass={'cv-auth-login-field-input'}
											componentLabel={'Red Social'}
											componentName={'type'}
											componentMode={'single'}
											componentPlaceholder={'Seleccione una opción'}
											componentOptions={redSocial}
											componentDisabled={isEdit}
											componentRules={'rulesSelect'}
										/>
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
											componentRules={'rulesFollowers'}
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
											componentClass={'cv-auth-login-field-input'}
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
											componentClass={'cv-auth-login-field-input'}
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
									<Row>
										<Col sm={12} md={12} className='cv-profile-upload-image p10'>
											Imagen de Pefil (Obligatoria)
											<UploadImage account={data} componentHandle={handleSetImageProfile} />
										</Col>
										<Col sm={12} md={12} className='cv-profile-upload-image p10'>
											Imagen de Portada (Obligatoria)
											<UploadCover account={data} componentHandle={handleSetImageCover} />
										</Col>
									</Row>
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
