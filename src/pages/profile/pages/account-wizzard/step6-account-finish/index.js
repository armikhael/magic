/** @format */

import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Row, Result, Col, Button, notification } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'

import './style.css'

const { Content } = Layout

const AccountFinish = (props) => {
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
								'Para aumentar las posibilidades de contratación por marcas interesadas, te dejamos este truco que las modelos estan haciendo dentro de sus cuentas.'
							}
							extra={[
								<img
									key='img-profile'
									className='cv-profile-activation-img-logo'
									src={'https://i.ibb.co/3CGGDSX/ejemplos.jpg'}
									style={{ width: '100%' }}
									alt='Cuentas'
								/>,
								<p key='p-profile'>
									Sólo debes colocar el siguiente enlace en tu red social donde diga "Sitio
									Web"
								</p>,

								<CopyToClipboard
									key='copy-profile'
									text={`${process.env.REACT_APP_CUENTAS_VIRALES}/${props.match.params.name}`}>
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
										Copiar Enlace
									</Button>
								</CopyToClipboard>,
								<h3 className='cv-account-wizzard-finish-link-preview'>
									cuentasvirales.com/aml.barahona2-instagram
								</h3>,
								<h3 key='h3-profile'>
									<Button
										className='cv-account-wizzard-finish-button-go-profile'
										key='profile'
										shape='round'
										style={{ marginTop: '10px' }}
										onClick={() => {
											history.push(`/${props.match.params.name}`)
										}}>
										Ver mi página
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

export default AccountFinish
