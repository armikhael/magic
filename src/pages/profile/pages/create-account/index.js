/** @format */

import React from 'react'
import { Redirect } from 'react-router-dom'

import {
	Form,
	Select,
	Button,
	Input,
	Layout,
	Row,
	Col,
	Card,
	notification,
	List,
	Typography,
	Divider,
} from 'antd'
import { RocketOutlined, DeleteOutlined } from '@ant-design/icons'

import { rules } from '../../../../components/ServiceCommons/Rules'
import { config } from '../../../../components/ServiceCommons/Config'
import { serviceGetCountry } from '../../../../components/ServiceCommons/GetCountry'
import { serviceGetCategories } from '../../../../components/ServiceCommons/GetCategory'

import ModalsContact from './components/ModalsContact'
import ModalsVerification from './components/ModalVerification'

import './style.css'
import { serviceSaveAccount } from './services'

const { Option } = Select
const { TextArea } = Input
const { Content, Header } = Layout

class CreateAccount extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			itemsCaegories: 5,
			userProfile: null,
			auxPrice: null,
			plans: [],
			agree: false,
			responseCategories: [],
			modalsContact: false,
			modalsVerification: false,
			countries: [],
			quantity: config.quantityPost,
			timeContcept: config.times,
			socialNet: config.socialNet,
			concepts: config.typeOfPost,
			currency: 'Dólares',
		}
	}

	async componentDidMount() {
		console.log('Hola Mundo')
		this.setState({ auxTime: this.state.timeContcept[this.state.quantity[0]] })
		if (localStorage.getItem('user')) {
			this.setState({
				userProfile: JSON.parse(localStorage.getItem('user')),
			})
		}
		await serviceGetCategories().then((data) => {
			let result = data.map((item) => {
				return {
					value: item.name,
				}
			})
			this.setState({ responseCategories: result })
		})

		await serviceGetCountry().then((data) => {
			let result = data.map((item) => {
				return {
					code: item.code,
					name: item.name,
					label: item.name,
					currency: item.currency,
				}
			})
			console.log('country', result)
			this.setState({ countries: result })
		})
	}

	handleSubmit = async () => {
		let body = {
			email: this.state.userProfile.email,
			account: `${this.state.name.trim()}`,
			followers: `${this.state.followers}`,
			name: `${this.state.name.trim()}-${this.state.type}`,
			type: this.state.type,
			biography: this.state.biography,
			image: process.env.REACT_APP_LOGO,
			categories: this.state.categories,
			plans: this.state.plans,
			phone: this.state.phone,
			code: this.state.code,
			country: this.state.country,
		}

		console.log(Object.keys(body))
		console.log(body)
		return 
		for (let i = 0; i < Object.keys(body).length; i++) {
			let value = Object.keys(body)[i]
			if (body[value] === undefined || body[value].length <= 0) {
				notification['warning']({
					message: `Formulario`,
					description: 'Debe rellenar todos los campos.',
				})
				return
			}
		}
		await serviceSaveAccount(body).then((data) => {
			if (data.statusCode !== 200) {
				notification['error']({
					message: `Ups!`,
					description: `${data.message}`,
				})
				return
			}

			notification['success']({
				message: `Good job!!`,
				description: `La cuenta se ha registrado satisfactoriamente`,
			})

			this.setState({
				redirect: true,
				accountParam: body.name,
			})
		})
	}

	handleChangeInput = (e) => {
		console.log('write', e.target.name, e.target.value)
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	handleChangeCountry = (e) => {
		e = JSON.parse(e)
		console.log(e)
		this.setState({
			country: e.name,
			code: e.code,
			currency: e.currency,
		})
	}

	handleButtonPlans = () => {
		if (
			this.state.selectQuantityConcept === null ||
			this.state.selectConcept === null ||
			this.state.auxPrice === null
		) {
			notification['error']({
				message: `Ups!`,
				description: `Debe rellenar los datos correspondientes`,
			})
			return
		}
		let arrayPlans = this.state.plans
		arrayPlans.push({
			description: `${this.state.selectQuantityConcept} ${this.state.selectConcept}`,
			price: this.state.auxPrice,
			currency: this.state.currency,
		})
		this.setState({
			plans: arrayPlans,
		})
		console.log(this.state.plans)
	}

	handleDelete = (e) => {
		this.state.plans.splice(e, 1)
		this.setState({
			plans: this.state.plans,
		})
	}

	handleCloseModalsConctac = () => {
		this.setState({ modalsContact: false })
	}

	handleCloseModalsVerification = () => {
		this.setState({ modalsVerification: false })
	}

	handleSelect = (e) => {
		console.log(e.option, e.value)
		if (e.option === 'categories' && e.value.length > this.state.itemsCaegories) {
			notification['error']({
				message: `Ups!`,
				description: `Sólo puede agregar hasta ${this.state.itemsCaegories} categorías`,
			})
			return
		}

		this.setState({
			[e.option]: e.value,
		})
	}

	handleSelectType = (e) => {
		console.log(e.option, e.value)
		this.setState({
			[e.option]: e.value.toLowerCase(),
			conceptsSelected: this.state.concepts[e.value.toLowerCase()],
			plans: [],
			selectConcept: this.state.concepts[e.value.toLowerCase()][0]
		})
	}

	render() {
		return (
			<>
				<ModalsContact
					modalsContact={this.state.modalsContact}
					handleCloseModalsConctac={this.handleCloseModalsConctac}
				/>

				<ModalsVerification
					modalsVerification={this.state.modalsVerification}
					handleCloseModalsVerification={this.handleCloseModalsVerification}
				/>

				<Layout>
					<Content>
						<Header className='cv-perfil-title-main-container'>
							<RocketOutlined className='cv-perfil-title-main-icon' />
							<h3 className='cv-perfil-title-main-title'>Crear cuenta</h3>
						</Header>
					</Content>
				</Layout>
				<section className='cv-create-account-section-max'>
					<Content className='cv-create-account-content-max'>
						<Layout>
							<Form
								onFinish={this.handleSubmitLogin}
								labelCol={{ span: 24 }}
								wrapperCol={{ span: 24 }}
								layout='vertical'>
								<Row>
									<Col xs={24} sm={24} md={12}>
										<h3 className='cv-create-account-from-title'>Usuario</h3>
										<Card className='cv-create-account-card-custom'>
											<Form.Item 
												name='type'
												label='Tipo de cuenta'
												rules={rules.rulesSelect}>																				
												<Select 
													onChange={(e) => this.handleSelectType({ option: 'type', value: e })}
													placeholder='Seleccionar'>
													{this.state.socialNet.map((item) => (
														<Option key={item}>{item}</Option>
													))}
												</Select>
											</Form.Item>
											<Form.Item
												name='name'
												label={`Escriba su usuario sin el "@"`}
												rules={rules.rulesAccount}
												onChange={this.handleChangeInput}>
												<Input name='name' />
											</Form.Item>
											<Form.Item
												name='followers'
												label='¿Cuantos seguidores tienes?'
												rules={rules.rulesFollowers}
												onChange={this.handleChangeInput}>
												<Input name='followers' />
											</Form.Item>
											<Form.Item
												name='biography'
												label='Biografía (Describe tu personalidad)'
												rules={rules.required}
												onChange={this.handleChangeInput}>
												<TextArea rows={4} name='biography' />
											</Form.Item>
										</Card>
									</Col>
								</Row>
								<Row>
									<Col xs={24} sm={24} md={12}>
										<h3 className='cv-create-account-from-title'>Información</h3>
										<Card className='cv-create-account-card-custom'>
											<Form.Item
												name='country'												
												label='¿En que país te encuentras actualmente?'
												rules={rules.rulesSelect}>
												<Select 
													onChange={this.handleChangeCountry}
													placeholder='Seleccionar'>
													{this.state.countries.map((item, i) => {
														return (
															<Option
																style={{ textTransform: 'capitalize' }}
																key={i}
																value={JSON.stringify({
																	code: item.code,
																	name: item.name,
																	currency: item.currency,
																})}>
																{item.label}
															</Option>
														)
													})}
												</Select>
											</Form.Item>
											<a
												rel='noopener noreferrer'
												target='_blank'
												href={`${process.env.REACT_APP_WHATSAPP}?phone=${process.env.REACT_APP_CONTACT}&text=Hola,+quisiera+solicitar+una+nuevo+país: `}>
												Si tu país NO se encuentra en el listado... Escríbenos
											</a>
											<Form.Item
												label='Coloca tú número de WhatsApp'
												name='phone' 
												rules={rules.rulesPhone}
												onChange={this.handleChangeInput}>
												<Input name='phone' />
											</Form.Item>
												WhatsApp ->{' '}
												<a
													rel='noopener noreferrer'
													target='_blank'
													href={`${process.env.REACT_APP_WHATSAPP}?phone=${this.state.code}${this.state.phone}&text=Hola%20${this.state.name}%20este%20es%20un%20mensaje%20de%20prueba`}>
													{this.state.code}
													{this.state.phone}
												</a>
											<Form.Item
												label='Elige hasta 5 categorías que más se asocien a tu cuenta'
												name='categories'
												rules={rules.rulesSelect}>
												<Select
													style={{ width: '100%' }}
													onChange={(e) => this.handleSelect({ option: 'categories', value: e })}
													mode='multiple'
													showArrow
													maxTagCount={5}
													placeholder='Seleccionar'>
													{this.state.responseCategories.map((item, i) => {
														return (
															<Option
																style={{ textTransform: 'capitalize' }}
																key={i}
																value={item.value}>
																{item.value}
															</Option>
														)
													})}
												</Select>
											</Form.Item>
											<a
												rel='noopener noreferrer'
												target='_blank'
												href={`${process.env.REACT_APP_WHATSAPP}?phone=${process.env.REACT_APP_CONTACT}&text=Hola,+quisiera+solicitar+una+nueva+categoría: `}>
												Si tu categoría NO se encuentra en el listado... Escríbenos
											</a>
										</Card>
									</Col>
								</Row>

								{this.state.conceptsSelected &&
								<Row>
									<Col xs={24} sm={24} md={12}>
										<h3 className='cv-create-account-from-title'>
											Informa el precio de tus servicios
										</h3>
										<Card className='cv-create-account-card-custom'>							
											<Row>												
												<Col span={24}>
													<p>¿Cuáles son tus tarifas publicitarios?</p>
													<Form.Item label='Ejemplo: 2 Historias'>
														<Select
															placeholder='Seleccionar'
															style={{ width: '30%' }}
															onChange={(e) =>
																this.handleSelect({ option: 'selectQuantityConcept', value: e })
															}>
															{this.state.quantity.map((item) => (
																<Option key={item} value={item}>
																	{item}
																</Option>
															))}
														</Select>
														
														<Select
															placeholder='Seleccionar'
															style={{ width: '70%' }}
															onChange={(e) =>
																this.handleSelect({ option: 'selectConcept', value: e })
															}>
															{this.state.conceptsSelected.map((item) => (
																<Option key={item}>{item}</Option>
															))}
														</Select>
													</Form.Item>
													<Form.Item
														label={`Precio en ${this.state.currency}`}
														name='price' 
														onChange={this.handleChangeInput}
														rules={rules.rulesPrice}>
														<Input name='auxPrice' placeholder={`${this.state.currency}`} />
													</Form.Item>													
													<div className='cv-create-account-btn-add-content'>
														<Button type='primary' shape='round' onClick={this.handleButtonPlans}>
															AGREGAR
														</Button>
													</div>
													<Divider></Divider>
													<List
														header={<div>Tarifas agregadas</div>}
														bordered
														dataSource={this.state.plans}
														renderItem={(item, key) => (
															<List.Item>
																<Typography.Text>
																	{item.description} por {item.price} {item.currency}
																</Typography.Text>
																<Button
																	danger
																	type='link'
																	shape='round'
																	onClick={() => {
																		this.handleDelete(key)
																	}}>
																	<DeleteOutlined />
																</Button>
															</List.Item>
														)}
													/>
												</Col>
											</Row>											
										</Card>
									</Col>
								</Row>
								}

								<div className='cv-create-account-btn-submit'>
									<Button type='primary' shape='round' onClick={this.handleSubmit}>
										REGISTRAR
									</Button>
									{this.state.redirect && <Redirect to={`/profile/activation/${btoa(this.state.name)}`} /> }
								</div>
							</Form>
						</Layout>
					</Content>
				</section>
			</>
		)
	}
}

export default CreateAccount
