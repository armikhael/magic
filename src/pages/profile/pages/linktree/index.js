/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Divider, List, Typography, Card, notification } from 'antd'
import { LinkOutlined, DeleteOutlined } from '@ant-design/icons'

import Loading from '../../../../components/Loading/Loading'
import InputField from '../../../../components/Form/Input'

import { serviceGetData, serviceCreateData, serviceUpdateData } from './services'
import insterfaceForm from './interface'

import './style.css'

const LinkTree = (props) => {
	const history = useHistory()
	const [form] = Form.useForm()
	const [user] = useState(JSON.parse(localStorage.getItem('user')))
	const [data, setData] = useState()
	const [links, setLinks] = useState([])
	const [name, setName] = useState()
	const [isEdit, setEdit] = useState(false)
	const [isDisabled, setDisabled] = useState(false)

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		if (response === undefined) {
			alert('Error, ruta no encontrada')
		} else {
			setData(response)
			setLinks(response.links)
		}
	}

	useEffect(() => {
		if (props.match.params.name) {
			fetchData(props.match.params.name)
			setEdit(true)
			setDisabled(true)
			setName(props.match.params.name)
		} else {
			setData(insterfaceForm())
		}
		console.log('useEffects')
	}, [props])

	const handleDelete = (e) => {
		setLinks(
			links.filter((item, key) => {
				return key !== e
			})
		)
	}

	const handleAddElement = (item) => {
		setLinks((links) => [...links, { title: item.title, url: item.url }])
		form.resetFields(['title', 'url'])
	}

	const handleChangeName = (item) => {
		setName(item.target.value)
	}

	const handleSubmit = async () => {
		let newData = data
		newData.name = name
		newData.links = [...links]
		newData.email = user.email
		if (isEdit === false) {
			const response = await serviceCreateData(newData)
			if (response.statusCode === 200) {
				notification['success']({
					message: `¡Felicidades!`,
					description: `Tus enlaces personalizados han sido creados`,
				})

				setTimeout(() => {
					history.push(`/profile`)
				}, 1000)
			} else {
				notification['error']({
					message: `¡Ups!`,
					description: response.message,
				})
			}
		} else {
			await serviceUpdateData(newData)
		}
	}

	return (
		<>
			{data === undefined && <Loading />}
			{data !== undefined && (
				<>
					<div className='cv-linktree-content'>
						<Card className='cv-linktree-card mt20' title='Creación Enlaces Arañas' bordered={false}>
							<Form name='form' form={form} initialValues={data} onFinish={handleAddElement}>
								<div className='ph-auth-login-form-container'>
									<InputField
										componentClass={'cv-auth-login-field-input'}
										componentName={'name'}
										componentLabel={'Nombre Personalizado'}
										componentRule={true}
										componentPlaceholder={'Ejemplo: cuentasvirales'}
										componentType={'text'}
										componentRules={'rulesUser'}
										componentValue={data.name}
										componentOnChange={handleChangeName}
										componentDisabled={isDisabled}
									/>

									<InputField
										componentClass={'cv-auth-login-field-input'}
										componentName={'title'}
										componentLabel={'Nombre del enlace'}
										componentRule={true}
										componentPlaceholder={'Nombre del enlace'}
										componentType={'text'}
										componentRules={'required'}
										componentValue={data.title}
									/>
									<InputField
										componentClass={'cv-auth-login-field-input'}
										componentName={'url'}
										componentLabel={'Enlace'}
										componentRule={true}
										componentPlaceholder={'Enlace'}
										componentType={''}
										componentRules={'rulesUrl'}
										componentValue={data.url}
									/>
								</div>
								<Form.Item>
									<Button
										htmlType={'submit'}
										className={'cv-linktree-button-submit cv-linktree-button-add'}>
										Agregar
									</Button>
									<Divider></Divider>
									<div className='cv-right'>
										<Button
											className={'cv-linktree-button-submit'}
											onClick={() => {
												handleSubmit()
											}}>
											Enviar
										</Button>
									</div>
								</Form.Item>
							</Form>
						</Card>
					</div>

					<div className='cv-linktree-content'>
						<Card
							className='cv-linktree-card mt20'
							title={`Cantidad de Enlaces: ${links.length}`}
							bordered={false}>
							{links.length > 0 && (
								<List
									header={<div>Enlaces Agregados</div>}
									bordered
									dataSource={links}
									renderItem={(item, key) => (
										<List.Item
											actions={[
												<Button
													key={key}
													type='link'
													shape='round'
													icon={<LinkOutlined />}
													onClick={() => {
														window.open(item.url)
													}}>
													Ver
												</Button>,
												<Button
													key={key}
													danger
													type='link'
													shape='round'
													icon={<DeleteOutlined />}
													onClick={() => {
														handleDelete(key)
													}}>
													Eliminar
												</Button>,
											]}>
											<Typography.Text>{item.title} </Typography.Text>
										</List.Item>
									)}
								/>
							)}
						</Card>
					</div>
				</>
			)}
		</>
	)
}

export default LinkTree
