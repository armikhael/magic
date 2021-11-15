/** @format */

import React, { useState } from 'react'
import { Layout, Card, Button, Form, notification, Row, Col, Result } from 'antd'
import { SafetyOutlined, SmileOutlined } from '@ant-design/icons'

import InputField from '../../../../components/Form/Input'

import { serviceUpdateData } from './services'
import './style.css'

const { Header } = Layout

export default function ChangePassword() {
	const [form] = Form.useForm()
	const [user] = useState(JSON.parse(localStorage.getItem('user')))

	const handleOnFinish = (item) => {
		item.email = user.email
		serviceUpdateData(item).then((response) => {
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
			<div className='cv-global-main-container'>
				<Header className='cv-profile-header'>
					<h3 className='cv-profile-header-title'>
						{' '}
						<SafetyOutlined className='cv-profile-card-item-img-icon' /> Cambiar contraseña
					</h3>
				</Header>
				<div className='cv-profile-header-sub-title'>
					<a href='/profile' rel='noopener noreferrer'>
						{' '}
						Tu cuenta
					</a>
				</div>
				<Row justify='center'>
					{user.autentication !== 'google' && (
						<Col xs={24} sm={24} md={16} className='cv-profile-content-change-password'>
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
											<div
												className={'cv-profile-button-submit-change-password-content'}>
												<Form.Item>
													<Button
														htmlType={'submit'}
														className={'cv-profile-button-submit-change-password'}>
														Confirmar
													</Button>
												</Form.Item>
											</div>
										</div>
									</Form>
								</Layout>
							</Card>
						</Col>
					)}
					{user.autentication === 'google' && (
						<Col xs={24} sm={24} md={16} className='cv-profile-content-change-password'>
							<Card className='cv-profile-main-container'>
								<Result
									icon={<SmileOutlined />}
									title='Google sesión'
									subTitle='Si iniciaste sesión con Google no es necesario que cambies tu contraseña.'
									extra={
										<Button href='/profile' type='primary'>
											Tu cuenta
										</Button>
									}
								/>
							</Card>
						</Col>
					)}
				</Row>
			</div>
		</>
	)
}
