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
						history.push(`/${item.name}`)
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
			{data.length > 0 && (
				<>
					<Row>
						<List
							className='comment-list'
							header={`${render.length} Enlaces Creados`}
							itemLayout='horizontal'
							dataSource={render}
							renderItem={(item) => (
								<li>
									<Comment
										actions={item.actions}
										author={item.author}
										avatar={item.avatar}
										content={item.content}
									/>
								</li>
							)}
						/>
						<Button
							onClick={() => {
								history.push(`/profile/linktree-name`)
							}}
							className={'cv-account-wizzard-button-submit'}>
							Crear Nuevo
						</Button>
					</Row>
				</>
			)}
			{props.componentData.length <= 0 && (
				<>
					<img width='19px' src='https://i.ibb.co/M93R2Gh/link.png' alt='Multiples enlaces' />
					<a href={`${process.env.REACT_APP_DOMAIN}/profile/linktree`}> Crear Enlaces Multiple</a>
				</>
			)}
		</>
	)
}

export default LinkTree
