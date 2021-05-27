/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Col } from 'antd'
import moment from 'moment'

import { CONSTANTS } from '../../../../../components/ServiceCommons/Constant'
import InputField from '../../../../../components/Form/Input'
import TextAreaField from '../../../../../components/Form/TextArea'
import SelectField from '../../../../../components/Form/Select'
import SelectConstantField from '../../../../../components/Form/SelectConstant'

import UploadPost from '../components/UploadPost'
import { serviceCreateData, serviceUpdateData } from './services'
import insterfaceForm from './interface'

const Post = (props) => {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [isEdit, setEdit] = useState(false)
	const [image, setImage] = useState()
	const [limitTime, setLimitTime] = useState([])

	const fetchData = async (param) => {}

	useEffect(() => {
		if (props.match.params.name) {
			fetchData(props.match.params.name)
			setEdit(true)
		} else {
			setData(insterfaceForm())
			handleTime()
		}
		console.log('useEffects')
	}, [props])

	const handleSetImage = (item) => {
		setImage(item)
		console.log('entro por props')
	}

	const handleTime = () => {
		let times = []
		for (let i = 0; i < 7; i++) {
			times.push({
				name: `Hasta el ${moment().add(i, 'days').format('dddd')} ${moment().add(i, 'days').format('L')}`,
				value: moment().add(i, 'days').format('L'),
			})
		}
		console.log(times)
		setLimitTime(times)
	}

	const handleSubmit = async (item) => {
		console.log(image)
		item.image = image || data.image
		console.log(item)
		if (isEdit === false) {
			serviceCreateData(item).then((response) => {
				console.log(response)
				history.push(`/profile/post-view/${response.data._id}`)
			})
		} else {
			await serviceUpdateData(item)
		}
	}

	return (
		<>
			{data !== undefined && (
				<ul>
					<li>
						<Form name='form' form={form} initialValues={data} onFinish={handleSubmit}>
							<div className='ph-auth-login-form-container'>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'title'}
									componentLabel={'Título de la Promoción'}
									componentPlaceholder={'Nombre de la Promoción'}
									componentType={'text'}
									componentValue={data.title}
								/>
								<TextAreaField
									componentClass={'cv-auth-login-field-input'}
									componentName={'text_html'}
									componentLabel={'Descripción de la Promoción'}
									componentPlaceholder={'Breve Resumen'}
									componentRows={4}
									componentValue={data.text_html}
								/>
								<Col sm={24} md={6} className='cv-profile-upload-image'>
									<UploadPost image={data.image} componentHandle={handleSetImage} />
								</Col>

								<SelectConstantField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Tipo de Moneda'}
									componentName={'currency'}
									componentMode={'single'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={[...CONSTANTS.CURRENCY]}
									componentRules={'required'}
								/>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'price_regular'}
									componentLabel={'Precio Regular'}
									componentPlaceholder={'Precio Regular'}
									componentType={'number'}
									componentValue={data.price_regular}
								/>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'price_promotional'}
									componentLabel={'Precio Promocional'}
									componentPlaceholder={'Precio Promocional'}
									componentType={'number'}
									componentValue={data.price_promotional}
								/>

								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'phone'}
									componentLabel={'WhatsApp'}
									componentPlaceholder={'WhatsApp'}
									componentType={'number'}
									componentValue={data.phone}
								/>

								<SelectField
									componentClass={'cv-auth-login-field-input'}
									componentLabel={'Hasta cuando es la promoción'}
									componentName={'limit_time'}
									componentPlaceholder={'Seleccione una opción'}
									componentOptions={limitTime}
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

export default Post
