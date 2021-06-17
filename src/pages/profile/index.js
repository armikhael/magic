/** @format */

import React from 'react'
import { Layout, Row, Col, Card, Typography, Button, notification, Form } from 'antd'
import { UserOutlined, HeartOutlined, ApiOutlined } from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'
import InputField from '../../components/Input'

import './style.css'
import { serviceGetAccountsByEmail, serviceChangePassword } from './services'
import LinkTree from './components/LinkTree'
import Accounts from './components/Accounts'

import serviceDeleteLinktree from './components/LinkTree/service'

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
			links: [],
		}
	}

	componentDidMount() {
		serviceGetAccountsByEmail(this.state.userProfile.email).then((response) => {
			console.log(response)
			this.setState({
				accounts: response.accounts,
				loading: false,
				links: response.links,
			})
		})
	}

	handleChangePassword = (item) => {
		this.setState({ loadingChangePassword: true })
		serviceChangePassword(item, this.state.userProfile.email).then(() => {
			this.setState({ loadingChangePassword: false })
		})
	}

	handleChangeInput = (e) => {
		console.log('write', e.target.name, e.target.value)
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	handleDeleteLinkTree = async (item) => {
		console.log(item)
		const response = await serviceDeleteLinktree(item)
		console.log(response)

		if (response.statusCode === 200) {
			this.setState({ links: response.data })
			notification['success']({
				message: `¡Felicidades!`,
				description: `El enlace ha sido eliminado correctamente`,
			})
		} else {
			notification['error']({
				message: `¡Ups!`,
				description: response.message,
			})
		}
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
							<Col xs={24} sm={24} md={14}>
								<Header className='cv-perfil-title-main-container'>
									<HeartOutlined className='cv-perfil-title-main-icon' />
									<h3 className='cv-perfil-title-main-title'>Cuentas Asociadas</h3>
								</Header>
								<Row>
									<Col xs={24} sm={24} md={24} lg={24} xl={24}>
										<Col xs={24} sm={24} md={24} lg={24} xl={24}>
											<Accounts componentData={this.state.accounts} />
										</Col>
									</Col>
								</Row>
							</Col>
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
								<Row className='cv-profile-content-accoun'>
									<LinkTree
										componentData={this.state.links}
										componentDelete={this.handleDeleteLinkTree}
									/>
								</Row>
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
						</Row>
					</Layout>
				</div>
			</>
		)
	}
}
