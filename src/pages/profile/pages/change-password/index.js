/** @format */

import React, { useState } from 'react'
import { Layout, Card, Button, Form, notification } from 'antd'
import { ApiOutlined } from '@ant-design/icons'

import InputField from '../../../../components/Form/Input'

import { serviceUpdateData } from './services'

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
				<Card className='cv-profile-main-container'>
					<h3 className='cv-perfil-title-main-title'>
						<ApiOutlined className='cv-perfil-title-main-icon' />
						Cambiar Contraseña
					</h3>
					<br />
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
									<Button htmlType={'submit'} className={'cv-profile-button-submit-change-password'}>
										Confirmar
									</Button>
								</Form.Item>
							</div>
						</Form>
					</Layout>
				</Card>
			)}
		</>
	)
}

export default ChangePassword
