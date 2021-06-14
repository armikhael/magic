/** @format */

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, notification } from 'antd'
import { EditOutlined, EyeOutlined, CopyOutlined, CloseOutlined } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const LinkTree = (props) => {
	const history = useHistory()

	return (
		<>
			<p>
				{props.componentData.length > 0 && (
					<>
						Enlace Personalizado
						<Button
							style={{ margin: '0px 5px' }}
							shape='circle'
							onClick={() => {
								history.push(`/profile/linktree/${props.componentData[0].name}`)
							}}>
							<EditOutlined />
						</Button>
						<Button
							style={{ margin: '0px 5px' }}
							shape='circle'
							onClick={() => {
								history.push(`/${props.componentData[0].name}`)
							}}>
							<EyeOutlined />
						</Button>
						<CopyToClipboard text={`${process.env.REACT_APP_DOMAIN}/${props.componentData[0].name}`}>
							<Button
								style={{ margin: '0px 5px' }}
								shape='circle'
								onClick={() => {
									notification['success']({
										message: '¡Excelente!',
										description: `Enlace Copiado.`,
									})
								}}>
								<CopyOutlined />
							</Button>
						</CopyToClipboard>
						{/* <CopyToClipboard text={`${process.env.REACT_APP_DOMAIN}/${props.componentData[0].name}`}>
							<Button
								style={{ margin: '0px 5px' }}
								type='danger'
								shape='circle'
								onClick={() => {
									props.componentDelete(props.componentData[0])
								}}>
								<CloseOutlined />
							</Button>
						</CopyToClipboard> */}
					</>
				)}
				{props.componentData.length <= 0 && (
					<>
						<img width='19px' src='https://i.ibb.co/M93R2Gh/link.png' alt='Multiples enlaces' />
						<a href={`${process.env.REACT_APP_DOMAIN}/profile/linktree`}> Crear Enlaces Multiple</a>
					</>
				)}
			</p>
		</>
	)
}

export default LinkTree
