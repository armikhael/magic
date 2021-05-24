/** @format */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Divider, List, Typography } from 'antd'

import InputField from '../../../../components/Form/Input'

import { serviceGetData, serviceCreateData, serviceUpdateData } from './service'
import insterfaceForm from './interface'

const CreateLink = (props) => {
	const [form] = Form.useForm()
	const [param] = useState()
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
		if (isEdit === false) {
			await serviceCreateData(newData)
		} else {
			await serviceUpdateData(newData)
		}
	}

	return (
		<>
			{param !== undefined && <p>Parametro: {param}</p>}
			{data !== undefined && (
				<ul>
					<li>
						<Link to={`/profile/edit-link/${name}`}> Editar </Link>
					</li>
					<li>
						<Link to={'/profile/create-link'}> Crear </Link>
					</li>
					<li>
						<Form name='links' form={form} initialValues={data} onFinish={handleAddElement}>
							<div className='ph-auth-login-form-container'>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'name'}
									componentLabel={'Nombre del Enlace'}
									componentRule={true}
									componentPlaceholder={'Nombre del enlace'}
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
								<Button htmlType={'submit'} className={'cv-auth-login-main-button-submit'}>
									Agregar
								</Button>
								<Button
									className={'cv-auth-login-main-button-submit'}
									onClick={() => {
										handleSubmit()
									}}>
									Enviar
								</Button>
							</Form.Item>
						</Form>
					</li>
				</ul>
			)}
			<p>Regisros: {links.length}</p>
			<p>Tu enlace personalizado quedaría así: cuentasvirales.com/{name}</p>
			<Divider></Divider>
			{links.length > 0 && (
				<List
					header={<div>Enlaces Agregados</div>}
					bordered
					dataSource={links}
					renderItem={(item, key) => (
						<List.Item>
							<Typography.Text>
								{item.title} - {item.url}
							</Typography.Text>
							<Button
								danger
								type='link'
								shape='round'
								onClick={() => {
									handleDelete(key)
								}}>
								Eliminar
							</Button>
						</List.Item>
					)}
				/>
			)}
		</>
	)
}

export default CreateLink
