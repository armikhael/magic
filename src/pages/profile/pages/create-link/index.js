/** @format */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Divider, List, Typography } from 'antd'

import InputField from '../../../../components/Form/Input'

import { serviceGetData } from './service'
import interfaceLink from './interface'

const CreateLink = (props) => {
	const [param] = useState()
	const [data, setData] = useState()
	const [isLink, setLink] = useState([])

	const fetchData = async (param) => {
		const res = await serviceGetData()
		console.log(res)
		setData(res)
	}

	useEffect(() => {
		if (props.match.params.name) {
			console.log(props.match.params.name)
			fetchData(props.match.params.name)
		} else {
			setData(interfaceLink())
		}

		console.log('useEffects')
	}, [props])

	const handleDelete = (e) => {
		setLink(
			isLink.filter((item, key) => {
				return key !== e
			})
		)
	}

	const handleSubmit = (item) => {
		console.log('onFinish', item)
		setLink((isLink) => [...isLink, item])
		console.log(isLink)
	}

	return (
		<>
			{param !== undefined && <p>Parametro: {param}</p>}
			{data !== undefined && (
				<ul>
					<li>
						<Link to={'/profile/edit-post/nombre-cuenta'}> Editar </Link>
					</li>
					<li>
						<Link to={'/profile/create-post'}> Crear </Link>
					</li>
					<li>
						<Form name='normal_login' initialValues={data} onFinish={handleSubmit}>
							<div className='ph-auth-login-form-container'>
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
								<InputField
									componentClass={'cv-auth-login-field-input'}
									componentName={'url'}
									componentLabel={'Precio Regular'}
									componentRule={true}
									componentMessage={'Ingrese el precio'}
									componentType={''}
									componentIcon={''}
									componentRules={''}
									componentValue={data.url}
								/>
							</div>
							<Form.Item>
								<Button htmlType={'submit'} className={'cv-auth-login-main-button-submit'}>
									Agregar
								</Button>
							</Form.Item>
						</Form>
					</li>
				</ul>
			)}
			<p>Regisros: {isLink.length}</p>
			<Divider></Divider>
			{isLink.length > 0 && (
				<List
					header={<div>Enlaces Agregados</div>}
					bordered
					dataSource={isLink}
					renderItem={(item, key) => (
						<List.Item>
							<Typography.Text>
								{item.title} - {item.url}
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
		</>
	)
}

export default CreateLink
