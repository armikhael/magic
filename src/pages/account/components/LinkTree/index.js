/** @format */

import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Button } from 'antd'

import { LinkOutlined } from '@ant-design/icons'

import 'react-color-palette/lib/css/styles.css'
import { ColorPicker, useColor } from 'react-color-palette'

import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'

const LinkTree = (props) => {
	const [background, setBackground] = useColor('hex', '#FFFFFF')
	const [link, setLink] = useColor('hex', '#210358')
	const [text, setText] = useColor('hex', '#FFFFFF')
	const [icon, setIcon] = useColor('hex', '#FFFFFF')
	const [user] = useState(JSON.parse(localStorage.getItem('user')))
	const [current, setCurrent] = useState({
		color: background,
		method: setBackground,
	})

	serviceEventGoogleAnalytics({
		category: 'enlace-personalizado',
		action: 'view',
		label: props.componentData.name,
	})

	return (
		<>
			<Helmet>
				<title>@{props.componentData.name} | Cuentas Virales</title>
				<link rel='canonical' href={'https://www.cuentasvirales.com/' + props.componentData.name} />
			</Helmet>

			<div className='cv-linktree-content' style={{ background: background.hex }}>
				<img
					className='cv-linktree-img'
					src={props.componentData.image}
					alt={props.componentData.account}
					title={props.componentData.account}
				/>
				<h1 className='cv-linktree-title'>{props.componentData.account}</h1>
				<p className='cv-linktree-description'>{props.componentData.description}</p>
				<br></br>
				<div>
					{props.componentData.links.map((item, key) => {
						return (
							<a href={item.url} target='_blank' key={key} rel='noopener noreferrer'>
								<div className='cv-linktree-link' style={{ background: link.hex }}>
									<LinkOutlined className='cv-linktree-link-icon' style={{ color: icon.hex }} />
									<span style={{ color: text.hex }}>{item.title}</span>
								</div>
							</a>
						)
					})}
				</div>
			</div>

			{user.email === props.componentData.email && (
				<>
					<Button
						className={'cv-linktree-button-submit'}
						onClick={() => {
							setCurrent({
								color: background,
								method: setBackground,
							})
						}}>
						Fondo
					</Button>

					<Button
						className={'cv-linktree-button-submit'}
						onClick={() => {
							setCurrent({
								color: link,
								method: setLink,
							})
						}}>
						Link
					</Button>

					<Button
						className={'cv-linktree-button-submit'}
						onClick={() => {
							setCurrent({
								color: text,
								method: setText,
							})
						}}>
						Texto
					</Button>

					<Button
						className={'cv-linktree-button-submit'}
						onClick={() => {
							setCurrent({
								color: icon,
								method: setIcon,
							})
						}}>
						Iconos
					</Button>

					<ColorPicker
						width={250}
						height={150}
						color={current.color}
						onChange={current.method}
						hideHSV
						hideRGB
					/>
				</>
			)}

			<div className='cv-linktree-logo-content'>
				<a href='https://www.cuentasvirales.com/' target='_blank' rel='noopener noreferrer'>
					<h3 className='cv-linktree-logo'>
						<img src='https://i.postimg.cc/YSQXZWCP/logo.jpg' alt={'Logo'} title={'Logo'} />
						&nbsp;Cuentas Virales
					</h3>
				</a>
			</div>
		</>
	)
}

export default LinkTree
