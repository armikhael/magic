/** @format */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'antd'

import RadioField from '../../../../components/Form/Radio'

import { serviceGetData } from './services'

const AccountAditional = (props) => {
	const [form] = Form.useForm()
	const [data, setData] = useState()

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		console.log(response)
		setData(response)
	}

	useEffect(() => {
		console.log('useEffects')
		fetchData(props.match.params.name)
	}, [props])

	const handleOnFinish = (item) => {
		console.log(item)
	}

	return (
		<>
			{data !== undefined && (
				<ul>
					<br></br>
					<br></br>
					<li>
						<Link to={`/profile/account-biography`}> Crear </Link>
					</li>
					<li>
						<Link to={'/profile/account-plans/publicidadcreativa-instagram'}> Planes </Link>
					</li>
					<li>
						<Link to={'/profile/account-more/publicidadcreativa-instagram'}> Detalles </Link>
					</li>
					<li>
						Datos adicionales
						<Form form={form} initialValues={data} onFinish={handleOnFinish}>
							<div className='ph-auth-login-form-container'>
								<RadioField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'¿Eres marca personal o negocio?'}
									componentName={'type_account'}
									componentButtonStyle={'solid'}
									componentOptions={[{ name: 'Marca Personal', value: 'personal' }]}
								/>
							</div>
							<Form.Item>
								<Button
									form='formPlans'
									key='submit'
									htmlType='submit'
									className={'cv-auth-login-main-button-submit'}>
									Agregar Plan
								</Button>
							</Form.Item>
						</Form>
					</li>
				</ul>
			)}
		</>
	)
}

export default AccountAditional
