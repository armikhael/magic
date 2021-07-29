/** @format */

import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { LinkOutlined } from '@ant-design/icons'

import Loading from '../../../../components/Loading/Loading'
import PageError from '../../../../components/Errors/PageError'
import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

import DrawerLinktree from './components/Drawer'
import './style.css'

const LinkTree = (props) => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [link] = useState(props.componentData.color.link || '#210358')
	const [text] = useState(props.componentData.color.text || '#FFFFFF')
	const [icon] = useState(props.componentData.color.icon || '#FFFFFF')

	serviceEventGoogleAnalytics({
		category: 'enlace-personalizado',
		action: 'view',
		label: props.componentData.name,
	})

	useEffect(() => {
		console.log('useEffect')
		if (props.componentData) {
			setLoading(false)
		} else {
			setError({
				statusCode: 404,
				message: 'Enlace no encontrado',
			})
		}
	}, [props])

	if (loading) {
		return <Loading />
	}
	if (error) {
		return <PageError detailError={error} />
	}
	return (
		<>
			<Helmet>
				<title>@{props.componentData.name} | Cuentas Virales</title>
				<link rel='canonical' href={'https://www.cuentasvirales.com/' + props.componentData.name} />
			</Helmet>

			<div className='cv-linktree-content'>
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
								<div className='cv-linktree-link' style={{ background: link, borderColor: link }}>
									<LinkOutlined className='cv-linktree-link-icon' style={{ color: icon }} />
									<span style={{ color: text }}>{item.title}</span>
								</div>
							</a>
						)
					})}
				</div>
			</div>

			<div className='cv-linktree-logo-content'>
				<a href='https://www.cuentasvirales.com/' target='_blank' rel='noopener noreferrer'>
					<h3 className='cv-linktree-logo'>
						<img src='https://i.postimg.cc/YSQXZWCP/logo.jpg' alt={'Logo'} title={'Logo'} />
						&nbsp;Cuentas Virales
					</h3>
				</a>
			</div>
			<DrawerLinktree />
		</>
	)
}

export default LinkTree
