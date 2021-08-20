/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, notification, Card, Row, Col } from 'antd'

import InputField from '../../../../../components/Form/Input'
import SelectField from '../../../../../components/Form/Select'
import UploadImage from '../../../../../components/UploadImage'
import { serviceGetRedSocial } from '../../../../../components/ServiceCommons/GetRedSocial'

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
	const [type, setType] = useState()
	const [followers, setFollowers] = useState()

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
		item.name = `${item.account}-${item.type}`
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
				<Row justify='center'>
					<Col xs={23} sm={20} xl={10}>
						<div className='cv-account-wizzard-content'>
							<Card
								className='cv-account-wizzard-card mt100'
								title='Creación de la cuenta (1/4)'
								bordered={false}>
								<Form form={form} initialValues={data} onFinish={handleOnFinish}>
									<SelectField
										componentClass={'cv-auth-login-field-input'}
										componentLabel={'Red Social'}
										componentName={'type'}
										componentMode={'single'}
										componentPlaceholder={'Seleccione una opción'}
										componentOptions={redSocial}
										componentRules={'rulesSelect'}
										componentOnChange={(e) => setType(e)}
									/>

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
										componentRules={'rulesFollowers'}
										componentValue={data.followers}
										componentOnChange={(e) => setFollowers(e.target.value)}
									/>
									{name !== undefined && type !== undefined && followers >= 1000 && (
										<>
											<Row>
												Imagen de Pefil (obligatoria)
												<UploadImage
													componentName={`${name}-${type}`}
													componentHandle={(e) => {
														setImageProfile(e)
													}}
												/>
											</Row>
											<Row>
												Imagen de Portada (obligatoria)
												<UploadImage
													componentName={`${name}-${type}-cover`}
													componentHandle={(e) => {
														setImageCover(e)
													}}
												/>
											</Row>

											<a href='https://www.instagram.com/cuentasvirales/'>
												¿Problemas para cargar tus imágenes?
											</a>
										</>
									)}
									<Form.Item className='cv-right'>
										<Button htmlType={'submit'} className={'cv-account-wizzard-button-submit'}>
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