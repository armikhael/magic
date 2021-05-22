/** @format */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Divider, List, Typography } from 'antd'

import InputField from '../../../../components/Form/Input'
import SelectField from '../../../../components/Form/Select'
import SelectConstantField from '../../../../components/Form/SelectConstant'

import TextAreaField from '../../../../components/Form/TextArea'

import { serviceGetCategories } from '../../../../components/ServiceCommons/GetCategory'
import { serviceGetCountry } from '../../../../components/ServiceCommons/GetCountry'
import { CONSTANTS } from '../../../../components/ServiceCommons/Constant'

import { serviceGetData } from './services'
import insterfaceForm from './interface'

const CreateLink = (props) => {
	const [formPlans] = Form.useForm()
	const [formAccount] = Form.useForm()
	const [param, setParam] = useState()
	const [data, setData] = useState()
	const [isEdit, setEdit] = useState(false)
	const [categories, setCategories] = useState([])
	const [countries, setCountries] = useState([])
	const [redSocial, setRedSocial] = useState([])
	const [quantities, setQuantities] = useState([])
	const [concepts, setConcepts] = useState([])
	const [listCountry, setListCountry] = useState([])
	const [currencies, setCurrencies] = useState()
	const [code, setCode] = useState()
	const [plans, setPlans] = useState([])
	const [disabled, setDisabled] = useState(false)

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		if (response === undefined) {
			alert('Error, ruta no encontrada')
		} else {
			console.log(response)
			setData(response)
			setPlans(response.plans)
			setConcepts([...CONSTANTS.TYPE_POST[response.type]])
		}
	}

	useEffect(() => {
		if (props.match.params.name) {
			console.log('edit')
			setParam(props.match.params.name)
			fetchData(props.match.params.name)
			setEdit(true)
			setDisabled(true)
		} else {
			console.log('create')
			serviceGetCategories().then((data) => {
				let result = data.map((item) => {
					return {
						value: item.name,
						name: item.name,
					}
				})
				setCategories([...result])
			})

			serviceGetCountry().then((data) => {
				setListCountry(data)
				let result = data.map((item) => {
					return {
						value: item.name.toLowerCase(),
						name: item.name,
					}
				})
				setCountries([...result])
			})
			setData(insterfaceForm())
		}

		setQuantities([...CONSTANTS.QUANTITY_POST])
		setRedSocial([...CONSTANTS.RED_SOCIAL])
		setCurrencies([...CONSTANTS.CURRENCY])

		console.log('useEffects')
	}, [props])

	const handleChangeRedSocial = (item) => {
		setConcepts([...CONSTANTS.TYPE_POST[item]])
	}

	const handleChangeCountry = (item) => {
		const findCurrency = listCountry.find((iterator) => {
			return iterator.name.toLowerCase() === item
		})
		setCode(findCurrency.code)
	}

	const handleAddPlans = (item) => {
		plans.push(item)
		setPlans([...plans])
		formPlans.resetFields(['quantity', 'description', 'price', 'currency'])
		console.log(plans)
	}

	const handleDelete = (e) => {
		setPlans(
			plans.filter((item, key) => {
				return key !== e
			})
		)
	}

	const handleOnFinish = (item) => {
		item.code = code
		item.plans = plans
		delete item.amount
		delete item.quantity
		delete item.concept
		console.log(item)

		// serviceCreateData(item).then((data) => {
		// 	console.log(data)
		// })
	}

	return (
		<>
			{isEdit === true && <p>Parametro: {param}</p>}
			{data !== undefined && (
				<ul>
					<li>
						<Link to={`/profile/edit-account/${param}`}> Editar </Link>
					</li>
					<li>
						<Link to={'/profile/create-account'}> Crear </Link>
					</li>
					<li>
						Datos de la cuenta
						<Form id='formAccount' form={formAccount} initialValues={data} onFinish={handleOnFinish}>
							<div className='ph-auth-login-form-container'>
								<SelectField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Red Social'}
									componentName={'type'}
									componentMode={'single'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={redSocial}
									componentDisabled={disabled}
									componentRules={'rulesSelect'}
									componentOnChange={handleChangeRedSocial}
								/>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'name'}
									componentLabel={'Nombre de tu usuario'}
									componentRules={'rulesAccount'}
									componentMessage={'Usuario'}
									componentType={'text'}
									componentValue={data.name}
									componentDisabled={disabled}
								/>

								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'followers'}
									componentLabel={'Cantidad de Seguidores'}
									componentMessage={'Seguidores'}
									componentType={'text'}
									componentRules={'rulesFollowers'}
									componentValue={data.followers}
								/>

								<TextAreaField
									componentClass={'cv-auth-login-field-input'}
									componentName={'biography'}
									componentLabel={'Biografía'}
									componentPlaceholder={'Resumen'}
									componentRows={4}
									componentRules={'required'}
									componentValue={data.biography}
								/>

								<SelectField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'¿País de residencia?'}
									componentName={'country'}
									componentOnChange={handleChangeCountry}
									componentPlaceholder={'Seleccione una opción'}
									componentRules={'rulesSelect'}
									componentOptions={countries}
								/>

								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'phone'}
									componentLabel={'Número de Conacto'}
									componentMessage={'WhatsApp'}
									componentType={'text'}
									componentRules={'rulesPhone'}
									componentValue={data.phone}
								/>

								<SelectField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Categorías'}
									componentName={'categories'}
									componentMode={'multiple'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={categories}
									componentRules={'rulesSelect'}
									componentMaxTagCount={5}
								/>
							</div>

							<Form.Item>
								<Button htmlType={'submit'} className={'cv-auth-login-main-button-submit'}>
									Crear Cuenta
								</Button>
							</Form.Item>
						</Form>
					</li>
					<li>
						Datos de los paquetes
						<Form id='formPlans' form={formPlans} initialValues={data} onFinish={handleAddPlans}>
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
									componentMessage={'Precio'}
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
						<Divider></Divider>
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
					</li>
					<li>Datos adicionales</li>
				</ul>
			)}
			<Divider></Divider>
		</>
	)
}

export default CreateLink
