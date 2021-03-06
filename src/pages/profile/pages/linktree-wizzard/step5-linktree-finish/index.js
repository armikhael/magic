/** @format */

import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Row, Result, Col, Button, notification } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'

import './style.css'

const { Content } = Layout

const LinkTreeFinish = (props) => {
	const history = useHistory()

	useEffect(() => {
		console.log('useEffects')
	}, [props])

	return (
		<>
			<Row justify='center'>
				<Col xs={23} sm={20} xl={10}>
					<Content className='cv-profile-activation-content'>
						<Result
							className='cv-profile-activation-result'
							status='success'
							title='¡Bienvenid@ a Cuentas Virales!'
							subTitle={
								'Para la experiencia de tus clientes y aumentar las ventas puedes hacer lo que ya otros negocios estan haciendo'
							}
							extra={[
								<br key='br-link' />,
								<img
									key='img-link'
									className='cv-profile-activation-img-logo'
									src={'https://i.ibb.co/nkCnHgQ/enlaces.jpg'}
									style={{ width: '100%', cursor: 'pointer' }}
									alt='Enlaces'
								/>,
								<p key='p-link'>
									Sólo debes colocar el siguiente enlace en tu red social donde diga "Sitio
									Web"
								</p>,

								<CopyToClipboard
									key='copy-link'
									text={`${process.env.REACT_APP_LINKTREE}/${props.match.params.name}`}>
									<Button
										style={{ margin: '0px 5px' }}
										shape='round'
										onClick={() => {
											notification['success']({
												message: '¡Excelente!',
												description: `Enlace copiado, listo para compartir.`,
												key: 'copy',
											})
										}}>
										<CopyOutlined />
										Copiar Enlace:
									</Button>
								</CopyToClipboard>,
								<h3
									key='h3-link-preview'
									className='cv-account-wizzard-finish-link-preview'>
									cvirales.com/{props.match.params.name}
								</h3>,
								<h3 key='h3-link'>
									<Button
										className='cv-account-wizzard-finish-button-go-profile'
										shape='round'
										style={{ marginTop: '10px' }}
										onClick={() => {
											history.push(`/${props.match.params.name}`)
										}}>
										Ver mi página
									</Button>
								</h3>,
								<h3 key='h3-link-2'>
									<Button
										className='cv-account-wizzard-finish-button-secondary-go-links'
										shape='round'
										style={{ marginTop: '10px' }}
										onClick={() => {
											history.push(`/profile/linktree`)
										}}>
										Mis Enlaces
									</Button>
								</h3>,
							]}
						/>
					</Content>
				</Col>
			</Row>
		</>
	)
}

export default LinkTreeFinish
