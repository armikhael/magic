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
	notification
} from 'antd'
import { rules } from '../../../components/ServiceCommons/Rules'
import { RocketOutlined, AntDesignOutlined } from '@ant-design/icons'
import { serviceGetAccount } from '../../../components/ServiceCommons/GetAccount'
import { serviceGetCategories } from '../../../components/ServiceCommons/GetCategory'
import { serviceGetCountry } from '../../../components/ServiceCommons/GetCountry'

import './style.css'
const { Option } = Select
const { Content, Header } = Layout

export default class EditAccount extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			accountDetails: {},
			countries: [],
			responseCategories: [],
			categories: [],
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
			categories: response.categories,
		})
		
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
												<Input value={this.state.accountDetails.type} disabled />
											</Form.Item>
											<Form.Item label='Nombre de la cuenta'>
											<Input value={this.state.accountDetails.name} disabled />
											</Form.Item>
										</Card>
									</Col>
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
											{this.state.categories.length > 0 && 
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
													maxTagCount={5}
													loading={true}>
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
								</Row>
										
										
								
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
