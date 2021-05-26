/** @format */

import React, { useEffect, useState } from 'react'
import { Form, Button, Col } from 'antd'
import moment from 'moment'

import InputField from '../../../../components/Form/Input'
import TextAreaField from '../../../../components/Form/TextArea'
import UploadPost from '../../components/UploadPost'
import SelectField from '../../../../components/Form/Select'

// import { serviceGetData, serviceCreateData, serviceUpdateData } from './services'
import insterfaceForm from './interface'

const Post = (props) => {
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [image, setImage] = useState()
	const [limitTime, setLimitTime] = useState([])

	const fetchData = async (param) => {}

	useEffect(() => {
		if (props.match.params.name) {
			fetchData(props.match.params.name)
		} else {
			setData(insterfaceForm())
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
		console.log('useEffects')
	}, [props])

	const handleSetImage = (item) => {
		setImage(item)
		console.log('entro por props')
	}

	const handleSubmit = async (item) => {
		console.log(image)
		item.image = image
		console.log(item)
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
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'price_regular'}
									componentLabel={'Precio Regular'}
									componentPlaceholder={'Precio Regular'}
									componentType={'text'}
									componentValue={data.price_regular}
								/>
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'price_promotional'}
									componentLabel={'Precio Promocional'}
									componentPlaceholder={'Precio Promocional'}
									componentType={'text'}
									componentValue={data.price_promotional}
								/>

								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'phone'}
									componentLabel={'WhatsApp'}
									componentPlaceholder={'WhatsApp'}
									componentType={'text'}
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
