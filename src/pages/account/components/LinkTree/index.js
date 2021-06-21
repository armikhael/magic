/** @format */

import React from 'react'
import { Helmet } from 'react-helmet'
import { LinkOutlined } from '@ant-design/icons'

import serviceEventGoogleAnalytics from '../../../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'

const LinkTree = (props) => {
	serviceEventGoogleAnalytics({
		category: 'enlace-personalizado',
		action: 'view',
		label: props.componentData.name,
	})
	return (
		<>
			<Helmet>
				<title>@{props.componentData.account} | Cuentas Virales</title>
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
								<div className='cv-linktree-link'>
									<LinkOutlined className='cv-linktree-link-icon' />
									{item.title}
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
		</>
	)
}

export default LinkTree
