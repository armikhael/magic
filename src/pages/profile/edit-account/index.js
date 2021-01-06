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
} from 'antd'
import { rules } from '../../../components/ServiceCommons/Rules'
import { RocketOutlined, AntDesignOutlined } from '@ant-design/icons'
import { serviceGetAccount } from '../../../components/ServiceCommons/GetAccount'
import './style.css'

const { Content, Header } = Layout

export default class EditAccount extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			accountDetails: {}
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
		this.setState({ accountDetails: response })


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
										<Form.Item 
											name='country'
											label='¿En que país te encuentras actualmente?'
											rules={rules.rulesSelect}
										>
											<Select>
												
											</Select>
										</Form.Item>
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
