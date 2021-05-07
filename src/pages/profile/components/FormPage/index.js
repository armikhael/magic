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
					<img src={props.data.image} alt={props.data.title}></img>
				</li>
				<li>Titulo: {props.data.title}</li>
				<li>
					<Form.Item label='Descripción'>
						<TextArea rows={4} name='description' value={props.data.description} />
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
				<li>Teléfono: {props.data.phone}</li>
				<li>Fecha Límite: {props.data.dateLimit}</li>
				<li>
					<Button onClick={() => {}}> Crear Link </Button>
				</li>
			</ul>
		</>
	)
}

export default FormCreatePage
