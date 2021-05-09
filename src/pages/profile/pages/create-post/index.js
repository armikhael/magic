/** @format */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'antd'
import moment from 'moment'

import InputField from '../../../../components/Form/Input'
import SelectField from '../../../../components/Form/Select'
import TextAreaField from '../../../../components/Form/TextArea'
import UploadImage from '../../../../components/UploadImage'

import { serviceGePost } from './service'
import interfacePost from './interface'

const CreatePost = (props) => {
	const [param, setParam] = useState()
	const [data, setData] = useState()
	const [optionsDate, setOptionsDate] = useState([])

	const fetchData = async () => {
		const res = await serviceGePost()
		setData(res)
	}

	useEffect(() => {
		if (props.match.params.name) {
			console.log(props.match.params.name)
			setParam(props.match.params.name)
			fetchData()
		} else {
			setData(interfacePost)
		}
		handleGenerateDates()
		console.log('useEffects')
	}, [props])

	const handleSubmit = (item) => {
		console.log(item)
	}

	const handleGenerateDates = async () => {
		let date = []
		for (let i = 1; i < 15; i++) {
			date.push({
				value: moment().add(i, 'days').format('L'),
				name: `${i} Día(s)  Finaliza el ${moment().add(i, 'days').format('L')}`,
			})
		}
		setOptionsDate(date)
	}

	return (
		<>
			{param !== undefined && <p>Parametro: {param}</p>}
			{data !== undefined && (
				<ul>
					{' '}
					Datos relevantes a mostrar
					<li>Estadísticas de visitas: {data.views}</li>
					<li>Estadísticas de visitas: {data.views}</li>
					<li>Clicks Recibidos: {data.clicks}</li>
					<li>
						<Link to={'/profile/edit-post/nombre-cuenta'}> Editar </Link>
					</li>
					<li>
						<Link to={'/profile/create-post'}> Crear </Link>
					</li>
					<li>
						<Form name='normal_login' initialValues={data} onFinish={handleSubmit}>
							<div className='ph-auth-login-form-container'>
								<div style={{ width: '30%' }}>
									<UploadImage data={data} />
								</div>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'title'}
									componentLabel={'Titulo del Post'}
									componentRule={true}
									componentMessage={'Ingrese su Título'}
									componentType={'text'}
									componentIcon={''}
									componentRules={''}
									componentValue={data.title}
								/>
								<TextAreaField
									componentLabel={'Describe la promoción'}
									componentName={'description'}
									componentMode={''}
									componentAutoSize={{ minRows: 2, maxRows: 6 }}
									componentPlaceholder={'Breve descripción'}
									componentOptions={optionsDate}
								/>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'price_regular'}
									componentLabel={'Precio Regular'}
									componentRule={true}
									componentMessage={'Ingrese el precio'}
									componentType={''}
									componentIcon={''}
									componentRules={''}
									componentValue={data.price_regular}
								/>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'price_promotion'}
									componentLabel={'Precio Promocional'}
									componentRule={true}
									componentMessage={'Ingrese el precio'}
									componentType={''}
									componentIcon={''}
									componentRules={''}
									componentValue={data.price_promotion}
								/>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'phone'}
									componentLabel={'Teléfono de Contacto'}
									componentRule={true}
									componentMessage={'Ingrese el teléfono'}
									componentType={''}
									componentIcon={''}
									componentRules={'rulesPhone'}
									componentValue={data.phone}
								/>
								<SelectField
									componentLabel={'¿Cuanto dura la promoción?'}
									componentName={'time_limit'}
									componentMode={''}
									componentPlaceholder={''}
									componentOptions={optionsDate}
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
		</>
	)
}

export default CreatePost
