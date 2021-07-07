/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, notification, Card, Row, Col } from 'antd'

import { CONSTANTS } from '../../../../../components/ServiceCommons/Constant'
import InputField from '../../../../../components/Form/Input'
import SelectField from '../../../../../components/Form/Select'

import { serviceCreateData } from './services'
import insterfaceForm from './interface'
import './style.css'

export default function AccountUser(props) {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [redSocial, setRedSocial] = useState([])
	const [user, setUser] = useState()

	useEffect(() => {
		setData(insterfaceForm())
		setRedSocial([...CONSTANTS.RED_SOCIAL])
		setUser(JSON.parse(localStorage.getItem('user')))
		console.log('useEffects')
	}, [props])

	const handleOnFinish = (item) => {
		item.email = user.email
		item.name = `${item.account}-${item.type}`
		console.log(item)
		serviceCreateData(item).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				console.log(response.data.name)
				history.push(`/profile/account-biography/${response.data.name}`)
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
				<Row justify='center'>
					<Col xs={23} sm={20} xl={10}>
						<div className='cv-account-wizzard-content'>
							<Card
								className='cv-account-wizzard-card mt100'
								title='Creación de la cuenta (1/4)'
								bordered={false}>
								<Form form={form} initialValues={data} onFinish={handleOnFinish}>
									<SelectField
										componentClass={'cv-auth-login-field-input'}
										componentLabel={'Red Social'}
										componentName={'type'}
										componentMode={'single'}
										componentPlaceholder={'Seleccione una opción'}
										componentOptions={redSocial}
										componentRules={'rulesSelect'}
									/>
									<InputField
										componentClass={'cv-auth-login-field-input'}
										componentName={'account'}
										componentLabel={'Nombre de tu usuario'}
										componentRules={'rulesAccount'}
										componentPlaceholder={'Usuario'}
										componentType={'text'}
										componentValue={data.account}
									/>
									<Form.Item className='cv-right'>
										<Button htmlType={'submit'} className={'cv-account-wizzard-button-submit'}>
											Siguiente
										</Button>
									</Form.Item>
								</Form>
							</Card>
						</div>
					</Col>
				</Row>
			)}
		</>
	)
}
