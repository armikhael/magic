/** @format */

import React from 'react'
import {
	Form,
	Select,
	Input,
	Layout,
	Row,
	Col,
	Card,
	Avatar,
	Skeleton,
	Button,
	notification
} from 'antd'
import './style.css'
import { serviceUpdateAccount } from './services'
import { rules } from '../../../components/ServiceCommons/Rules'
import { RocketOutlined, AntDesignOutlined, DeleteOutlined } from '@ant-design/icons'
import { serviceGetAccount } from '../../../components/ServiceCommons/GetAccount'
import { serviceGetCategories } from '../../../components/ServiceCommons/GetCategory'
import { serviceGetCountry } from '../../../components/ServiceCommons/GetCountry'

const { Option } = Select
const { Content, Header } = Layout

export default class EditAccount extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			itemsCaegories: 5,
			accountDetails: {},
			countries: [],
			responseCategories: [],
			auxDescription: null,
			auxPrice: null,
			plans: []
		}
	}

	async componentDidMount() {
		if (localStorage.getItem('user')) {
			this.setState({
				userProfile: JSON.parse(localStorage.getItem('user')),
			})
		}

		let response = await serviceGetAccount(this.props.match.params.name)
		console.log(response);
		this.setState({ 
			accountDetails: response,
			phone: response.phone,
			account: response.account,
			country: response.country,
			code: response.code,
			categories: response.categories,
			plans: response.plans
		})

		console.log('account:', this.state.accountDetails._id);
		
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
					label: item.name
				}
			})
			this.setState({ countries: result })
		})
		console.log('2', this.state);
	}

	handleChangeInput = (e) => {
		console.log('write', e.target.name, e.target.value);
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	handleCategory = (e) => {
		if (e.length > this.state.itemsCaegories) {
			console.log('mas de 5');
			notification['error']({
				message: `Ups!`,
				description: `Sólo puede agregar hasta ${this.state.itemsCaegories} categorías`,
			})
			return
		}

		console.log(e);
		this.setState({
			categories: e,
		})
	}

	handleChangeCountry = (e) => {
		e = JSON.parse(e)
		console.log(e)
		this.setState({
			country: e.name,
			code: e.code,
		})
	}

	handleDelete = (e) => {
		this.state.plans.splice(e, 1)
		this.setState({
			plans: this.state.plans,
		})
	}

	handleButtonPlans = () => {
		if (this.state.auxDescription === null || this.state.auxPrice === null) {
			notification['error']({
				message: `Ups!`,
				description: `Debe rellenar los datos correspondientes`,
			})
			return
		}
		let arrayPlans = this.state.plans
		arrayPlans.push({
			description: this.state.auxDescription,
			price: this.state.auxPrice,
		})
		this.setState({
			plans: arrayPlans,
		})
		console.log(this.state.plans)
	}

	handleChangePlans = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		})
	}


	handleSubmit = async () => {
		let body = {
			id: this.state.accountDetails._id,
			categories: this.state.categories,
			plans: this.state.plans,
			phone: this.state.phone,
			code: this.state.code,
			country: this.state.country,
		}

		console.log(Object.keys(body))
		console.log(body)
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

		await serviceUpdateAccount(body).then((data) => {
			if (data.statusCode === 500) {
				notification['error']({
					message: `Ups!`,
					description: `${data.message}`,
				})
				return
			}

			notification['success']({
				message: `Good job!!`,
				description: `La cuenta se ha actualizado satisfactoriamente`,
			})

		})
	}

	render() {
		return (
			<>
				<Layout>
					<Content>
						<Header className='cv-perfil-title-main-container'>
							<RocketOutlined className='cv-perfil-title-main-icon' />
							<h3 className='cv-perfil-title-main-title'>Editar cuenta</h3>
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
								layout="vertical"
							>
								<Row>
									<Col xs={24} sm={24} md={12}>
										<h3 className='cv-create-account-from-title'>Datos de Cuenta </h3>
										<Card className='cv-create-account-card-custom'>
											<Row>
												<Col span={6}>
													{(() => {
														if (this.state.accountDetails.image) {
															return (
																<img
																	className='cv-create-account-image-acount'
																	src={this.state.accountDetails.image}
																	alt={this.state.accountDetails.name}
																/>
															)
														} else {
															return (
																<div className='mt15'>
																	<Avatar size={120} icon={<AntDesignOutlined />} />
																</div>
															)
														}
													})()}
												</Col>
												<Col span={18} className='cv-create-account-detail-acount'>
													{(() => {
														if (this.state.accountDetails.image) {
															return (
																<Row>
																	<Col span={24}>
																		<h3>{this.state.accountDetails.name}</h3>
																	</Col>
																	<Col span={12}>
																		<span>
																			<b>{this.state.accountDetails.followers}</b>
																		</span>{' '}
																		Seguidores
																	</Col>
																	<Col span={12}>
																		<span>
																			<b>{this.state.follow}</b>
																		</span>{' '}
																		Seguidos
																	</Col>
																	<Col span={24} className='mt15'>
																		{this.state.accountDetails.email}
																		<p>{this.state.accountDetails.biography}</p>
																	</Col>
																</Row>
															)
														} else {
															return <Skeleton active />
														}
													})()}
												</Col>
											</Row>
										</Card>
									</Col>
								</Row>
								<Row>
									<Col xs={24} sm={24} md={12}>
										<h3 className='cv-create-account-from-title'>Información</h3>
										<Card className='cv-create-account-card-custom'>
											{this.state.country && 
												<Form.Item 
												name='country'
												label='¿En que país te encuentras actualmente?'
												rules={rules.rulesSelect}
												initialValue={this.state.country}>
												<Select 
													onChange={this.handleChangeCountry}>
													{this.state.countries.map((item, i) => {
														return (
															<Option
																style={{ textTransform: 'capitalize' }}
																key={i}
																value={JSON.stringify({
																	code: item.code,
																	name: item.name,
																})}>
																{item.label}
															</Option>
														)
													})}
												</Select>
											</Form.Item>
											}

											<Form.Item
												label='Coloca tú número de WhatsApp'											
												rules={rules.rulesPhone}
												onChange={this.handleChangeInput}>
												<Input 
													name='phone'
													value={this.state.phone}/>
												<a rel="noopener noreferrer" target="_blank" href={`https://api.whatsapp.com/send?phone=${this.state.phone}&text=Hola%20${this.state.account},%20te%20encontre%20por%20publilovers.com%20por%20tus%20paquetes%20publicitarios`}>Confirma tu número</a>
											</Form.Item>

											{this.state.categories && 
													<Form.Item 
													label='Elige hasta 5 categprías que más se asocien a tu cuenta' 
													name='categories'
													rules={rules.rulesSelect}
													initialValue={this.state.categories}>
													<Select
														style={{ width: '100%'}}
														onChange={this.handleCategory}
														mode='multiple'
														showArrow
														maxTagCount={5}>
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
											}
										</Card>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<h3 className='cv-create-account-from-title'>Planes</h3>
										<Card className='cv-create-account-card-custom'>
											<Row>
												<Col span={24}>
													<Form.Item
														label='Nombre:'
														name='auxDescription'
														onChange={this.handleChangePlans}
														rules={rules.rulesText}>
														<Input placeholder='Ingrese el paquete' />
													</Form.Item>
													<Form.Item
														label='Precio:'
														name='auxPrice'
														onChange={this.handleChangePlans}
														rules={rules.rulesPrice}>
														<Input placeholder='Ingrese el precio' />
													</Form.Item>
													<div className='cv-create-account-btn-add-content'>
														<Button
															type='primary'
															shape='round'
															onClick={this.handleButtonPlans}>
															AGREGAR
														</Button>
													</div>
												</Col>
												{this.state.plans.length > 0 && 
													<Col span={24}>
														<ol>
															{this.state.plans.map((item, key) => (
																<li key={key}>
																	{item.description} - {item.price} -
																	<Button
																		type='link'
																		shape='round'
																		onClick={() => {
																			this.handleDelete(key)
																		}}>
																		<DeleteOutlined />
																	</Button>
																</li>
															))}
														</ol>
													</Col>
												}
											</Row>
										</Card>
									</Col>
								</Row>
								<div className='cv-create-account-btn-submit'>
									<Button type='primary' shape='round' onClick={this.handleSubmit}>
										Actualizar
									</Button>
								</div>
							</Form>
						</Layout>
					</Content>
				</section>
				<Content className='cv-container-main'>
					<Form onFinish={this.handleSubmitLogin}></Form>
				</Content>
			</>
		)
	}
}
