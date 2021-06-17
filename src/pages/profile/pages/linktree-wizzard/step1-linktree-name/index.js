/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, notification, Card, Divider } from 'antd'

import InputField from '../../../../../components/Form/Input'

import { serviceCreateData } from './services'
import './style.css'

export default function LinkTreeName(props) {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [user] = useState(JSON.parse(localStorage.getItem('user')))

	useEffect(() => {
		setData({ name: '' })
		console.log('useEffects')
	}, [props])

	const handleOnFinish = (item) => {
		item.email = user.email
		serviceCreateData(item).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				console.log(response.data)
				notification['success']({
					message: `Felicidades!`,
					description: `Fue reservado tu nombre de forma exitosa.`,
				})
				setTimeout(() => {
					history.push(`/profile/linktree-info/${response.data.name}`)
				}, 2000)
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
			{data !== undefined && (
				<div className='cv-account-wizzard-content'>
					<Card
						className='cv-account-wizzard-card mt100'
						title='Creación de la cuenta (1/3)'
						bordered={false}>
						<Form form={form} initialValues={data} onFinish={handleOnFinish}>
							<InputField
								componentClass={'cv-auth-login-field-input'}
								componentName={'name'}
								componentLabel={'Nombre Personalizado de tu enlace'}
								componentRules={'rulesAccount'}
								componentPlaceholder={'Escribe el nombre de tu enlace'}
								componentType={'text'}
								componentValue={data.name}
							/>
							<Divider></Divider>
							<Form.Item className='cv-right'>
								<Button htmlType={'submit'} className={'cv-account-wizzard-button-submit'}>
									Siguiente
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</div>
			)}
		</>
	)
}
