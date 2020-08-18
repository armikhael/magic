/** @format */

import React from 'react'
import { Form } from 'antd'

import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import InputField from '../../../components/Input'

import './style.css'

class CreateAccount extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<div>
				<h1>Crear Cuenta</h1>
				<Form>
					<InputField
						inputName={'email'}
						inputNameLabel={'Correo electrónico'}
						inputNameMessage={'Ingresa tu correo'}
						inputNameType={'text'}
						inputNameIcon={<MailOutlined />}
						inputNameRules={'rulesEmail'}
					/>
					<InputField
						inputName={'name'}
						inputNameLabel={'Nombre de la cuenta'}
						inputNameMessage={'@usuario'}
						inputNameType={'text'}
						inputNameIcon={<UserOutlined />}
						inputNameRules={'rulesText'}
					/>
					<InputField
						inputName={'password'}
						inputNameLabel={'Contraseña'}
						inputNameRule={true}
						inputNameMessage={'Ingresa tu contraseña'}
						inputNameType={'password'}
						inputNameIcon={<LockOutlined />}
						inputNameRules={'rulesPassword'}
					/>
				</Form>

			</div>
		)
	}
}
export default CreateAccount
