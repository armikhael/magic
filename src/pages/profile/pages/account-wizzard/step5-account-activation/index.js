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
	const [urlRedirect, setUrlRedirect] = useState()
	const [textActivation, setTextActivation] = useState()

	useEffect(() => {
		serviceGetData(props.match.params.name).then((response) => {
			console.log('promesa', response)
			setData(response)
			handleText(response)
		})
		console.log('useEffects')
	}, [props])

	const handleText = (item) => {
		if (item.type === 'instagram') {
			setTextActivation(
				'Ahora para activar tu cuenta solo debes enviarnos tu código de activación por Mensaje Directo (DM) a nuestro equipo Instagram'
			)
			setUrlRedirect('https://www.instagram.com/cuentasvirales')
		}

		if (item.type === 'tiktok') {
			setTextActivation(
				'Ahora para activar tu cuenta solo debes enviarnos tu código de activación por Mensaje Privado a nuestro equipo en TikTok'
			)
			setUrlRedirect('https://www.tiktok.com/@cuentasvirales')
		}

		if (item.type === 'facebook') {
			setTextActivation(
				'Ahora para activar tu cuenta solo debes enviarnos tu código de activación por Messenger a nuestro equipo en Facebook'
			)
			setUrlRedirect('https://www.facebook.com/c.viralesfb')
		}
	}

	const handleOnFinish = (item) => {
		notification['success']({
			message: `Felicidades!`,
			description: `Ahora te enseñaremos un truco`,
		})
		setTimeout(() => {
			history.push(`/profile/account-finish/${props.match.params.name}`)
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
										<CopyToClipboard text={btoa(data.name)}>
											<Button shape='round'>
												Copiar Código de Activación <CopyOutlined />
											</Button>
										</CopyToClipboard>
									</h3>,
									<h3 key='h3-send'>
										<Button
											key='code'
											shape='round'
											onClick={() => {
												window.open(urlRedirect)
											}}>
											Enviar Código
										</Button>
									</h3>,
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
