/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'antd'

import { CONSTANTS } from '../../../../../components/ServiceCommons/Constant'
import RadioField from '../../../../../components/Form/Radio'

import { serviceGetData, serviceUpdateData } from './services'

const AccountAditional = (props) => {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [param, setParam] = useState()

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		console.log(response)
		setData(response)
	}

	useEffect(() => {
		setParam(props.match.params.name)
		fetchData(props.match.params.name)
		console.log('useEffects')
	}, [props])

	const handleOnFinish = (item) => {
		item._id = data._id
		serviceUpdateData(item).then((response) => {
			history.push(`/profile/activation/${btoa(data.type)}`)
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
									Finalizar
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
