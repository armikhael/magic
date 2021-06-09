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
	const [param, setParam] = useState()
	const [data, setData] = useState()
	const [isEdit, setEdit] = useState(false)
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
		setParam(props.match.params.name)
		fetchData(props.match.params.name)
		setEdit(true)
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
			{isEdit === true && <p>Parametro: {param}</p>}
			{data !== undefined && (
				<div className='cv-account-wizzard-content'>
					<Card
						className='cv-account-wizzard-card mt20'
						title='Datos de la cuenta'
						bordered={false}>
						Datos de los paquetes
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
								<List
									header={<div>Enlaces Agregados</div>}
									bordered
									dataSource={plans}
									renderItem={(item, key) => (
										<List.Item>
											<Typography.Text>
												{item.quantity} - {item.description} - {item.price} - {item.currency}
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
							)}
							<br></br>
							<Form.Item className='cv-right'>
								<Button onClick={handleSubmit} className={'cv-account-wizzard-button-submit'}>
									{buttonText}
								</Button>
							</Form.Item>
						</Form>
						<Divider></Divider>
					</Card>
				</div>
			)}
			<Divider></Divider>
		</>
	)
}

export default AccountPlans
