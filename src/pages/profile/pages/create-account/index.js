/** @format */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Divider } from 'antd'

import InputField from '../../../../components/Form/Input'
import SelectField from '../../../../components/Form/Select'
import { serviceGetCategories } from '../../../../components/ServiceCommons/GetCategory'
import { CONSTANTS } from '../../../../components/ServiceCommons/Constant'

import { serviceGetData } from './services'
import insterfaceForm from './interface'

const CreateLink = (props) => {
	const [form] = Form.useForm()
	const [param, setParam] = useState()
	const [data, setData] = useState()
	const [isEdit, setEdit] = useState(false)
	const [categories, setCategories] = useState([])
	const [redSocial, setRedSocial] = useState([])

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
				console.log('catgories', result)
				setCategories([...result])
				setRedSocial([...CONSTANTS.RED_SOCIAL])
			})

			setData(insterfaceForm())
		}
		console.log('useEffects')
	}, [props])

	const handleOnFinish = (item) => {
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
						<Form name='links' form={form} initialValues={data} onFinish={handleOnFinish}>
							<div className='ph-auth-login-form-container'>
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

								<SelectField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Categorías'}
									componentName={'categories'}
									componentMode={'multiple'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={categories}
									componentMaxTagCount={5}
								/>

								<SelectField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Red Social'}
									componentName={'red_social'}
									componentMode={'single'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={redSocial}
								/>
							</div>
							<Form.Item>
								<Button htmlType={'submit'} className={'cv-auth-login-main-button-submit'}>
									Enviar
								</Button>
							</Form.Item>
						</Form>
					</li>
				</ul>
			)}
			<Divider></Divider>
		</>
	)
}

export default CreateLink
