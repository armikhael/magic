/** @format */

import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { LinkOutlined } from '@ant-design/icons'

import { serviceGetLinks } from './services'
import serviceEventGoogleAnalytics from '../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'

export default function LinkTree(props) {
	const [isData, setData] = useState(null)

	useEffect(() => {
		serviceGetLinks(props.match.params.name).then((response) => {
			console.log(response)
			setData(response[0])
			serviceEventGoogleAnalytics({
				category: 'enlace-personalizado',
				action: 'view',
				label: props.match.params.name,
			})
		})
	}, [props.match.params.name])

	return (
		<>
			{isData && (
				<>
					<Helmet>
						<title>@{isData.account} | Cuentas Virales</title>
						<link rel='canonical' href={'https://www.cuentasvirales.com/' + isData.name} />
					</Helmet>
					<div className='cv-linktree-content'>
						<img
							className='cv-linktree-img'
							src={isData.image}
							alt={isData.account}
							title={isData.account}
						/>
						<h1 className='cv-linktree-title'>
							<span>@</span>
							{isData.account}
						</h1>
						<p className='cv-linktree-description'>{isData.description}</p>
						<br></br>
						<div>
							{isData.links.map((item, key) => {
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
			)}
		</>
	)
}
