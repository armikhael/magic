/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Divider, List, Typography, Card, notification } from 'antd'
import { LinkOutlined, DeleteOutlined } from '@ant-design/icons'

import InputField from '../../../../../components/Form/Input'

import { serviceGetData, serviceUpdateData } from './services'
import './style.css'

export default function LinkTreeUrl(props) {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [isModify, setIsModify] = useState(false)
	const [buttonText, setButtonText] = useState('Finalizar')
	const [links, setLinks] = useState([])

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		console.log('response', response.data[0])
		setData(response.data[0])
		setLinks(response.data[0].links)
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

	const handleAddElement = (item) => {
		setLinks((links) => [...links, { title: item.title, url: item.url }])
		form.resetFields(['title', 'url'])
	}

	const handleDelete = (e) => {
		setLinks(
			links.filter((item, key) => {
				return key !== e
			})
		)
	}
	const handleSubmit = () => {
		let item = data
		item.links = links
		console.log(item)
		serviceUpdateData(item).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				console.log(response.data.name)
				if (isModify === false) {
					notification['success']({
						message: `Felicidades!`,
						description: `Ahora te mostraremos como se ven tus enlaces`,
					})
					setTimeout(() => {
						history.push(`/${response.data.name}`)
					}, 2000)
				} else {
					history.push(`/profile`)
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
					<Card
						className='cv-account-wizzard-card mt20'
						title='Enlaces Perconalizados (3/3)'
						bordered={false}>
						<Form form={form} initialValues={data} onFinish={handleAddElement}>
							<div className='ph-auth-login-form-container'>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'title'}
									componentLabel={'Titulo del Enlace'}
									componentRules={'required'}
									componentPlaceholder={'Nombre del enlace'}
									componentType={'text'}
									componentValue={data.title}
								/>

								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'url'}
									componentLabel={'Enlace Externo'}
									componentRules={'required'}
									componentPlaceholder={'Copia el link aquí'}
									componentType={'text'}
									componentValue={data.url}
								/>
							</div>
							<Divider></Divider>
							<Form.Item>
								<Button
									htmlType={'submit'}
									className={'cv-linktree-button-submit cv-linktree-button-add'}>
									Agregar
								</Button>
								<div className='cv-right'>
									<Button
										className={'cv-linktree-button-submit'}
										onClick={() => {
											handleSubmit()
										}}>
										{buttonText}
									</Button>
								</div>
							</Form.Item>
						</Form>
					</Card>

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
				</div>
			)}
		</>
	)
}
