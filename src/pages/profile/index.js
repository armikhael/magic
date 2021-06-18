/** @format */

import React from 'react'
import { Layout, Row, Col, Card, Typography } from 'antd'
import { LinkOutlined, HeartOutlined } from '@ant-design/icons'

import Loading from '../../components/Loading/Loading'

import './style.css'
import LinkTree from './components/LinkTree'
import Accounts from './components/Accounts'
import ChangePassword from './components/ChangePassword'
import { serviceGetAccountsByEmail } from './services'

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
										<LinkOutlined className='cv-perfil-title-main-icon' />
										<h3 className='cv-perfil-title-main-title'>Enlaces Personalizados</h3>
									</Header>
								</Content>
								<Card className='cv-profile-main-container'>
									<LinkTree
										componentData={this.state.links}
										componentDelete={this.handleDeleteLinkTree}
									/>
								</Card>

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

								<ChangePassword componentData={this.state.userProfile} />
							</Col>
						</Row>
					</Layout>
				</div>
			</>
		)
	}
}
