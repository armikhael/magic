/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Divider, Card, notification } from 'antd'
import { LinkOutlined, DeleteOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import InputField from '../../../../../components/Form/Input'

import { serviceGetData, serviceUpdateData } from './services'
import './style.css'

export default function LinkTreeUrl(props) {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [buttonText, setButtonText] = useState('Finalizar')
	const [links, setLinks] = useState([])

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		console.log('response', response.data[0])
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
		}
		console.log(props.match.params.name)
		fetchData(props.match.params.name)
		console.log('useEffects')
	}, [props])

	const handleAddElement = (item) => {
		setLinks((links) => [...links, { id: links.length, title: item.title, url: item.url }])
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
				notification['success']({
					message: `Felicidades!`,
					description: `Tus enlaces han sido actualizados`,
				})
				setTimeout(() => {
					history.push(`/profile`)
				}, 2000)
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
							<DragDropContext onDragEnd={handleOnDragEnd}>
								<Droppable droppableId='characters'>
									{(provided) => (
										<ul className='characters' {...provided.droppableProps} ref={provided.innerRef}>
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
																		src={'https://i.postimg.cc/YSQXZWCP/logo.jpg'}
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
																	Ver
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
				</div>
			)}
		</>
	)
}
