/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Layout, Row, Result, Col, Button } from 'antd'
import './style.css'

const { Content } = Layout

const Activation = (props) => {
	const history = useHistory()
	const [urlRedirect, setUrlRedirect] = useState()
	const [textActivation, setTextActivation] = useState()

	useEffect(() => {
		let type = atob(props.match.params.type)
		if (type === 'instagram') {
			setTextActivation(
				'Ahora para activar tu cuenta solo debes solicitar tu código de activación por Mensaje Directo (DM) a nuestro equipo Instagram'
			)
			setUrlRedirect('https://www.instagram.com/cuentasvirales')
		}

		if (type === 'tiktok') {
			setTextActivation(
				'Ahora para activar tu cuenta solo debes solicitar tu código de activación por Mensaje Privado a nuestro equipo en TikTok'
			)
			setUrlRedirect('https://www.tiktok.com/@cuentasvirales')
		}

		if (type === 'facebook') {
			setTextActivation(
				'Ahora para activar tu cuenta solo debes solicitar tu código de activación por Messenger a nuestro equipo en Facebook'
			)
			setUrlRedirect('https://www.facebook.com/c.viralesfb')
		}
		console.log('useEffects')
	}, [props])

	return (
		<>
			<Row justify={'center'}>
				<Col sm={24} md={16}>
					<Content className='cv-profile-activation-content'>
						<Result
							className='cv-profile-activation-result'
							status='success'
							title='¡Sólo te queda un paso!'
							subTitle={textActivation}
							extra={[
								<br key='br' />,
								<img
									key='img'
									className='cv-profile-activation-img-logo'
									src={process.env.REACT_APP_LOGO}
									style={{ width: 80 }}
									alt='Cuentas Virales'
								/>,
								<h3 key='h3-code'>
									<Button
										key='code'
										shape='round'
										onClick={() => {
											window.open(urlRedirect)
										}}>
										Solicitar Código de Activación
									</Button>
								</h3>,
								<h3 key='h3-profile'>
									<Button
										key='profile'
										shape='round'
										onClick={() => {
											history.push(`/profile/`)
										}}>
										Ir al Perfil
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

export default Activation
