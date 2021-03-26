/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Layout, Row, Col, Card, Result, Typography, Button, notification, Form } from 'antd'
import { UserOutlined, HeartOutlined, ApiOutlined } from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'
import InputField from '../../components/Input'

import UploadImage from './components/UploadImage'

import { serviceGetAccountsByEmail, serviceDeleteAccount, serviceChangePassword } from './services'
import './style.css'

const { Content, Header } = Layout
const { Text } = Typography

export default class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userProfile: JSON.parse(localStorage.getItem('user')),
			accounts: [],
			loading: true,
			redirect: false,
			loadingChangePassword: false,
		}
	}

	componentDidMount() {
		serviceGetAccountsByEmail(this.state.userProfile.email).then((response) => {
			console.log(response)
			if (response[0].image === null) {
				response[0].image = 'https://i.postimg.cc/YSQXZWCP/logo.jpg'
			}
			this.setState({
				accounts: response,
				loading: false,
			})
		})
	}

	handleChangePassword = (item) => {
		this.setState({ loadingChangePassword: true })
		serviceChangePassword(item, this.state.userProfile.email).then(() => {
			this.setState({ loadingChangePassword: false })
		})
	}

	handleDeleteAccount = async (item) => {
		let btn = (
			<Button
				className='ph-profile-address-button-delete'
				onClick={() =>
					serviceDeleteAccount({
						id: item._id,
						email: this.state.userProfile.email,
					}).then((response) => {
						this.setState({
							accounts: response,
						})
						notification.close('notiAccountDelete')
					})
				}>
				<h3 className='ph-profile-address-button-delete-title'>Confirmar</h3>
			</Button>
		)
		notification['error']({
			message: 'Eliminar Cuenta',
			description: `Estas seguro que quieres eliminar la cuenta "${item.account}".`,
			btn,
			key: 'notiAccountDelete',
		})
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		return (
			<>
				<div className='cv-content-main'>
					<Layout className='cv-perfil-main-container'>
						<Row>
							<Col xs={24} sm={24} md={10}>
								<Content>
									<Header className='cv-perfil-title-main-container'>
										<UserOutlined className='cv-perfil-title-main-icon' />
										<h3 className='cv-perfil-title-main-title'>Perfil de Usuario</h3>
									</Header>
								</Content>
								<Card className='cv-profile-main-container'>
									<Layout className='cv-profile-container'>
										<Row>
											<Col xs={24} sm={24} md={24} lg={24} xl={24}>
												<Row className='cv-profile-main-info-container'>
													<Col
														xs={4}
														sm={4}
														md={4}
														lg={4}
														xl={4}
														className='cv-profile-main-info-inner-container'>
														<img
															className='cv-profile-main-info-inner-container-img'
															src={this.state.userProfile.image}
															alt={this.state.userProfile.name}
															title={this.state.userProfile.name}
														/>
													</Col>
													<Col
														xs={20}
														sm={20}
														md={20}
														lg={20}
														xl={20}
														className='cv-profile-main-info-inner-container-2'>
														<Text className='cv-profile-main-title-user'>
															{this.state.userProfile.name}
														</Text>
														<Text className='cv-profile-main-role-user'>
															{this.state.userProfile.email}
														</Text>
													</Col>
												</Row>
											</Col>
										</Row>
									</Layout>
								</Card>
								{this.state.userProfile.autentication !== 'google' && (
									<Card className='cv-profile-main-container'>
										<h3 className='cv-perfil-title-main-title'>
											<ApiOutlined className='cv-perfil-title-main-icon' />
											Cambiar Contraseña
										</h3>
										<br />
										<Layout className='cv-profile-container'>
											<Form
												name='normal_login'
												initialValues={{ remember: true }}
												onFinish={this.handleChangePassword}>
												<InputField
													className={'cv-auth-login-field-input'}
													inputName={'password'}
													inputNameLabel={'Contraseña Actual'}
													inputNameRule={true}
													inputNameMessage={'Ingrese su contraseña'}
													inputNameType={'password'}
													inputNameIcon={''}
													inputNameRules={'rulesPassword'}
												/>
												<InputField
													className={'cv-auth-login-field-input'}
													inputName={'new_password'}
													inputNameLabel={'Nueva Contraseña'}
													inputNameRule={true}
													inputNameMessage={'Ingrese tu nueva contraseña'}
													inputNameType={'password'}
													inputNameIcon={''}
													inputNameRules={'rulesPassword'}
												/>
												<br />
												<Form.Item>
													<Button
														loading={this.state.loadingChangePassword}
														htmlType={'submit'}
														className={'cv-profile-button-submit-change-password'}>
														Confirmar
													</Button>
												</Form.Item>
											</Form>
										</Layout>
									</Card>
								)}
							</Col>
							<Col xs={24} sm={24} md={14}>
								<Header className='cv-perfil-title-main-container'>
									<HeartOutlined className='cv-perfil-title-main-icon' />
									<h3 className='cv-perfil-title-main-title'>Cuentas Asociadas</h3>
								</Header>
								<Row>
									<Col xs={24} sm={24} md={24} lg={24} xl={24}>
										<Col xs={24} sm={24} md={24} lg={24} xl={24}>
											{this.state.accounts.map((item, i) => {
												return (
													<Row className='cv-profile-card-account-content' key={i}>
														<Col sm={24} md={6} className='cv-profile-upload-image'>
															<UploadImage account={item} />
														</Col>
														<Col sm={24} md={18} className='cv-profile-account-detail-acount'>
															<Row>
																<Col span={24}>
																	<h3 className='cv-profile-account-detail-title'>
																		{item.account}
																	</h3>
																</Col>
																<Col span={24} className='mt15'>
																	{item.emailAccount}
																	<p>{item.biography}</p>
																</Col>
															</Row>
															<Row>
																<Col className='mb15' xs={24} sm={24} md={24} lg={5} xl={5}>
																	<Button
																		shape='round'
																		href={`/profile/edit-account/${item.name}`}>
																		Editar
																	</Button>
																</Col>
																{item.eneable === true && (
																	<Col className='mb15' xs={24} sm={24} md={24} lg={8} xl={8}>
																		<CopyToClipboard
																			text={`${process.env.REACT_APP_DOMAIN}/${item.name}`}>
																			<Button shape='round'>Copiar enlace</Button>
																		</CopyToClipboard>
																	</Col>
																)}
																<Col className='mb15' xs={24} sm={24} md={24} lg={6} xl={6}>
																	<Button
																		type='danger'
																		shape='round'
																		onClick={() => {
																			this.handleDeleteAccount(item)
																		}}>
																		Eliminar
																	</Button>
																</Col>
															</Row>
														</Col>
													</Row>
												)
											})}
											{(() => {
												if (this.state.accounts.length === 0) {
													return (
														<div className='cv-profile-card-account-content'>
															<Result
																status='error'
																title='Cuentas Registradas'
																subTitle='No tienes ninguna cuenta registrada, para poder registrar una solo debes hacer click en boton "Registrar cuentas" o en Menú también encontraras un acceso directo.'
																extra={[
																	<Link
																		key='profile-link-add-account'
																		to={`/profile/create-account`}>
																		<Button key='profile-button-add-account'>
																			Registrar Cuenta
																		</Button>
																	</Link>,
																]}></Result>
														</div>
													)
												}
											})()}
										</Col>
									</Col>
								</Row>
							</Col>
						</Row>
					</Layout>
				</div>
			</>
		)
	}
}
