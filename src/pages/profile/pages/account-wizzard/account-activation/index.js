/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Row, Result, Col, Button, Form, notification } from 'antd'

import InputField from '../../../../../components/Form/Input'

import { serviceGetData, serviceUpdateData } from './services'
import './style.css'

const { Content } = Layout

const AccountActivation = (props) => {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [urlRedirect, setUrlRedirect] = useState()
	const [textActivation, setTextActivation] = useState()

	useEffect(() => {
		serviceGetData(props.match.params.name).then((response) => {
			console.log('promesa', response)
			setData(response)
			handleText(response)
		})
		console.log('useEffects')
	}, [props])

	const handleText = (item) => {
		if (item.type === 'instagram') {
			setTextActivation(
				'Ahora para activar tu cuenta solo debes solicitar tu código de activación por Mensaje Directo (DM) a nuestro equipo Instagram'
			)
			setUrlRedirect('https://www.instagram.com/cuentasvirales')
		}

		if (item.type === 'tiktok') {
			setTextActivation(
				'Ahora para activar tu cuenta solo debes solicitar tu código de activación por Mensaje Privado a nuestro equipo en TikTok'
			)
			setUrlRedirect('https://www.tiktok.com/@cuentasvirales')
		}

		if (item.type === 'facebook') {
			setTextActivation(
				'Ahora para activar tu cuenta solo debes solicitar tu código de activación por Messenger a nuestro equipo en Facebook'
			)
			setUrlRedirect('https://www.facebook.com/c.viralesfb')
		}
	}

	const handleOnFinish = (item) => {
		if (item.activation === btoa(data.name)) {
			item._id = data._id
			item.eneable = true
			serviceUpdateData(item).then((response) => {
				console.log(response)
				if (response.statusCode === 200) {
					notification['success']({
						message: `Felicidades!`,
						description: `Ahora veremos como se ve tu cuenta`,
					})
					setTimeout(() => {
						history.push(`/${response.data.name}`)
					}, 1000)
				} else {
					notification['error']({
						message: `Ups!`,
						description: `${response.message}`,
					})
				}
			})
		} else {
			notification['error']({
				message: `Ups!`,
				description: `El código es incorrecto`,
			})
		}
	}

	return (
		<>
			{data !== undefined && (
				<Row justify='center'>
					<Col xs={23} sm={20} xl={10}>
						<Content className='cv-profile-activation-content'>
							<Result
								className='cv-profile-activation-result'
								status='success'
								title='¡Sólo te queda un paso!'
								subTitle={textActivation}
								extra={[
									<br key='br' />,
									<img
										key='img'
										className='cv-profile-activation-img-logo'
										src={process.env.REACT_APP_LOGO}
										style={{ width: 80 }}
										alt='Cuentas Virales'
									/>,
									<h3 key='h3-code'>
										<Button
											key='code'
											shape='round'
											onClick={() => {
												window.open(urlRedirect)
											}}>
											Solicitar Código de Activación
										</Button>
									</h3>,
									<h3 key='h3-profile'>
										<Button
											key='profile'
											shape='round'
											onClick={() => {
												history.push(`/profile/accounts`)
											}}>
											Mis Cuentas
										</Button>
									</h3>,
								]}
							/>

							<Form form={form} initialValues={data} onFinish={handleOnFinish}>
								<div className='ph-auth-login-form-container'>
									<InputField
										componentClass={'cv-auth-login-field-input'}
										componentName={'activation'}
										componentLabel={'Código de Activación'}
										componentPlaceholder={'Ingrese su Código'}
										componentType={'text'}
									/>
								</div>

								<Form.Item className='cv-right'>
									<Button htmlType={'submit'} className={'cv-account-wizzard-button-submit'}>
										Activar
									</Button>
								</Form.Item>
							</Form>
						</Content>
					</Col>
				</Row>
			)}
		</>
	)
}

export default AccountActivation
