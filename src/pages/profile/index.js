/** @format */

import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Layout, Row, Col, Card, Skeleton, Typography, Avatar, Button, notification } from 'antd'
import { UserOutlined, HeartOutlined, AntDesignOutlined } from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'

import { serviceGetAccountsByEmail, serviceDeleteAccount } from './services'
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
		}
	}

	componentDidMount() {
		serviceGetAccountsByEmail(this.state.userProfile.email).then((data) => {
			this.setState({
				accounts: data,
				loading: false,
			})
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
				<Layout>
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
														<CopyToClipboard
															text={`${process.env.REACT_APP_DOMAIN}/token/${btoa(
																this.state.userProfile.email
															)}`}>
															<Button shape='round'>Copiar enlace para la biografía</Button>
														</CopyToClipboard>
													</Col>
												</Row>
											</Col>
										</Row>
									</Layout>
								</Card>
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
														<Col span={6}>
															<img
																className='cv-profile-card-account-image'
																src={item.image}
																alt={item.name}
															/>
														</Col>
														<Col span={18} className='cv-profile-account-detail-acount'>
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
																	<Button shape='round' href={`/profile/edit-account/${item.name}`}>
																		Editar
																	</Button>
																</Col>
																<Col className='mb15' xs={24} sm={24} md={24} lg={8} xl={8}>
																	<CopyToClipboard
																		text={`${process.env.REACT_APP_DOMAIN}/${item.name}`}>
																		<Button shape='round'>Copiar enlace</Button>
																	</CopyToClipboard>
																</Col>
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
														<Row>
															<Col span={6}>
																<div className='mt15'>
																	<Avatar size={120} icon={<AntDesignOutlined />} />
																</div>
															</Col>
															<Col span={18} className='cv-create-account-detail-acount'>
																<Skeleton active />
															</Col>
														</Row>
													)
												}
											})()}
										</Col>
									</Col>
								</Row>
							</Col>
						</Row>
					</Layout>
				</Layout>
			</>
		)
	}
}
