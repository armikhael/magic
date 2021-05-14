/** @format */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Divider, List, Typography } from 'antd'

import InputField from '../../../../components/Form/Input'

import { serviceGetData, serviceCreateData, serviceUpdateData } from './service'
import insterfaceForm from './interface'

const CreateLink = (props) => {
	const [param] = useState()
	const [data, setData] = useState()
	const [isLink, setLink] = useState([])
	const [isName, setName] = useState()
	const [isEdit, setEdit] = useState(false)
	const [isDisabled, setDisabled] = useState(false)

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		console.log(response)
		if (response === undefined) {
			alert('Error, ruta no encontrada')
		} else {
			setData(response)
			setLink(response.links)
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
		setLink(
			isLink.filter((item, key) => {
				return key !== e
			})
		)
	}

	const handleAddElement = (item) => {
		console.log('onFinish', item)
		setLink((isLink) => [...isLink, { title: item.title, url: item.url }])
	}

	const handleChangeName = (item) => {
		setName(item.target.value)
	}
	const handleSubmit = async () => {
		let newData = data
		newData.name = isName
		newData.links = [...isLink]
		if (isEdit === false) {
			console.log('creando')
			console.log(newData)
			const response = await serviceCreateData(newData)
			console.log('response creando', response)
		} else {
			console.log('editando')
			console.log(newData)
			const response = await serviceUpdateData(newData)
			console.log('response editando', response)
		}
	}

	return (
		<>
			{param !== undefined && <p>Parametro: {param}</p>}
			{data !== undefined && (
				<ul>
					<li>
						<Link to={`/profile/edit-link/${isName}`}> Editar </Link>
					</li>
					<li>
						<Link to={'/profile/create-link'}> Crear </Link>
					</li>
					<li>
						<Form name='normal_login' initialValues={data} onFinish={handleAddElement}>
							<div className='ph-auth-login-form-container'>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'name'}
									componentLabel={'Nombre del Enlace'}
									componentRule={true}
									componentMessage={'Nombre del enlace'}
									componentType={'text'}
									componentIcon={''}
									componentRules={'required'}
									componentValue={data.name}
									componentChange={handleChangeName}
									componentDisabled={isDisabled}
								/>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'title'}
									componentLabel={'Nombre del enlace'}
									componentRule={true}
									componentMessage={'Nombre del enlace'}
									componentType={'text'}
									componentIcon={''}
									componentRules={'required'}
									componentValue={data.title}
								/>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'url'}
									componentLabel={'Enlace'}
									componentRule={true}
									componentMessage={'Enlace'}
									componentType={''}
									componentIcon={''}
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
			<p>Regisros: {isLink.length}</p>
			<p>Tu enlace personalizado quedaría así: cuentasvirales.com/{isName}</p>
			<Divider></Divider>
			{isLink.length > 0 && (
				<List
					header={<div>Enlaces Agregados</div>}
					bordered
					dataSource={isLink}
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
