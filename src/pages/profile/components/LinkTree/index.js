/** @format */

import React from 'react'
import { useHistory } from 'react-router-dom'
import { notification, Row, List, Comment, Button } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import ModalEditLinktree from '../ModalEditLinktree'

const LinkTree = (props) => {
	const history = useHistory()
	const data = props.componentData.map((item, key) => {
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
							props.componentDelete(item)
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
			{props.componentData.length > 0 && (
				<>
					<Row>
						<List
							className='comment-list'
							header={`${data.length} Enlaces Creados`}
							itemLayout='horizontal'
							dataSource={data}
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
