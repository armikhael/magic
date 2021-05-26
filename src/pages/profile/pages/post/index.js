/** @format */

import React, { useEffect, useState } from 'react'
import { Form, Button, Col } from 'antd'

import InputField from '../../../../components/Form/Input'
import TextAreaField from '../../../../components/Form/TextArea'
import UploadPost from '../../components/UploadPost'

// import { serviceGetData, serviceCreateData, serviceUpdateData } from './services'
import insterfaceForm from './interface'

const Post = (props) => {
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [image, setImage] = useState()

	const fetchData = async (param) => {}

	useEffect(() => {
		if (props.match.params.name) {
			fetchData(props.match.params.name)
		} else {
			setData(insterfaceForm())
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
									componentName={'title'}
									componentLabel={'Título de la Promoción'}
									componentPlaceholder={'Nombre de la Promoción'}
									componentType={'text'}
									componentValue={data.title}
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
