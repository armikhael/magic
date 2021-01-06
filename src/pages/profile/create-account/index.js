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
	Avatar,
	Skeleton,
	notification,
} from 'antd'
import { RocketOutlined, AntDesignOutlined, DeleteOutlined } from '@ant-design/icons'

import ModalsContact from './components/ModalsContact'
import ModalsVerification from './components/ModalVerification'

import './style.css'
import { rules } from '../../../components/ServiceCommons/Rules'
import { serviceGetCategories, serviceSaveAccount, serviceGetCountry } from './services'
import { serviceGetInstagramAccount } from '../../../components/ServiceCommons/GetAccountInstagram'

const { Option } = Select
const { Search } = Input
const { Content, Header } = Layout

class CreateAccount extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			itemsCaegories: 5,
			userProfile: null,
			auxDescription: null,
			auxPrice: null,
			plans: [],
			agree: false,
			responseCategories: [],
			modalsContact: false,
			modalsVerification: false,
			countries: [],
		}
	}

	async componentDidMount() {
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
					label: item.name
				}
			})
			console.log('country', result);
			this.setState({ countries: result })
		})
	}

	handleRedirect = (item) => {
		if (this.state.redirect) {
			return <Redirect to={`/account/${item}`} />
		}
	}

	handleFindAccount = async (props) => {
		if (this.state.type === 'instagram') {
			serviceGetInstagramAccount(props)
				.then((response) => {
					this.setState({
						name: response.username,
						biography: response.biography,
						image: response.profile_pic_url_hd,
						followers: response.edge_followed_by.count,
						follow: response.edge_follow.count,
						emailAccount: response.business_email,
					})
					if (response.edge_followed_by.count < 10000) {
						this.setState({ 
							agree: false, 
							modalsContact: true, 
						})
						return
					}
					
					console.log(response.biography);
					let word = response.biography.toLowerCase()
					let isTrue = word.includes(process.env.REACT_APP_SECRET)
					console.log(isTrue);
					if (!isTrue) {
						this.setState({ 
							agree: false, 
							modalsVerification: true,
						})
						return 
					}

					this.setState({ agree: true })
				})
				.catch(() => {
					notification['error']({
						message: `Error!`,
						description: `Esta cuenta es inválida`,
					})
				})
		}
	}

	handleButton = async () => {
		let body = {
			email: this.state.userProfile.email,
			account: `${this.state.name}`,
			name: `${this.state.name}-${this.state.type}`,
			type: this.state.type,
			biography: this.state.biography,
			image: this.state.image,
			categories: this.state.categories,
			plans: this.state.plans,
			phone: this.state.phone,
			code: this.state.code,
			country: this.state.country,
			followers: this.state.followers,
			follow: this.state.follow,
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
		await serviceSaveAccount(body).then((data) => {
			if (data.statusCode === 500) {
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
		console.log('write', e.target.name, e.target.value);
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	handleChangePlans = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		})
	}

	handleChangeType = (e) => {
		this.setState({
			type: e,
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



	handleCategory = (e) => {
		if (e.length > this.state.itemsCaegories) {
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
								layout="vertical"
							>
								<Row>
									<Col xs={24} sm={24} md={12}>
										<h3 className='cv-create-account-from-title'>Usuario</h3>
										<Card className='cv-create-account-card-custom'>
											{(() => {
												if (this.state.userProfile) {
													return (
														<Form.Item label='Correo Electrónico'>
															<Input value={this.state.userProfile.email} disabled />
														</Form.Item>
													)
												}
											})()}

											<Form.Item label='Tipo de cuenta'>
												<Select onChange={this.handleChangeType}>
													<Option value='instagram'>Instagram</Option>
												</Select>
											</Form.Item>
											<Form.Item label='Nombre de la cuenta'>
												<Search
													disabled={!this.state.type}
													placeholder='Buscar cuenta...'
													onSearch={this.handleFindAccount}
												/>
											</Form.Item>
										</Card>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<h3 className='cv-create-account-from-title'>Datos de Cuenta </h3>
										<Card className='cv-create-account-card-custom'>
											<Row>
												<Col span={6}>
													{(() => {
														if (this.state.image) {
															return (
																<img
																	className='cv-create-account-image-acount'
																	src={this.state.image}
																	alt={this.state.name}
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
														if (this.state.image) {
															return (
																<Row>
																	<Col span={24}>
																		<h3>{this.state.name}</h3>
																	</Col>
																	<Col span={12}>
																		<span>
																			<b>{this.state.followers}</b>
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
																		{this.state.emailAccount}
																		<p>{this.state.biography}</p>
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
								{(() => {
									if (this.state.agree) {
										return (
											<Row>
												<Col xs={24} sm={24} md={12}>
													<h3 className='cv-create-account-from-title'>Información</h3>
													<Card className='cv-create-account-card-custom'>
														<Form.Item 
															name='country'
															label='¿En que país te encuentras actualmente?'
															rules={rules.rulesSelect}
														>
															<Select 
																onChange={this.handleChangeCountry}
															>
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
														<Form.Item
															label='Coloca tú número de WhatsApp'
															
															rules={rules.rulesPhone}
															onChange={this.handleChangeInput}>
															<Input name='phone'/>
															<a rel="noopener noreferrer" target="_blank" href={`https://api.whatsapp.com/send?phone=${this.state.phone}&text=Hola%20${this.state.account},%20te%20encontre%20por%20publilovers.com%20por%20tus%20paquetes%20publicitarios`}>Confirma tu número</a>
														</Form.Item>
														<Form.Item 
															label='Elige hasta 5 categprías que más se asocien a tu cuenta' 
															name='categories'
															rules={rules.rulesSelect}
														>
															<Select
																style={{ width: '100%'}}
																onChange={this.handleCategory}
																mode='multiple'
																showArrow
																maxTagCount={5}
																loading={true}
															>
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
														</Row>
													</Card>
												</Col>
											</Row>
										)
									}
								})()}
								<div className='cv-create-account-btn-submit'>
									<Button type='primary' shape='round' onClick={this.handleButton}>
										REGISTRAR
									</Button>
									{this.handleRedirect(this.state.accountParam)}
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

export default CreateAccount
