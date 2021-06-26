/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, notification, Card, Divider } from 'antd'

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
							history.push(`/profile/`)
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
				<div className='cv-account-wizzard-content'>
					<Card className='cv-account-wizzard-card mt20' title='Configuración (4/4)' bordered={false}>
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
									componentOptions={[...CONSTANTS.BOOLEAN]}
								/>
								<RadioField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'¿Harías publicidad con otras cuentas?'}
									componentName={'mention'}
									componentButtonStyle={'solid'}
									componentOptions={[...CONSTANTS.BOOLEAN]}
								/>
								<RadioField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'¿Harías sorteos con otras cuentas?'}
									componentName={'lottery'}
									componentButtonStyle={'solid'}
									componentOptions={[...CONSTANTS.BOOLEAN]}
								/>
								<RadioField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'¿Aceptarías productos por publicidad?'}
									componentName={'product'}
									componentButtonStyle={'solid'}
									componentOptions={[...CONSTANTS.BOOLEAN]}
								/>

								{data.followers >= 5000 && (
									<>
										<RadioField
											componentClass={'cv-auth-login-field-input'}
											componentLabel={'¿Quieres que te representemos con otras marcas?'}
											componentName={'representation'}
											componentButtonStyle={'solid'}
											componentOptions={[...CONSTANTS.BOOLEAN]}
										/>
										<a
											href={
												'https://drive.google.com/file/d/19B0NUi2gnho072zJJmhy8HxZYsnr7DqD/view?usp=sharing'
											}
											target='_blank'
											rel='noopener noreferrer'>
											Políticas de Representación
										</a>
									</>
								)}
							</div>
							<Divider></Divider>
							<Form.Item className='cv-right'>
								<Button htmlType='submit' className={'cv-account-wizzard-button-submit'}>
									{buttonText}
								</Button>
								{handleButtonSkip()}
							</Form.Item>
						</Form>
					</Card>
				</div>
			)}
		</>
	)
}

export default AccountDetails
