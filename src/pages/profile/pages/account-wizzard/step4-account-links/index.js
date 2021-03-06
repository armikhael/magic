/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Card, notification, Row, Col } from 'antd'
import { LinkOutlined, DeleteOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { CONSTANTS } from '../../../../../components/ServiceCommons/Constant'
import InputField from '../../../../../components/Form/Input'
import SelectField from '../../../../../components/Form/Select'
import RadioField from '../../../../../components/Form/Radio'
import TextAreaField from '../../../../../components/Form/TextArea'

import { serviceGetData, serviceUpdateData, serviceGetOptions } from './services'
import './style.css'

export default function AccountLinks(props) {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [buttonText, setButtonText] = useState('Siguiente')
	const [links, setLinks] = useState([])
	const [isModify, setIsModify] = useState(false)
	const [radio, setRadio] = useState('web')
	const [redSocial, setRedSocial] = useState([])
	const [textButton, setTextButton] = useState('Agregar enlace')

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		response.radio = 'web'
		setData(response)

		const responseOptions = await serviceGetOptions('red_social')
		const optionsMap = responseOptions.map((item, key) => {
			return {
				name: item.label,
				value: item.name,
			}
		})
		setRedSocial(optionsMap)

		const newLinks = response.links.map((item, key) => {
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
		console.log(links)
		if (item.radio === 'whatsapp') {
			console.log('whatsapp', item)

			setLinks((links) => [
				...links,
				{
					id: links.length,
					type: 'whatsapp',
					title: item.title,
					url: `https://api.whatsapp.com/send?phone=${item.number}&text=${item.message}`,
				},
			])
			form.resetFields(['message', 'title'])
		} else if (item.radio === 'social') {
			console.log('social', item)
			setLinks((links) => [
				...links,
				{
					id: links.length,
					type: item.type,
					title: item.title,
					url: item.url,
				},
			])
			form.resetFields(['type', 'title', 'url'])
		} else {
			console.log('web', item)

			setLinks((links) => [
				...links,
				{
					id: links.length,
					type: 'web',
					title: item.title,
					url: item.url,
				},
			])
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
		if (links.length <= 0) {
			notification['error']({
				message: `Ups!`,
				description: `No tienes ning??n enlace creado`,
			})
			return
		}
		let item = data
		item.links = links
		console.log(item)
		serviceUpdateData(item).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				if (isModify === false) {
					history.push(`/profile/account-finish/${response.data.name}`)
				} else {
					notification['success']({
						message: `Felicidades!`,
						description: `Se ha atualizado con ??xito`,
					})
					setTimeout(() => {
						history.push(`/profile/accounts`)
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
				<Row justify='center' className='cv-account-wizzard-global-content'>
					<Col xs={23} sm={20} xl={10} className='cv-account-wizzard-main-content'>
						<div className='cv-account-wizzard-content'>
							<Card
								className='cv-account-wizzard-card'
								title='Agrega tus redes sociales (4/4)'
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
											componentLabel={'??Que tipo de link es?'}
											componentName={'radio'}
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

										{radio === 'social' && (
											<>
												<SelectField
													componentClass={'cv-global-select-field-input'}
													componentLabel={'Red Social'}
													componentName={'type'}
													componentMode={'single'}
													componentPlaceholder={'Seleccione una opci??n'}
													componentOptions={[...redSocial]}
													componentRules={'rulesSelect'}
												/>
											</>
										)}

										{radio === 'whatsapp' && (
											<>
												<InputField
													componentClass={'cv-auth-login-field-input'}
													componentName={'number'}
													componentLabel={
														'Coloca tu n??mero aqu?? con el c??digo de ??rea de tu pa??s'
													}
													componentRules={'rulesPhone'}
													componentPlaceholder={'Ingresa tu n??mero de WhatsApp'}
													componentType={'text'}
													componentValue={''}
												/>
												<p className='cv-account-wizard-social-example-title'>
													Ejemplo: 56999999999
												</p>

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
												<p>Ejemplo: Hola! me interesar??a recibir su cat??logo</p>
											</>
										)}

										{radio !== 'whatsapp' && (
											<>
												<InputField
													componentClass={'cv-auth-login-field-input'}
													componentName={'url'}
													componentLabel={`Coloca aqu?? tu enlace`}
													componentRules={'required'}
													componentPlaceholder={'Copia tu link aqu??'}
													componentType={'text'}
													componentValue={data.url}
												/>
												<p className='cv-account-wizard-social-example-title'>
													Ejemplo: https://www.cuentasvirales.com/
												</p>
											</>
										)}
									</div>
									<Form.Item>
										<Button
											htmlType={'submit'}
											className={'cv-linktree-button-submit cv-linktree-button-add'}>
											{textButton}
										</Button>
									</Form.Item>

									<div className='cv-account-wizard-social-links-container'>
										<h3 className='cv-account-wizard-social-links-title'>{`Enlaces Agregados: ${links.length}`}</h3>
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
																			<p className='cv-account-wizard-social-links-list-title'>
																				{item.title}
																			</p>
																			<div className='cv-account-wizard-social-links-list-spacer'></div>
																			<Button
																				className='cv-account-wizard-social-links-button-test-container'
																				type='link'
																				shape='round'
																				icon={<LinkOutlined />}
																				onClick={() => {
																					window.open(item.url)
																				}}>
																				Probar
																			</Button>

																			<Button
																				className='cv-account-wizard-social-links-button-delete-container'
																				danger
																				type='link'
																				shape='round'
																				icon={<DeleteOutlined />}
																				onClick={() => {
																					handleDelete(key)
																				}}>
																				<span className='cv-account-wizard-social-links-button-delete'>
																					Eliminar
																				</span>
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
									</div>
									<Form.Item>
										<div className='mt25 cv-aling-right'>
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
						</div>
					</Col>
				</Row>
			)}
		</>
	)
}
