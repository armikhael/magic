/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import {
	Avatar,
	Badge,
	Row,
	Col,
	Drawer,
	Form,
	Button,
	Input,
	Select,
} from 'antd'
import {
	NotificationOutlined,
	PlusOutlined,
	UserOutlined,
} from '@ant-design/icons'

import { serviceGetInstagramAccount } from '../../../../pages/profile/create-account/services'

import './style.css'

const { Option } = Select

class User extends React.Component {
	state = { 
		visible: false,
		account: {}
	}

	showDrawer = () => {
		this.setState({
			visible: true,
		})
	}

	onClose = () => {
		this.setState({
			visible: false,
		})
	}

	handleFindAccount = async (e) => {
		if (e.key === 'Enter') {
			console.log(e.target.value);
			await serviceGetInstagramAccount(e.target.value).then((data) => {			
				const jsonObject = data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)
				const jsonParse = JSON.parse(jsonObject);
				const userInfo = jsonParse.entry_data.ProfilePage[0].graphql.user
				this.setState({
					account: userInfo
				})
				console.log(userInfo);
			})
		}
	}

	render() {
		return (
			<React.Fragment>
				<div className='cv-navbar-user-content'>
					<Row align='middle'>
						<Col xs={8} sm={8} md={8}>
							<PlusOutlined
								style={{ fontSize: '20px' }}
								onClick={this.showDrawer}
							/>
						</Col>
						<Col xs={8} sm={8} md={8}>
							<Badge count={5}>
								<NotificationOutlined style={{ fontSize: '20px' }} />
							</Badge>
						</Col>
						<Col xs={8} sm={8} md={8}>
							<Link to={`/profile`}>
								<Avatar size={28} icon={<UserOutlined />} />
							</Link>
						</Col>
					</Row>
				</div>
				<Drawer
					title='Crear Nueva cuenta'
					width={720}
					onClose={this.onClose}
					visible={this.state.visible}
					bodyStyle={{ paddingBottom: 80 }}
					footer={
						<div
							style={{
								textAlign: 'right',
							}}>
							<Button onClick={this.onClose} style={{ marginRight: 8 }}>
								Cancel
							</Button>
							<Button onClick={this.onClose} type='primary'>
								Crear
							</Button>
						</div>
					}>
					<Form layout='vertical' hideRequiredMark>
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item name='name' label='Email'>
									<Input placeholder='Ingrese su correo electronico' />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name='name'
									label='Nombre'
									rules={[
										{ required: true, message: 'Please enter user name' },
									]}>
									<Input 
										placeholder='Nombre de la cuenta' 
										onKeyDown={this.handleFindAccount}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name='url'
									label='Imagen'
									rules={[
										{ required: true, message: 'Ingresar url de imagen' },
									]}>
									<Input
										style={{ width: '100%' }}
										placeholder='Ingresar url de imagen'
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name='owner'
									label='Categoria'
									rules={[
										{ required: true, message: 'Please select an owner' },
									]}>
									<Select placeholder='Please select an owner'>
										<Option value='xiao'>Xiaoxiao Fu</Option>
										<Option value='mao'>Maomao Zhou</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name='type'
									label='Tipo de Cuenta'
									rules={[
										{ required: true, message: 'Please choose the type' },
									]}>
									<Select placeholder='Please choose the type'>
										<Option value='private'>Private</Option>
										<Option value='public'>Public</Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name='approver'
									label='País'
									rules={[
										{ required: true, message: 'Please choose the approver' },
									]}>
									<Select placeholder='Please choose the approver'>
										<Option value='jack'>Jack Ma</Option>
										<Option value='tom'>Tom Liu</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name='dateTime' label='Número de telefono'>
									<Input.Group>
										<Row gutter={8}>
											<Col span={5}>
												<Input defaultValue='0571' />
											</Col>
											<Col span={8}>
												<Input defaultValue='26888888' />
											</Col>
										</Row>
									</Input.Group>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item
									name='description'
									label='Descripcion'
									rules={[
										{
											required: true,
											message: 'please enter url description',
										},
									]}>
									<Input.TextArea
										rows={4}
										placeholder='please enter url description'
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<p>{JSON.stringify(this.state.account)}</p>
						</Row>
					</Form>
				</Drawer>
			</React.Fragment>
		)
	}
}

export default User
