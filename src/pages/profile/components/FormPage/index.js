/** @format */

import React from 'react'
import { useDispatch } from 'react-redux'

import { UPDATE_ONE } from '../../../../redux/PageDucks'

import { Button, Input, Form } from 'antd'
const { TextArea } = Input

const FormCreatePage = (props) => {
	const dispatch = useDispatch()

	function handleChangeInput(e) {
		console.log('write', e.target.name, e.target.value)
		dispatch(UPDATE_ONE({ attriute: [e.target.name], value: e.target.value }))
	}

	return (
		<>
			<ul>
				{' '}
				Formulario
				<li>
					<img src={props.data.image} alt={props.data.image}></img>
				</li>
				<li>
					<Form.Item label='Titulo'>
						<Input name='title' value={props.data.title} onChange={handleChangeInput} />
					</Form.Item>
				</li>
				<li>
					<Form.Item label='Descripción'>
						<TextArea
							rows={4}
							name='description'
							value={props.data.description}
							onChange={handleChangeInput}
						/>
					</Form.Item>
				</li>
				<li>
					<Form.Item label='Precio Normal'>
						<Input name='priceRegular' value={props.data.priceRegular} onChange={handleChangeInput} />
					</Form.Item>
				</li>
				<li>
					<Form.Item label='Precio Promocional'>
						<Input
							name='pricePromotional'
							value={props.data.pricePromotional}
							onChange={handleChangeInput}
						/>
					</Form.Item>
				</li>
				<li>
					<Form.Item label='Teléfono'>
						<Input name='phone' value={props.data.phone} onChange={handleChangeInput} />
					</Form.Item>
				</li>
				<li>
					<Form.Item label='Fecha'>
						<Input name='dateLimit' value={props.data.dateLimit} onChange={handleChangeInput} />
					</Form.Item>
				</li>
				<li>
					<Button onClick={() => {}}> Crear Link </Button>
				</li>
			</ul>
		</>
	)
}

export default FormCreatePage
