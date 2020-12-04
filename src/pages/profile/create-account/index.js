import React from 'react'
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
} from 'antd'
import { connect } from 'react-redux'
import { RocketOutlined, AntDesignOutlined } from '@ant-design/icons'

import './style.css'
import { rulesValidation } from './rules'
import {
	serviceGetCategories,
	// serviceSaveAccount,
	serviceGetInstagramAccount,
} from './services'

const { Option } = Select
const { Content, Header } = Layout

class CreateAccount extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			plans: [],
			email: null,
			auxDescription: null,
			auxPrice: null,
			responseCategories: [],
			countries: [
				{
					code: '56',
					name: 'chile',
					label: 'Chile'
				},
				{
					code: '54',
					name: 'argentina',
					label: 'Argentina'
				},
				{
					code: '58',
					name: 'venezuela',
					label: 'Venezuela'
				}
			]
		}
	}

	async componentDidMount() {
		let userEmail = localStorage.getItem('email')
		console.log(userEmail);
		this.setState({
			email: userEmail
		});

		console.log(this.state.email);
		await serviceGetCategories().then((data) => {
			let result = data.map((item) => {
				return {
					value: item.name,
				}
			})
			this.setState({ responseCategories: result })
		})
	}

	handleFindAccount = async (e) => {
		if (e.key === 'Enter') {
			if (this.state.type === '') {
				alert('Debe seleccionar un tipo de cuenta')
				return
			} else if (this.state.type === 'instagram') {
				let account = e.target.value.toLowerCase()
				console.log(account);
				await serviceGetInstagramAccount(account).then((data) => {
					const jsonObject = data
						.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1]
						.slice(0, -1)
					const jsonParse = JSON.parse(jsonObject)
					const userInfo = jsonParse.entry_data.ProfilePage[0].graphql.user
					this.setState({
						name: userInfo.username,
						biography: userInfo.biography,
						image: userInfo.profile_pic_url_hd,
						followers: userInfo.edge_followed_by.count,
						follow: userInfo.edge_follow.count,
						emailAccount: userInfo.business_email,
					})
					console.log(this.state.image)
					console.log(userInfo)
				})
				.catch((e) => {
					console.log(e);
					alert('Esta cuenta no existe')
				})
			} else {
				alert('este tipo de cuenta no esta permitida')
			}

			
		}
	}

	handleButton = async () => {
		
		let body = {
			email: this.state.email,
			name: this.state.name,
			type: this.state.type,
			biography: this.state.biography,
			image: this.state.image,
			categories: this.state.categories,
			plans: this.state.plans,
			phone: this.state.phone,
			code: this.state.code,
			country: this.state.country,
		}

		console.log(Object.keys(body));
		console.log(body)
		for (let i = 0; i < Object.keys(body).length; i++) {
			let value = Object.keys(body)[i]
			if (body[value] === undefined || body[value].length <= 0) {
				alert('Debe rellenar todos los campos')
				return 
			}
		}
		// await serviceSaveAccount(body).then((data) => {
		// 	console.log(data)
		// })
	}

	handleChangeInput = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		})
	}
	handleChangePlans = (e) => {
		console.log(e.target.value)
		this.setState({
			[e.target.id]: e.target.value,
		})
	}

	handleChangeType = (e) => {
		console.log(e)
		this.setState({
			type: e,
		})
	}

	handleChangeCountry = (e) => {
		console.log(JSON.parse(e))
		e = JSON.parse(e)
		this.setState({
			country: e.name,
			code: e.code
		})

		console.log(this.state);
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
		console.log(e)
		this.setState({
			categories: e,
		})
	}

	handleButtonPlans = () => {
		let arrayPlans = this.state.plans
		arrayPlans.push({
			description: this.state.auxDescription,
			price: this.state.auxPrice,
		})
		this.setState({
			plans: arrayPlans,
			auxPrice: null,
			auxDescription: null, 
		})
		console.log(this.state.plans)
	}

	render() {
		return (
			<>
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
										<h3 className='cv-create-account-from-title'>Usuario {this.state.email}</h3>
										<Card className='cv-create-account-card-custom'>
											<Form.Item label="Correo Electrónico">
												<Input  value={this.state.email}  disabled />
											</Form.Item>
											<Form.Item label='Tipo de cuenta'>
												<Select onChange={this.handleChangeType}>
													<Option value='instagram'>Instagram</Option>
												</Select>
											</Form.Item>
											<Form.Item label='Nombre de la cuenta'>
												<Input 
													disabled={!this.state.type}
													onKeyDown={this.handleFindAccount} 
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
																		<h3>{this.state.nameAcount}</h3>
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
								<Row>
									<Col span={12}>
										<h3 className='cv-create-account-from-title'>Región</h3>
										<Card className='cv-create-account-card-custom'>
											<Form.Item 
												label='País'
											>
												<Select onChange={this.handleChangeCountry}>
													{
														this.state.countries.map((item, i) => {
															return (
																<Option key={i} value={JSON.stringify({
																	code: item.code,
																	name: item.name
																})}>{item.label}</Option>
															)
														})
													}
												</Select>
											</Form.Item>
											<Form.Item
												label='Número'
												name='phone'
												rules={rulesValidation.rulesPhone}
												onChange={this.handleChangeInput}
											>
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
										<h3 className='cv-create-account-from-title'>Planes</h3>
										<Card className='cv-create-account-card-custom'>
											<Row>
												<Col span={12}>
													<Form.Item
														label='Nombre:'
														name='auxDescription'
														onChange={this.handleChangePlans}
														rules={rulesValidation.rulesText}
													>
														<Input placeholder='Ingrese el paquete'/>
													</Form.Item>
													<Form.Item
														label='Precio:'
														name='auxPrice'													
														onChange={this.handleChangePlans}
														rules={rulesValidation.rulesPrice}
													>
														<Input placeholder='Ingrese el precio'/>
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
																{item.description} - {item.price}
															</li>
														))}
													</ol>
												</Col>
											</Row>
										</Card>
									</Col>
								</Row>
								<div className='cv-create-account-btn-submit'>
									<Button
										type='primary'
										shape='round'
										onClick={this.handleButton}>
										REGISTRAR
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

const mapStateToProps = (state) => {
	return {
		email: state.email,
	}
}

export default connect(mapStateToProps)(CreateAccount)
