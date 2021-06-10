/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Divider, List, Typography, notification, Card } from 'antd'

import InputField from '../../../../../components/Form/Input'
import SelectConstantField from '../../../../../components/Form/SelectConstant'

import { CONSTANTS } from '../../../../../components/ServiceCommons/Constant'

import { serviceGetData, serviceUpdateData } from './services'

const AccountPlans = (props) => {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [quantities, setQuantities] = useState([])
	const [concepts, setConcepts] = useState([])
	const [currencies, setCurrencies] = useState()
	const [plans, setPlans] = useState([])
	const [isModify, setIsModify] = useState(false)
	const [buttonText, setButtonText] = useState('Continuar')

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		setData(response)
		setPlans(response.plans)
		setConcepts([...CONSTANTS.TYPE_POST[response.type]])
	}

	useEffect(() => {
		console.log('edit')
		if (props.match.params.modify) {
			setIsModify(true)
			setButtonText('Actualizar')
		}
		fetchData(props.match.params.name)
		setQuantities([...CONSTANTS.QUANTITY_POST])
		setCurrencies([...CONSTANTS.CURRENCY])
		console.log('useEffects')
	}, [props])

	const handleAddPlans = (item) => {
		plans.push(item)
		setPlans([...plans])
		form.resetFields(['quantity', 'description', 'price', 'currency'])
	}

	const handleDelete = (e) => {
		setPlans(
			plans.filter((item, key) => {
				return key !== e
			})
		)
	}

	const handleButtonSkip = () => {
		let redirect = `/profile/account-details/${props.match.params.name}`
		if (isModify === true) {
			redirect = `/profile/`
		}
		return (
			<>
				<Button
					onClick={() => {
						history.push(redirect)
					}}
					className={'cv-account-wizzard-button-submit'}>
					Omitir
				</Button>
			</>
		)
	}

	const handleSubmit = () => {
		let item = {}
		item.plans = plans
		item._id = data._id
		serviceUpdateData(item).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				if (isModify === false) {
					history.push(`/profile/account-details/${response.data.name}`)
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
					<Card className='cv-account-wizzard-card mt20' title='Datos de los Paquetes (3/4)' bordered={false}>
						<Form id='formPlans' form={form} initialValues={data} onFinish={handleAddPlans}>
							<div className='ph-auth-login-form-container'>
								<SelectConstantField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Cantidad'}
									componentName={'quantity'}
									componentMode={'single'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={quantities}
									componentRules={'rulesSelect'}
								/>

								<SelectConstantField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Tipo de Publicación'}
									componentName={'description'}
									componentMode={'single'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={concepts}
									componentRules={'required'}
								/>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'price'}
									componentLabel={'Precio'}
									componentPlaceholder={'Precio'}
									componentType={'text'}
									componentValue={data.price}
									componentRules={'rulesPrice'}
								/>

								<SelectConstantField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Tipo de Moneda'}
									componentName={'currency'}
									componentMode={'single'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={currencies}
									componentRules={'required'}
								/>
							</div>
							<br></br>
							<Form.Item>
								<Button htmlType='submit' className={'cv-auth-login-main-button-submit'}>
									Agregar Plan
								</Button>
							</Form.Item>

							{plans.length > 0 && (
								<>
									<Divider></Divider>
									<List
										header={<div>Enlaces Agregados</div>}
										bordered
										dataSource={plans}
										renderItem={(item, key) => (
											<List.Item>
												<Typography.Text>
													{item.quantity} - {item.description} - {item.price} -{' '}
													{item.currency}
												</Typography.Text>
												<Button
													danger
													type='link'
													shape='round'
													onClick={() => {
														handleDelete(key)
													}}>
													Eliminar
												</Button>
											</List.Item>
										)}
									/>
								</>
							)}
							<Divider></Divider>
							<Form.Item className='cv-right'>
								<Button onClick={handleSubmit} className={'cv-account-wizzard-button-submit'}>
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

export default AccountPlans
