/** @format */

import React, { useState } from 'react'
import { notification, List, Comment } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import ModalEditLinktree from '../ModalEditLinktree'

import serviceDelete from './service'

const LinkTree = (props) => {
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
				<CopyToClipboard text={`${process.env.REACT_APP_DOMAIN}/${item.name}`}>
					<span
						onClick={() => {
							handleDelete(item)
						}}>
						Eliminar
					</span>
				</CopyToClipboard>,
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
				renderItem={(item, i) => (
					<List.Item>
						<Comment
							key={i}
							actions={item.actions}
							author={item.author}
							avatar={item.avatar}
							content={item.content}
						/>
					</List.Item>
				)}
			/>
		</>
	)
}

export default LinkTree
