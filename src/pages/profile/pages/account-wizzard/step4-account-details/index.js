/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, notification, Card, Row, Col } from 'antd'

import { CONSTANTS } from '../../../../../components/ServiceCommons/Constant'
import RadioField from '../../../../../components/Form/Radio'

import { serviceGetData, serviceUpdateData } from './services'
import './style.css'

const AccountDetails = (props) => {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [isModify, setIsModify] = useState(false)
	const [buttonText, setButtonText] = useState('Finalizar')

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		console.log('init', response)
		setData(response)
	}

	useEffect(() => {
		if (props.match.params.modify) {
			setIsModify(true)
			setButtonText('Actualizar')
		}
		fetchData(props.match.params.name)
		console.log('useEffects')
	}, [props])

	const handleButtonSkip = () => {
		if (isModify === true) {
			return (
				<>
					<Button
						onClick={() => {
							history.push(`/profile/accounts`)
						}}
						className={'cv-account-wizzard-button-submit'}>
						Omitir
					</Button>
				</>
			)
		}
	}
	const handleOnFinish = (item) => {
		item._id = data._id
		serviceUpdateData(item).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				if (isModify === false) {
					history.push(`/profile/account-activation/${response.data.name}`)
				} else {
					history.push(`/profile/accounts`)
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
				<Row justify='center'>
					<Col xs={23} sm={20} xl={12}>
						<div className='cv-account-wizzard-content'>
							<Card className='cv-account-wizzard-card mt20' title='HMás sobre tí (4/4)' bordered={false}>
								<Form form={form} initialValues={data} onFinish={handleOnFinish}>
									<div className='ph-auth-login-form-container'>
										<RadioField
											componentClass={'cv-auth-login-field-input'}
											componentLabel={'¿Harías publicidad "Gratis" para ayudar a otras personas?'}
											componentName={'gofoundme'}
											componentButtonStyle={'solid'}
											componentOptions={[...CONSTANTS.BOOLEAN]}
										/>
									</div>
									<div className='ph-auth-login-form-container'>
										<RadioField
											componentClass={'cv-auth-login-field-input'}
											componentLabel={'¿Tienes experiencia en teatro?'}
											componentName={'theater'}
											componentButtonStyle={'solid'}
											componentOptions={[...CONSTANTS.BOOLEAN]}
										/>
									</div>
									<div className='ph-auth-login-form-container'>
										<RadioField
											componentClass={'cv-auth-login-field-input'}
											componentLabel={'¿Tienes experiencia en cine?'}
											componentName={'cinema'}
											componentButtonStyle={'solid'}
											componentOptions={[...CONSTANTS.BOOLEAN]}
										/>
									</div>

									<div className='ph-auth-login-form-container'>
										<RadioField
											componentClass={'cv-auth-login-field-input'}
											componentLabel={'¿Tienes experiencia en sesiones de fotos?'}
											componentName={'photoshoot'}
											componentButtonStyle={'solid'}
											componentOptions={[...CONSTANTS.BOOLEAN]}
										/>
									</div>

									{data.categories[0] === 'modelo' && (
										<>
											<div className='ph-auth-login-form-container'>
												<RadioField
													componentClass={'cv-auth-login-field-input'}
													componentLabel={'¿Tienes experiencia en pasarela?'}
													componentName={'runway'}
													componentButtonStyle={'solid'}
													componentOptions={[...CONSTANTS.BOOLEAN]}
												/>
											</div>
										</>
									)}
									<Form.Item className='cv-right'>
										<Button htmlType='submit' className={'cv-account-wizzard-button-submit'}>
											{buttonText}
										</Button>
										{handleButtonSkip()}
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

export default AccountDetails
