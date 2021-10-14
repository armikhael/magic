/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, notification, Col, Card, Row } from 'antd'

import InputField from '../../../../../components/Form/Input'
import SelectField from '../../../../../components/Form/Select'
import TextAreaField from '../../../../../components/Form/TextArea'
import UploadOneImage from '../../../../../components/UploadOneImage'

import { serviceGetData, serviceUpdateData, serviceGetCategories } from './services'
import './style.css'

export default function LinkTreeInfo(props) {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [isModify, setIsModify] = useState(false)
	const [image, setImage] = useState(undefined)
	const [buttonText, setButtonText] = useState('Siguiente')
	const [categories, setCategories] = useState([])

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		console.log('response', response.data[0])
		setData(response.data[0])
		if (response.data[0].image) {
			setImage(response.data[0].image)
		}
	}

	useEffect(() => {
		if (props.match.params.modify) {
			setIsModify(true)
			setButtonText('Actualizar')
		}

		serviceGetCategories().then((data) => {
			let result = data.map((item) => {
				return {
					value: item.name,
					name: item.name,
				}
			})
			setCategories([...result])
		})

		console.log(props.match.params.name)
		fetchData(props.match.params.name)
		console.log('useEffects')
	}, [props])

	const handleOnFinish = (item) => {
		if (image === undefined) {
			notification['error']({
				message: `Ups!`,
				description: `Aún falta cargar las imagen solicitada`,
			})
			return
		}

		item._id = data._id
		item.image = image
		console.log(item)

		serviceUpdateData(item).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				console.log(response.data.name)
				if (isModify === false) {
					history.push(`/profile/linktree-urls/${response.data.name}`)
				} else {
					notification['success']({
						message: `Felicidades!`,
						description: `Se ha atualizado con éxito`,
					})
					setTimeout(() => {
						history.push(`/profile/linktree`)
					}, 2000)
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
					<Col xs={23} sm={20} xl={10}>
						<div className='cv-account-wizzard-content'>
							<Card
								className='cv-account-wizzard-card mt20'
								title='Información de tu negocio (2/3)'
								bordered={false}>
								<Form form={form} initialValues={data} onFinish={handleOnFinish}>
									<div className='ph-auth-login-form-container'>
										<InputField
											componentClass={'cv-auth-login-field-input'}
											componentName={'account'}
											componentLabel={'Nombre de tu empresa'}
											componentRules={'required'}
											componentPlaceholder={'Ingresa el nombre a mostrar'}
											componentType={'text'}
											componentValue={data.account}
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
											componentName={'description'}
											componentLabel={'Resumen de tu empresa'}
											componentPlaceholder={'Una pequeña biografía'}
											componentRows={4}
											componentRules={'required'}
											componentValue={data.description}
										/>
									</div>
									<Row>
										Imagen de Perfil
										<UploadOneImage
											componentData={data}
											componentHandle={(e) => {
												setImage(e)
											}}
										/>
									</Row>
									<Form.Item className='cv-right'>
										<Button htmlType={'submit'} className={'cv-account-wizzard-button-submit'}>
											{buttonText}
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
