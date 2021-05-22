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
	const [form] = Form.useForm()
	const [param, setParam] = useState()
	const [data, setData] = useState()
	const [isEdit, setEdit] = useState(false)
	const [categories, setCategories] = useState([])
	const [countries, setCountries] = useState([])
	const [redSocial, setRedSocial] = useState([])
	const [quantities, setQuantities] = useState([])
	const [concepts, setConcepts] = useState([])
	const [listCountry, setListCountry] = useState([])
	const [currency, setCurrency] = useState()
	const [code, setCode] = useState()
	const [quantity, setQuantity] = useState()
	const [concept, setConcept] = useState()
	const [amount, setAmout] = useState()
	const [plans, setPlans] = useState([])

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		if (response === undefined) {
			alert('Error, ruta no encontrada')
		} else {
			console.log('daa')
		}
	}

	useEffect(() => {
		if (props.match.params.name) {
			console.log('edit')
			setParam(props.match.params.name)
			fetchData(props.match.params.name)
			setEdit(true)
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
			setQuantities([...CONSTANTS.QUANTITY_POST])
			setRedSocial([...CONSTANTS.RED_SOCIAL])
			setConcepts([])
		}
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
		setCurrency(findCurrency.currency)
	}

	const handleAddPlans = () => {
		plans.push({
			quantity: quantity,
			description: concept,
			price: amount,
			currency: currency,
		})
		setPlans([...plans])
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
		item.currency = currency
		item.plans = plans
		console.log(item)
	}

	return (
		<>
			{isEdit === true && <p>Parametro: {param}</p>}
			{categories.length > 0 && (
				<ul>
					<li>
						<Link to={`/profile/edit-account/${param}`}> Editar </Link>
					</li>
					<li>
						<Link to={'/profile/create-account'}> Crear </Link>
					</li>
					<li>
						<Form name='account' form={form} initialValues={data} onFinish={handleOnFinish}>
							<div className='ph-auth-login-form-container'>
								<SelectField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Red Social'}
									componentName={'type'}
									componentMode={'single'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={redSocial}
									componentOnChange={handleChangeRedSocial}
								/>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'name'}
									componentLabel={'Nombre de tu usuario'}
									componentRule={true}
									componentMessage={'Usuario'}
									componentType={'text'}
									componentIcon={''}
									componentValue={data.name}
								/>

								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'followers'}
									componentLabel={'Cantidad de Seguidores'}
									componentMessage={'Seguidores'}
									componentType={'text'}
									componentIcon={''}
									componentValue={data.followers}
								/>

								<TextAreaField
									componentClass={'cv-auth-login-field-input'}
									componentName={'biography'}
									componentLabel={'Biografía'}
									componentPlaceholder={'Resumen'}
									componentRows={4}
									componentValue={data.biography}
								/>

								<hr />
								<SelectField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'¿País de residencia?'}
									componentName={'country'}
									componentOnChange={handleChangeCountry}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={countries}
								/>

								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'phone'}
									componentLabel={'Número de Conacto'}
									componentMessage={'WhatsApp'}
									componentType={'text'}
									componentIcon={''}
									componentValue={data.phone}
								/>

								<SelectField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Categorías'}
									componentName={'categories'}
									componentMode={'multiple'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={categories}
									componentMaxTagCount={5}
								/>

								<hr />

								<SelectConstantField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Cantidad'}
									componentName={'quantity'}
									componentMode={'single'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={quantities}
									componentOnChange={(e) => {
										setQuantity(e)
									}}
								/>

								<SelectConstantField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Tipo de Publicación'}
									componentName={'concept'}
									componentMode={'single'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={concepts}
									componentOnChange={(e) => {
										setConcept(e)
									}}
								/>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'amount'}
									componentLabel={'Precio'}
									componentMessage={'Precio'}
									componentType={'text'}
									componentValue={data.amount}
									componentOnChange={(e) => {
										setAmout(e.target.value)
									}}
								/>
							</div>
							<Button
								className={'cv-auth-login-main-button-submit'}
								onClick={() => {
									handleAddPlans()
								}}>
								Agregar
							</Button>
							<Form.Item>
								<Button htmlType={'submit'} className={'cv-auth-login-main-button-submit'}>
									Enviar
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
				</ul>
			)}
			<Divider></Divider>
		</>
	)
}

export default CreateLink
