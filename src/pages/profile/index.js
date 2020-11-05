/** @format */

import React from 'react'

import { Layout, Row, Col, Card, Avatar, Space, Typography } from 'antd'
import {
	UserOutlined,
	MailOutlined,
	UserAddOutlined,
	FileTextOutlined,
	PhoneOutlined,
	ClockCircleOutlined,
	HeartOutlined,
} from '@ant-design/icons'

import './style.css'

const { Content, Header } = Layout
const { Text } = Typography

class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<>
				<Layout>
					<Content>
						<Header className='cv-perfil-title-main-container'>
							<UserOutlined className='cv-perfil-title-main-icon' />
							<h3 className='cv-perfil-title-main-title'>Perfil de Usuario</h3>
						</Header>
					</Content>
					<Layout className='cv-perfil-main-container'>
						<Row>
							<Col span={24}>
								<Card className='cv-profile-main-container'>
									<Layout className='cv-profile-container'>
										<Row>
											<Col xs={24} sm={10} md={10} lg={14} xl={14}>
												<Row className='cv-profile-main-info-container'>
													<Col
														xs={4}
														sm={4}
														md={4}
														lg={4}
														xl={4}
														className='cv-profile-main-info-inner-container'>
														<Avatar
															className='cv-profile-avatar'
															icon={<UserOutlined />}
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
																Carlos Espinoza
															</Text>
															<Space>
																<Text className='cv-profile-main-role-user'>
																	Roles: Cuenta
																</Text>
															</Space>
															<Space>
																<Text className='cv-profile-role-title'>
																	Rol QF:
																</Text>
																<Text className='cv-profile-role-description'>
																	Rol 1
																</Text>
															</Space>
															<Space>
																<Text className='cv-profile-role-title'>
																	Rol Tracking:
																</Text>
																<Text className='cv-profile-role-description'>
																	Rol 2
																</Text>
															</Space>
														</Space>
													</Col>
												</Row>
											</Col>
											<Col
												xs={24}
												sm={14}
												md={14}
												lg={10}
												xl={10}
												className='cv-profile-info-container'>
												<Space direction='vertical'>
													<Space direction='horizontal'>
														<MailOutlined className='cv-profile-info-icon' />
														<Text className='cv-profile-info-title'>
															Nombre:{' '}
														</Text>
														<Text className='cv-profile-info-description'>
															Carlos
														</Text>
													</Space>
													<Space direction='horizontal'>
														<UserOutlined className='cv-profile-info-icon' />
														<Text className='cv-profile-info-title'>
															Apellido:{' '}
														</Text>
														<Text className='cv-profile-info-description'>
															Espinoza
														</Text>
													</Space>
													<Space direction='horizontal'>
														<UserAddOutlined className='cv-profile-info-icon' />
														<Text className='cv-profile-info-title'>
															Correo:{' '}
														</Text>
														<Text className='cv-profile-info-description'>
															carlos@gmail.com
														</Text>
													</Space>
													<Space direction='horizontal'>
														<FileTextOutlined className='cv-profile-info-icon' />
														<Text className='cv-profile-info-title'>Rut: </Text>
														<Text className='cv-profile-info-description'>
															27.2155.134-4
														</Text>
													</Space>
													<Space direction='horizontal'>
														<PhoneOutlined className='cv-profile-info-icon' />
														<Text className='cv-profile-info-title'>
															{' '}
															Teléfono:{' '}
														</Text>
														<Text className='cv-profile-info-description'>
															+56738473734
														</Text>
													</Space>
													<Space direction='horizontal'>
														<ClockCircleOutlined className='cv-profile-info-icon' />
														<Text className='cv-profile-info-title'>
															Fecha:{' '}
														</Text>
														<Text className='cv-profile-info-description'>
															12/45/544
														</Text>
													</Space>
												</Space>
											</Col>
										</Row>
									</Layout>
								</Card>
							</Col>

							<Header className='cv-perfil-title-main-container'>
								<HeartOutlined className='cv-perfil-title-main-icon' />
								<h3 className='cv-perfil-title-main-title'>
									Cuentas Asociadas
								</h3>
							</Header>

							<Col span={24}>
								<Row>
									<Col xs={24} sm={24} md={16} lg={16} xl={16}>
										<Card className='cv-perfil-description-container'>
											<Row>
												<Col
													xs={6}
													sm={6}
													md={6}
													lg={6}
													xl={6}
													className='cv-perfil-account-img-container'>
													<img
														width='100%'
														title='Cuenta'
														alt='Cuenta'
														src='http://pluto.pinsupreme.com/wp-content/uploads/2014/05/AdobeStock_103332683-863x576.jpg'
													/>
												</Col>
												<Col xs={18} sm={18} md={18} lg={18} xl={18}>
													<h3 className='cv-perfil-description-title'>
														Lorem Ipsum
													</h3>
													<p className='cv-perfil-description'>
														Lorem ipsum dolor sit amet, consectetur adipiscing
														elit. Duis sagittis neque nec leo cvaretra porta.
														Duis posuere tincidunt justo, finibus interdum nunc
														ultrices non. Cras consectetur facilisis nulla,
														ultricies cvaretra ante tristique eleifend. Sed
														finibus leo eu arcu auctor tincidunt. Integer
														sagittis, elit vitae volutpat dignissim, arcu sapien
														vehicula ex, non bibendum ante lorem in tortor.
													</p>
												</Col>
											</Row>
										</Card>
									</Col>
									<Col
										className='cv-perfil-planes-container'
										xs={24}
										sm={24}
										md={8}
										lg={8}
										xl={8}>
										<Card>
											<div className='cv-perfil-plans-content-plan'>
												<img
													className='cv-perfil-plans-images-plan'
													title='Plan'
													alt='Plan'
													src='http://pluto.pinsupreme.com/wp-content/uploads/2014/05/AdobeStock_103332683-100x100.jpg'
												/>
												<h3 className='cv-perfil-plans-title-plan-title'>
													Descripcion
												</h3>
												<h4 className='cv-perfil-plans-title-plan-title-price'>
													Precio: 10.00
												</h4>
											</div>
											<div className='cv-perfil-plans-content-plan'>
												<img
													className='cv-perfil-plans-images-plan'
													title='Plan'
													alt='Plan'
													src='http://pluto.pinsupreme.com/wp-content/uploads/2014/05/AdobeStock_103332683-100x100.jpg'
												/>
												<h3 className='cv-perfil-plans-title-plan-title'>
													Descripcion
												</h3>
												<h4 className='cv-perfil-plans-title-plan-title-price'>
													Precio: 10.00
												</h4>
											</div>
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
export default Profile
