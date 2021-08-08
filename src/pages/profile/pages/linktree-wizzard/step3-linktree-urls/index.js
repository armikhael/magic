/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Card, notification, Row, Col } from 'antd'
import { LinkOutlined, DeleteOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { CONSTANTS } from '../../../../../components/ServiceCommons/Constant'
import InputField from '../../../../../components/Form/Input'
import RadioField from '../../../../../components/Form/Radio'
import TextAreaField from '../../../../../components/Form/TextArea'

import { serviceGetData, serviceUpdateData } from './services'
import './style.css'

export default function LinkTreeUrl(props) {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [buttonText, setButtonText] = useState('Siguiente')
	const [links, setLinks] = useState([])
	const [isModify, setIsModify] = useState(false)
	const [radio, setRadio] = useState('web')
	const [textButton, setTextButton] = useState('Agregar enlace')

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		console.log('response', response.data[0])
		response.data[0].type = 'web'
		setData(response.data[0])
		const newLinks = response.data[0].links.map((item, key) => {
			return {
				id: key.toString(),
				title: item.title,
				url: item.url,
			}
		})
		setLinks(newLinks)
	}

	useEffect(() => {
		if (props.match.params.modify) {
			setButtonText('Actualizar')
			setIsModify(true)
		}
		console.log(props.match.params.name)
		fetchData(props.match.params.name)
		console.log('useEffects')
	}, [props])

	const handleAddElement = (item) => {
		console.log(item)
		if (item.type === 'whatsapp') {
			setLinks((links) => [
				...links,
				{
					id: links.length,
					title: item.title,
					url: `https://api.whatsapp.com/send?phone=${item.number}&text=${item.message}`,
				},
			])
			form.resetFields(['message', 'title'])
		} else {
			setLinks((links) => [...links, { id: links.length, title: item.title, url: item.url }])
			form.resetFields(['title', 'url'])
		}
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
				if (isModify === false) {
					history.push(`/profile/linktree-color/${response.data.name}`)
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

	const handleOnDragEnd = (result) => {
		if (!result.destination) return
		const items = Array.from(links)
		const [reOrderItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reOrderItem)
		setLinks(items)
		let item = data
		item.links = items
		console.log(item)
		serviceUpdateData(item)
	}

	return (
		<>
			{data !== undefined && (
				<Row justify='center'>
					<Col xs={23} sm={20} xl={10}>
						<div className='cv-account-wizzard-content'>
							<Card
								className='cv-account-wizzard-card mt20'
								title='Enlaces Personalizados (3/3)'
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
										<RadioField
											componentClass={'cv-auth-login-field-input'}
											componentLabel={'¿Que tipo de link es?'}
											componentName={'type'}
											componentButtonStyle={'solid'}
											componentOptions={[...CONSTANTS.TYPE_LINK]}
											componentDefaultValue={'web'}
											componentOnChange={(e) => {
												console.log(e.target.value)
												setRadio(e.target.value)
												if (e.target.value === 'whatsapp') {
													setTextButton('Generar enlace de WhatsApp')
												} else {
													setTextButton('Agregar Enlace')
												}
											}}
										/>

										{radio === 'whatsapp' && (
											<>
												<InputField
													componentClass={'cv-auth-login-field-input'}
													componentName={'number'}
													componentLabel={
														'Coloca tu número aquí con el código de área de tu país'
													}
													componentRules={'rulesPhone'}
													componentPlaceholder={'Ingresa tu número de WhatsApp'}
													componentType={'text'}
													componentValue={''}
												/>
												<p>Ejemplo: 56999999999</p>

												<TextAreaField
													componentClass={'cv-auth-login-field-input'}
													componentName={'message'}
													componentLabel={'Mensaje para WhatsApp'}
													componentPlaceholder={
														'Escribe un mensaje personalizado para que sepas que necesita tu cliente'
													}
													componentRows={4}
													componentRules={'required'}
													componentValue={data.description}
												/>
												<p>Ejemplo: Hola! me interesaría recibir su catálogo</p>
											</>
										)}

										{radio !== 'whatsapp' && (
											<>
												<InputField
													componentClass={'cv-auth-login-field-input'}
													componentName={'url'}
													componentLabel={`Coloca aquí tu enlace`}
													componentRules={'required'}
													componentPlaceholder={'Copia tu link aquí'}
													componentType={'text'}
													componentValue={data.url}
												/>
												<p>Ejemplo: https://www.cuentasvirales.com/</p>
											</>
										)}
									</div>
									<Form.Item>
										<Button
											htmlType={'submit'}
											className={'cv-linktree-button-submit cv-linktree-button-add'}>
											{textButton}
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

							<Card
								className='cv-linktree-card mt20'
								title={`Cantidad de Enlaces: ${links.length}`}
								bordered={false}>
								<DragDropContext onDragEnd={handleOnDragEnd}>
									<Droppable droppableId='characters'>
										{(provided) => (
											<ul
												className='characters'
												{...provided.droppableProps}
												ref={provided.innerRef}>
												{links.map((item, key) => {
													return (
														<Draggable
															key={item.id.toString()}
															draggableId={item.id.toString()}
															index={key}>
															{(provided) => (
																<li
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}>
																	<div className='characters-thumb'>
																		<img
																			src={
																				'https://i.postimg.cc/YSQXZWCP/logo.jpg'
																			}
																			alt={`${item.title} Thumb`}
																		/>
																	</div>
																	<p>{item.title}</p>
																	<Button
																		type='link'
																		shape='round'
																		icon={<LinkOutlined />}
																		onClick={() => {
																			window.open(item.url)
																		}}>
																		Probar
																	</Button>

																	<Button
																		danger
																		type='link'
																		shape='round'
																		icon={<DeleteOutlined />}
																		onClick={() => {
																			handleDelete(key)
																		}}>
																		Eliminar
																	</Button>
																	<div className='characters-thumb'>
																		<img
																			src={
																				'https://i.ibb.co/NCmMyV7/drag-flick.png'
																			}
																			alt={`${item.title} Thumb`}
																		/>
																	</div>
																</li>
															)}
														</Draggable>
													)
												})}
												{provided.placeholder}
											</ul>
										)}
									</Droppable>
								</DragDropContext>
							</Card>
						</div>
					</Col>
				</Row>
			)}
		</>
	)
}
