/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, notification } from 'antd'

import { CONSTANTS } from '../../../../../components/ServiceCommons/Constant'
import InputField from '../../../../../components/Form/Input'
import SelectField from '../../../../../components/Form/Select'
import TextAreaField from '../../../../../components/Form/TextArea'

import { serviceGetCategories } from '../../../../../components/ServiceCommons/GetCategory'
import { serviceGetCountry } from '../../../../../components/ServiceCommons/GetCountry'

import { serviceGetData, serviceUpdateData } from './services'

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
	const [isModify, setIsModify] = useState(false)
	const [buttonText, setButtonText] = useState('Continuar')

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		setData(response)
		setEdit(true)
	}

	useEffect(() => {
		if (props.match.params.modify) {
			setIsModify(true)
			setButtonText('Actualizar')
		}
		setParam(props.match.params.name)
		fetchData(props.match.params.name)
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

		setRedSocial([...CONSTANTS.RED_SOCIAL])
		console.log('useEffects')
	}, [props])

	const handleChangeCountry = (item) => {
		const findCurrency = listCountry.find((iterator) => {
			return iterator.name.toLowerCase() === item
		})
		setCode(findCurrency.code)
	}

	const handleOnFinish = (item) => {
		item._id = data._id
		item.code = code
		serviceUpdateData(item).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				console.log(response.data.name)
				if (isModify === false) {
					history.push(`/profile/account-plans/${response.data.name}`)
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
				<ul>
					<br></br>
					<br></br>
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

export default AccountBiography
