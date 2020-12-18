/** @format */

import React from 'react'

import {
	Layout,
	Row,
	Col,
	Card,
	Skeleton,
	Space,
	Typography,
	Avatar,
	Button,
} from 'antd'
import {
	UserOutlined,
	HeartOutlined,
	AntDesignOutlined,
} from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'

import { serviceGetAccountsByEmail, serviceDeleteAccount } from './services'
import './style.css'

const { Content, Header } = Layout
const { Text } = Typography

export default class Profile extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			userProfile: null,
			accounts: [],
			loading: true,
		}
	}

	componentDidMount() {
		if (localStorage.getItem('user')) {
			let jsonParse = JSON.parse(localStorage.getItem('user'))

			this.setState({
				userProfile: jsonParse
			})
			
			serviceGetAccountsByEmail(jsonParse.email).then((data) => {
				this.setState({
					accounts: data,
					loading: false,
				})
			})
		}
	}

	handleDeleteAccount = async (item) => {
		await serviceDeleteAccount(item._id)
		const newList = await serviceGetAccountsByEmail(
			this.state.userProfile.email
		)
		this.setState({
			accounts: newList,
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
							<Col span={10}>
								<Content>
									<Header className='cv-perfil-title-main-container'>
										<UserOutlined className='cv-perfil-title-main-icon' />
										<h3 className='cv-perfil-title-main-title'>
											Perfil de Usuario
										</h3>
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
															src={this.state.userProfile.imageUrl}
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
														<Space direction='vertical'>
															<Text className='cv-profile-main-title-user'>
																{this.state.userProfile.name}
															</Text>
															<Space>
																<Text className='cv-profile-main-role-user'>
																	{this.state.userProfile.email}
																</Text>
															</Space>
															{(() => {
																if (this.state.userProfile.googleId) {
																	return (
																		<Space>
																			<Text className='cv-profile-role-title'>
																				ID Google
																			</Text>
																			<Text className='cv-profile-role-description'>
																				{this.state.userProfile.googleId}
																			</Text>
																		</Space>
																	)
																}
															})()}
														</Space>
													</Col>
												</Row>
											</Col>
										</Row>
									</Layout>
								</Card>
							</Col>
							<Col span={14}>
								<Header className='cv-perfil-title-main-container'>
									<HeartOutlined className='cv-perfil-title-main-icon' />
									<h3 className='cv-perfil-title-main-title'>
										Cuentas Asociadas
									</h3>
								</Header>
								<Row>
									<Col xs={24} sm={24} md={24} lg={24} xl={24}>
										<Card className='cv-perfil-description-container'>
											<Row>
												<Col xs={24} sm={24} md={24} lg={24} xl={24}>
													{this.state.accounts.map((item, i) => {
														return (
															<Row key={i}>
																<Col span={6}>
																	<img
																		className='cv-create-account-image-acount'
																		src={item.image}
																		alt={item.name}
																	/>
																</Col>
																<Col
																	span={18}
																	className='cv-create-account-detail-acount'>
																	<Row>
																		<Col span={24}>
																			<h3>{item.account}</h3>
																		</Col>
																		<Col span={12}>
																			<span>
																				<b>{item.followers}</b>
																			</span>{' '}
																			Seguidores
																		</Col>
																		<Col span={12}>
																			<span>
																				<b>{item.follow}</b>
																			</span>{' '}
																			Seguidos
																		</Col>
																		<Col span={24} className='mt15'>
																			{item.emailAccount}
																			<p>{item.biography}</p>
																		</Col>
																		<Col>
																			<Button
																				type='primary'
																				shape='round'
																				onClick={() => {
																					this.handleDeleteAccount(item)
																				}}>
																				borrar
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
																			<Avatar
																				size={120}
																				icon={<AntDesignOutlined />}
																			/>
																		</div>
																	</Col>
																	<Col
																		span={18}
																		className='cv-create-account-detail-acount'>
																		<Skeleton active />
																	</Col>
																</Row>
															)
														}
													})()}
												</Col>
											</Row>
										</Card>
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
