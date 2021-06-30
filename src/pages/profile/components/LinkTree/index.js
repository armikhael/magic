/** @format */

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { notification, Row, List, Comment, Button } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import ModalEditLinktree from '../ModalEditLinktree'

import serviceDelete from './service'

const LinkTree = (props) => {
	const history = useHistory()
	const [data, setData] = useState(props.componentData)

	const handleDelete = async (item) => {
		const response = await serviceDelete(item)
		console.log(response)
		if (response.statusCode === 200) {
			setData(response.data)
			notification['success']({
				message: `¡Felicidades!`,
				description: `El enlace ha sido eliminado correctamente`,
			})
		} else {
			notification['error']({
				message: `¡Ups!`,
				description: response.message,
			})
		}
	}

	const render = data.map((item, key) => {
		return {
			actions: [
				<ModalEditLinktree componentData={item} componentHeader={'Modificar Información'} />,
				<span
					onClick={() => {
						window.open(`/${item.name}`)
					}}>
					Ver
				</span>,
				<CopyToClipboard text={`${process.env.REACT_APP_LINKTREE}/${item.name}`}>
					<span
						onClick={() => {
							notification['success']({
								message: '¡Excelente!',
								description: `Enlace Copiado.`,
							})
						}}>
						Copiar
					</span>
				</CopyToClipboard>,
				<span
					onClick={() => {
						handleDelete(item)
					}}>
					Eliminar
				</span>,
			],
			author: item.name,
			avatar: item.image,
			content: <>{item.description}</>,
		}
	})

	return (
		<>
			<List
				className='comment-list'
				header={`Enlaces Personalizados`}
				itemLayout='horizontal'
				dataSource={render}
				renderItem={(item) => (
					<List.Item>
						<Comment
							actions={item.actions}
							author={item.author}
							avatar={item.avatar}
							content={item.content}
						/>
					</List.Item>
				)}
			/>
			<Row>
				<Button
					onClick={() => {
						history.push(`/profile/linktree-name`)
					}}
					className={'cv-account-wizzard-button-submit'}>
					Crear Nuevo
				</Button>
			</Row>
		</>
	)
}

export default LinkTree
