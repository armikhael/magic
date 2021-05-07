/** @format */

import React from 'react'
// import { useDispatch } from 'react-redux'
// import { actionUpdatePage } from '../../../../redux/PageDucks'

import { Button, Input, Form } from 'antd'
const { TextArea } = Input

// const dataDucks = useSelector((store) => store.page.array)

const FormCreatePage = (props) => {
	// const dispatch = useDispatch()
	// useEffect(() => {
	// 	dispatch(actionUpdatePage(props.data))
	// }, [props])

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
						<Input name='priceRegular' value={props.data.priceRegular} />
					</Form.Item>
				</li>
				<li>
					<Form.Item label='Precio Promocional'>
						<Input name='pricePromotional' value={props.data.pricePromotional} />
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
