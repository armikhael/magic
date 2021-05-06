/** @format */

import React, { useState } from 'react'
import { Button, Input, Form } from 'antd'
const { TextArea } = Input

const CreatePage = () => {
	const [title] = useState('Titulo promocional')
	const data = {
		image: 'https://i.postimg.cc/YSQXZWCP/logo.jpg',
		title: title,
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		price_before: '50000',
		price_current: '20000',
		phone: '99999999',
		date_limit: '01/01/9999',
	}
	return (
		<>
			<ul>
				{' '}
				Datos relevantes a mostrar
				<li>Estadísticas de visitas</li>
				<li>Clicks Recibidos</li>
				<li>Clicks Comprados</li>
			</ul>
			<ul>
				{' '}
				Formulario
				<li>
					<img src={data.image} alt={data.title}></img>
				</li>
				<li>Titulo: {data.title}</li>
				<li>
					Descripcion:{' '}
					<Form.Item label='Descripción'>
						<TextArea rows={4} name='description' value={data.description} />
					</Form.Item>
				</li>
				<li>Precio Antes: {data.price_before}</li>
				<li>Precio Ahora: {data.price_current}</li>
				<li>Teléfono: {data.phone}</li>
				<li>Fecha Límite: {data.date_limit}</li>
				<li>
					<Button> Comprar </Button>
				</li>
			</ul>
		</>
	)
}

export default CreatePage
