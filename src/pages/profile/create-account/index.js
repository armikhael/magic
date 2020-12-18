/** @format */

import React from 'react'
import { Redirect } from 'react-router-dom'

import {
	Form,
	Select,
	Button,
	Input,
	Tag,
	Layout,
	Row,
	Col,
	Card,
	Avatar,
	Skeleton,
	notification,
} from 'antd'
import { connect } from 'react-redux'
import { RocketOutlined, AntDesignOutlined } from '@ant-design/icons'

import ModalsContact from './components/ModalsContact'

import './style.css'
import { rulesValidation } from './rules'
import {
	serviceGetCategories,
	serviceSaveAccount,
	serviceGetInstagramAccount,
} from './services'

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
			countries: [
				{
					code: '56',
					name: 'chile',
					label: 'Chile',
				},
				{
					code: '54',
					name: 'argentina',
					label: 'Argentina',
				},
				{
					code: '58',
					name: 'venezuela',
					label: 'Venezuela',
				},
			],
		}

	}

	async componentDidMount() {
		if (localStorage.getItem('user')) {
			this.setState({
				userProfile: JSON.parse(localStorage.getItem('user'))
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
	}


	handleRedirect = (param) => {
		if (this.state.redirect) {
			return <Redirect to={`/account/${param}`} />
		}
	}

	handleFindAccount = async (item) => {
		if (this.state.type === 'instagram') {
			serviceGetInstagramAccount(item)
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
						this.setState({ agree: false, modalsContact: true })
						return
					}
					this.setState({ agree: true })
				})
				.catch(() => {
					notification['error']({
						message: `Error!`,
						description: `Error la cuenta no existe.`,
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
		this.setState({
			[e.target.id]: e.target.value,
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
		this.setState({
			country: e.name,
			code: e.code,
		})
	}

	handlerTagRender(props) {
		const { label, value, closable, onClose } = props
		return (
			<Tag
				color={value}
				closable={closable}
				onClose={onClose}
				style={{ marginRight: 3 }}>
				{label}
			</Tag>
		)
	}

	handleCategory = (e) => {
		if (e.length >= this.state.itemsCaegories) {
			notification['error']({
				message: `Ups!`,
				description: `Sólo puede agregar hasta ${this.state.itemsCaegories} categorías`,
			})
		}
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

	render() {
		return (
			<>
				<ModalsContact
					modalsContact={this.state.modalsContact}
					handleCloseModalsConctac={this.handleCloseModalsConctac}
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
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 16 }}>
								<Row>
									<Col span={12}>
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
									<Col span={12}>
										<h3 className='cv-create-account-from-title'>
											Datos de Cuenta{' '}
										</h3>
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
																	<Avatar
																		size={120}
																		icon={<AntDesignOutlined />}
																	/>
																</div>
															)
														}
													})()}
												</Col>
												<Col
													span={18}
													className='cv-create-account-detail-acount'>
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
												<Col span={12}>
													<h3 className='cv-create-account-from-title'>
														Región
													</h3>
													<Card className='cv-create-account-card-custom'>
														<Form.Item label='País'>
															<Select onChange={this.handleChangeCountry}>
																{this.state.countries.map((item, i) => {
																	return (
																		<Option
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
															label='Número'
															name='phone'
															rules={rulesValidation.rulesPhone}
															onChange={this.handleChangeInput}>
															<Input />
														</Form.Item>
														<Form.Item label='Categorias' name='categories'>
															<Select
																mode='multiple'
																showArrow
																tagRender={this.tagRender}
																style={{ width: '100%' }}
																options={this.state.responseCategories}
																onChange={this.handleCategory}
															/>
														</Form.Item>
													</Card>
												</Col>
												<Col span={12}>
													<h3 className='cv-create-account-from-title'>
														Planes
													</h3>
													<Card className='cv-create-account-card-custom'>
														<Row>
															<Col span={12}>
																<Form.Item
																	label='Nombre:'
																	name='auxDescription'
																	onChange={this.handleChangePlans}
																	rules={rulesValidation.rulesText}>
																	<Input placeholder='Ingrese el paquete' />
																</Form.Item>
																<Form.Item
																	label='Precio:'
																	name='auxPrice'
																	onChange={this.handleChangePlans}
																	rules={rulesValidation.rulesPrice}>
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
															<Col span={12}>
																<ol>
																	{this.state.plans.map((item, key) => (
																		<li key={key}>
																			{item.description} - {item.price} -
																			<Button
																				type='primary'
																				shape='round'
																				onClick={() => {
																					this.handleDelete(key)
																				}}>
																				borrar
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
									<Button
										type='primary'
										shape='round'
										onClick={this.handleButton}>
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

const mapStateToProps = (state) => {
	return {
		email: state.email,
	}
}

export default connect(mapStateToProps)(CreateAccount)
