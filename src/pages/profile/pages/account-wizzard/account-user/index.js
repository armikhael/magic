/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, notification } from 'antd'

import { CONSTANTS } from '../../../../../components/ServiceCommons/Constant'
import InputField from '../../../../../components/Form/Input'
import SelectField from '../../../../../components/Form/Select'

import { serviceCreateData } from './services'
import insterfaceForm from './interface'
import './style.css'

const AccountUser = (props) => {
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
		item.image = process.env.REACT_APP_LOGO
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
				<ul>
					<br></br>
					<br></br>
					<li>
						Creación de la cuenta
						<Form form={form} initialValues={data} onFinish={handleOnFinish}>
							<div className='ph-auth-login-form-container'>
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
							</div>

							<Form.Item>
								<Button htmlType={'submit'} className={'cv-auth-login-main-button-submit'}>
									Siguiente
								</Button>
							</Form.Item>
						</Form>
					</li>
				</ul>
			)}
		</>
	)
}

export default AccountUser
