/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Row, Result, Col, Button, notification } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'

import { serviceGetData } from './services'
import './style.css'

const { Content } = Layout

const AccountActivation = (props) => {
	const history = useHistory()
	const [data, setData] = useState()

	useEffect(() => {
		serviceGetData(props.match.params.name).then((response) => {
			console.log('promesa', response)
			setData(response)
		})
		console.log('useEffects')
	}, [props])

	const handleOnFinish = (item) => {
		notification['success']({
			message: `¡Felicidades!`,
			description: `Bienvenid@ a cuentas virales`,
		})
		setTimeout(() => {
			history.push(`/profile`)
		}, 1000)
	}

	return (
		<>
			{data !== undefined && (
				<Row justify='center'>
					<Col xs={23} sm={20} xl={10}>
						<Content className='cv-profile-activation-content'>
							<Result
								className='cv-profile-activation-result'
								status='success'
								title='¡Sólo te queda un paso!'
								subTitle='Este último paso es necesario para certificar que alguien no haya registrado tu cuenta por ti.'
								extra={[
									<p>
										Sólo debes agregar el siguiente enlace en un lugar visible dentro de tu Red
										Social, <b>Ejemplo...</b>
									</p>,
									<img
										key='img'
										className='cv-profile-activation-img-logo'
										src={'https://i.ibb.co/3CGGDSX/ejemplos.jpg'}
										style={{ width: '100%' }}
										alt='Cuentas'
									/>,
									<p>
										Las redes sociales tienen un espacio disponible llamado <b>"Sitio Web"</b>,
										úsalo allí. De esa manera sabremos que efectivamente es tu cuenta.
									</p>,

									<h3 key='h3-code'>
										<CopyToClipboard
											text={`${process.env.REACT_APP_CUENTAS_VIRALES}/${props.match.params.name}`}>
											<Button
												style={{ margin: '0px 5px' }}
												shape='round'
												onClick={() => {
													notification['success']({
														message: '¡Excelente!',
														description: `Enlace copiado, listo para compartir.`,
														key: 'copiar-enlace',
													})
												}}>
												<CopyOutlined />
												Copiar Enlace Personalizado
											</Button>
										</CopyToClipboard>
									</h3>,
									<img
										key='img'
										className='cv-profile-activation-img-logo'
										src={process.env.REACT_APP_LOGO}
										style={{ width: 80 }}
										alt='Cuentas Virales'
									/>,
								]}
							/>

							<Button onClick={handleOnFinish} className={'cv-account-wizzard-button-submit'}>
								Finalizar
							</Button>
						</Content>
					</Col>
				</Row>
			)}
		</>
	)
}

export default AccountActivation
