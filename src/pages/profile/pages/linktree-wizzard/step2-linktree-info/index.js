/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Form, Button, notification, Col, Card, Row, Divider } from 'antd'

import InputField from '../../../../../components/Form/Input'
import TextAreaField from '../../../../../components/Form/TextArea'
import UploadOneImage from '../../../../../components/UploadOneImage'

import { serviceGetData, serviceUpdateData } from './services'
import './style.css'

export default function LinkTreeInfo(props) {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [isModify, setIsModify] = useState(false)
	const [image, setImage] = useState(undefined)
	const [buttonText, setButtonText] = useState('Siguiente')

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		console.log('response', response.data[0])
		setData(response.data[0])
		setImage(response.data[0].image)
	}

	useEffect(() => {
		if (props.match.params.modify) {
			setIsModify(true)
			setButtonText('Actualizar')
		}
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
				<div className='cv-account-wizzard-content'>
					<Card className='cv-account-wizzard-card mt20' title='Mensaje de Bienvenida (2/3)' bordered={false}>
						<Form form={form} initialValues={data} onFinish={handleOnFinish}>
							<div className='ph-auth-login-form-container'>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'account'}
									componentLabel={'Nombre de tu cuenta'}
									componentRules={'required'}
									componentPlaceholder={'Ingresa el nombre a mostrar'}
									componentType={'text'}
									componentValue={data.account}
								/>
								<TextAreaField
									componentClass={'cv-auth-login-field-input'}
									componentName={'description'}
									componentLabel={'Escribe un mensaje de Bienvenida'}
									componentPlaceholder={'Escribe tu mensaje'}
									componentRows={4}
									componentRules={'required'}
									componentValue={data.description}
								/>
							</div>
							<Row>
								<Col sm={12} md={12} className='cv-profile-upload-image p10'>
									Imagen de Pefil
									<UploadOneImage
										componentData={data}
										componentHandle={(e) => {
											setImage(e)
										}}
									/>
								</Col>
							</Row>
							<Divider></Divider>
							<Form.Item className='cv-right'>
								<Button htmlType={'submit'} className={'cv-account-wizzard-button-submit'}>
									{buttonText}
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</div>
			)}
		</>
	)
}
