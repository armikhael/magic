/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, notification } from 'antd'

import { CONSTANTS } from '../../../../../components/ServiceCommons/Constant'
import RadioField from '../../../../../components/Form/Radio'

import { serviceGetData, serviceUpdateData } from './services'

const AccountDetails = (props) => {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [param, setParam] = useState()
	const [isModify, setIsModify] = useState(false)
	const [buttonText, setButtonText] = useState('Finalizar')

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		setData(response)
	}

	useEffect(() => {
		if (props.match.params.modify) {
			setIsModify(true)
			setButtonText('Actualizar')
		}
		setParam(props.match.params.name)
		fetchData(props.match.params.name)
		console.log('useEffects')
	}, [props])

	const handleOnFinish = (item) => {
		item._id = data._id
		serviceUpdateData(item).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				if (isModify === false) {
					history.push(`/profile/account-activation/${response.data.type}`)
				} else {
					history.push(`/profile`)
				}
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
						Datos adicionales: {param}
						<Form form={form} initialValues={data} onFinish={handleOnFinish}>
							<div className='ph-auth-login-form-container'>
								<RadioField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'¿Cómo defines tu cuenta?'}
									componentName={'business'}
									componentButtonStyle={'solid'}
									componentOptions={[...CONSTANTS.TYPE_ACCOUNT]}
								/>
								<RadioField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'¿Harías publicidad "Gratis" a personas de GoFounMe?'}
									componentName={'gofoundme'}
									componentButtonStyle={'solid'}
									componentOptions={[...CONSTANTS.GOFOUNDME]}
								/>
							</div>
							<Form.Item>
								<Button htmlType='submit' className={'cv-auth-login-main-button-submit'}>
									{buttonText}
								</Button>
							</Form.Item>
						</Form>
					</li>
				</ul>
			)}
		</>
	)
}

export default AccountDetails
