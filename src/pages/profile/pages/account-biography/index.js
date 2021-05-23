/** @format */

import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button } from 'antd'

import { CONSTANTS } from '../../../../components/ServiceCommons/Constant'
import InputField from '../../../../components/Form/Input'
import SelectField from '../../../../components/Form/Select'
import TextAreaField from '../../../../components/Form/TextArea'

import { serviceGetCategories } from '../../../../components/ServiceCommons/GetCategory'
import { serviceGetCountry } from '../../../../components/ServiceCommons/GetCountry'

import { serviceGetData, serviceCreateData } from './services'
import insterfaceForm from './interface'

const AccountBiography = (props) => {
	const history = useHistory()
	const [form] = Form.useForm()
	const [param, setParam] = useState()
	const [data, setData] = useState()
	const [isEdit, setEdit] = useState(false)
	const [categories, setCategories] = useState([])
	const [countries, setCountries] = useState([])
	const [redSocial, setRedSocial] = useState([])
	const [listCountry, setListCountry] = useState([])
	const [code, setCode] = useState()
	const [user, setUser] = useState()

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		console.log(response)
		setData(response)
		setEdit(true)
	}

	useEffect(() => {
		if (props.match.params.name) {
			console.log('edit')
			setParam(props.match.params.name)
			fetchData(props.match.params.name)
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
			setRedSocial([...CONSTANTS.RED_SOCIAL])
		}
		setUser(JSON.parse(localStorage.getItem('user')))
		console.log('useEffects')
	}, [props])

	const handleChangeCountry = (item) => {
		const findCurrency = listCountry.find((iterator) => {
			return iterator.name.toLowerCase() === item
		})
		setCode(findCurrency.code)
	}

	const handleOnFinish = (item) => {
		item.email = user.email
		item.name = `${item.account}-${item.type}`
		item.image = process.env.REACT_APP_LOGO
		item.code = code
		console.log(item)
		serviceCreateData(item).then((response) => {
			console.log(response.data.name)
			history.push(`/profile/account-biography/${response.data.name}`)
		})
	}

	return (
		<>
			<p>Parametro: {param}</p>}
			{data !== undefined && (
				<ul>
					<br></br>
					<br></br>
					<li>
						<Link to={`/profile/account-biography`}> Crear - Paso 1</Link>
					</li>
					{isEdit === true && (
						<>
							<li>
								<Link to={`/profile/account-plans/${param}`}> Planes - Paso 2</Link>
							</li>
							<li>
								<Link to={`/profile/account-details/${param}`}>Detalles - Paso 3</Link>
							</li>
						</>
					)}

					<li>
						Datos de la cuenta
						<Form form={form} initialValues={data} onFinish={handleOnFinish}>
							<div className='ph-auth-login-form-container'>
								<SelectField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Red Social'}
									componentName={'type'}
									componentMode={'single'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={redSocial}
									componentDisabled={isEdit}
									componentRules={'rulesSelect'}
								/>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'account'}
									componentLabel={'Nombre de tu usuario'}
									componentRules={'rulesAccount'}
									componentMessage={'Usuario'}
									componentType={'text'}
									componentValue={data.account}
									componentDisabled={isEdit}
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

								<TextAreaField
									componentClass={'cv-auth-login-field-input'}
									componentName={'faq'}
									componentLabel={'Condiciones del Servicio'}
									componentPlaceholder={'Coloca tu condiciones'}
									componentRows={4}
									componentRules={'required'}
									componentValue={data.faq}
								/>
							</div>

							<Form.Item>
								<Button htmlType={'submit'} className={'cv-auth-login-main-button-submit'}>
									Crear Cuenta
								</Button>
							</Form.Item>
						</Form>
					</li>
				</ul>
			)}
		</>
	)
}

export default AccountBiography
