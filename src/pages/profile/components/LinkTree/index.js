/** @format */

import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, notification, Row, Col } from 'antd'
import { EditOutlined, EyeOutlined, CopyOutlined, CloseOutlined } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const LinkTree = (props) => {
	const history = useHistory()

	return (
		<>
			{props.componentData.length > 0 && (
				<>
					{props.componentData.map((iterator, key) => {
						return (
							<Row key={key}>
								<Col md={12} sm={12} xs={12}>
									Enlace: {iterator.name}
								</Col>
								<Col md={12} sm={12} xs={12}>
									<Button
										style={{ margin: '0px 5px' }}
										shape='circle'
										onClick={() => {
											history.push(`/profile/linktree/${iterator.name}`)
										}}>
										<EditOutlined />
									</Button>
									<Button
										style={{ margin: '0px 5px' }}
										shape='circle'
										onClick={() => {
											history.push(`/${iterator.name}`)
										}}>
										<EyeOutlined />
									</Button>
									<CopyToClipboard text={`${process.env.REACT_APP_DOMAIN}/${iterator.name}`}>
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
									<CopyToClipboard text={`${process.env.REACT_APP_DOMAIN}/${iterator.name}`}>
										<Button
											style={{ margin: '0px 5px' }}
											type='danger'
											shape='circle'
											onClick={() => {
												props.componentDelete(iterator)
											}}>
											<CloseOutlined />
										</Button>
									</CopyToClipboard>
								</Col>
							</Row>
						)
					})}
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
