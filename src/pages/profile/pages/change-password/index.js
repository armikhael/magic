/** @format */

import React, { useState } from 'react'
import { Layout, Card, Button, Form, notification, Row, Col } from 'antd'
import { ApiOutlined } from '@ant-design/icons'

import InputField from '../../../../components/Form/Input'

import { serviceUpdateData } from './services'
const { Header } = Layout

const ChangePassword = (props) => {
	const [form] = Form.useForm()
	const [user] = useState(JSON.parse(localStorage.getItem('user')))

	const handleOnFinish = (item) => {
		item.email = user.email
		console.log(item)
		serviceUpdateData(item).then((response) => {
			console.log(response)
			form.resetFields(['password', 'new_password'])
			if (response.statusCode === 200) {
				notification['success']({
					message: `Felicidades!`,
					description: `Su contraseña ha sido cambiada con éxito`,
				})
			} else {
				notification['error']({
					message: `Ups!`,
					description: `${response.message}`,
				})
			}
		})
	}

	return (
		<>
			{user.autentication !== 'google' && (
				<Layout className='cv-perfil-main-container'>
					<Row justify='center'>
						<Col xs={22} sm={12} md={8}>
							<Header className='cv-perfil-title-main-container'>
								<ApiOutlined className='cv-perfil-title-main-icon' />
								<h3 className='cv-perfil-title-main-title'>Cambiar Contraseña</h3>
							</Header>
							<Card className='cv-profile-main-container'>
								<Layout className='cv-profile-container'>
									<Form form={form} onFinish={handleOnFinish}>
										<div className='ph-auth-login-form-container'>
											<InputField
												componentClass={'cv-auth-login-field-input'}
												componentName={'password'}
												componentLabel={'Contraseña Actual'}
												componentRules={'rulesPassword'}
												componentPlaceholder={'Ingrese su contraseña'}
												componentType={'password'}
											/>

											<InputField
												componentClass={'cv-auth-login-field-input'}
												componentName={'new_password'}
												componentLabel={'Contraseña Actual'}
												componentRules={'rulesPassword'}
												componentPlaceholder={'Ingrese tu nueva contraseña'}
												componentType={'password'}
											/>
											<Form.Item>
												<Button
													htmlType={'submit'}
													className={'cv-profile-button-submit-change-password'}>
													Confirmar
												</Button>
											</Form.Item>
										</div>
									</Form>
								</Layout>
							</Card>
						</Col>
					</Row>
				</Layout>
			)}
		</>
	)
}

export default ChangePassword
