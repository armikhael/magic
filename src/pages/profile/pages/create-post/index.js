/** @format */

import React, { useEffect, useState } from 'react'
import { Form, Button } from 'antd'
import moment from 'moment'

import InputField from '../../../../components/Input'
import SelectField from '../../../../components/Select'
import UploadImage from '../../components/UploadImage'

import { serviceGePost } from './service'

const CreatePost = () => {
	const [data, setData] = useState()
	const [optionsDate, setOptionsDate] = useState([])

	const fetchData = async () => {
		const res = await serviceGePost()
		setData(res)
	}

	useEffect(() => {
		fetchData()
		handleGenerateDates()
		console.log('useEffects')
	}, [])

	const handleSubmit = (item) => {
		console.log(item)
	}

	const handleGenerateDates = async () => {
		let date = []
		for (let i = 1; i < 15; i++) {
			date.push({
				value: moment().add(i, 'days').format('L'),
				name: `${i} Día(s) `,
			})
		}
		setOptionsDate(date)
	}

	return (
		<>
			{data !== undefined && (
				<ul>
					{' '}
					Datos relevantes a mostrar
					<li>Estadísticas de visitas: {data.views}</li>
					<li>Clicks Recibidos: {data.clicks}</li>
					<li>
						<Form name='normal_login' initialValues={{ remember: true }} onFinish={handleSubmit}>
							<div className='ph-auth-login-form-container'>
								<UploadImage account={data.image} />
								<InputField
									className={'cv-auth-login-field-input'}
									inputName={'title'}
									inputNameLabel={'Titulo del Post'}
									inputNameRule={true}
									inputNameMessage={'Ingrese su Título'}
									inputNameType={'text'}
									inputNameIcon={''}
									inputNameRules={''}
								/>
								<InputField
									className={'cv-auth-login-field-input'}
									inputName={'price_regular'}
									inputNameLabel={'Precio Regular'}
									inputNameRule={true}
									inputNameMessage={'Ingrese el precio'}
									inputNameType={''}
									inputNameIcon={''}
									inputNameRules={''}
								/>
								<InputField
									className={'cv-auth-login-field-input'}
									inputName={'price_promotion'}
									inputNameLabel={'Precio Promocional'}
									inputNameRule={true}
									inputNameMessage={'Ingrese el precio'}
									inputNameType={''}
									inputNameIcon={''}
									inputNameRules={''}
								/>
								<InputField
									className={'cv-auth-login-field-input'}
									inputName={'phone'}
									inputNameLabel={'Teléfono de Contacto'}
									inputNameRule={true}
									inputNameMessage={'Ingrese el teléfono'}
									inputNameType={''}
									inputNameIcon={''}
									inputNameRules={'rulesPhone'}
								/>
								<SelectField
									componentLabel={'Fecha de termino'}
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
					<li>
						<button
							onClick={() => {
								console.log(data)
							}}>
							Enviar
						</button>
					</li>
				</ul>
			)}
		</>
	)
}

export default CreatePost
