/** @format */

import React from 'react'

import { LinkOutlined } from '@ant-design/icons'

import './style.sass'

export default function LinksAccount(props) {
	return (
		<>
			<div className='cv-account-linkaccount-link-main'>
				<div className='cv-account-linkaccount-link-content'>
					{' '}
					<h3 className='cv-account-linkaccount-link-title'>Mis enlaces</h3>
					<div className='cv-account-linkaccount-hr'></div>
					{props.links.map((item, key) => {
						return (
							<a href={item.url} target='_blank' key={key} rel='noopener noreferrer'>
								<div className='cv-account-linkaccount-card'>
									<LinkOutlined />
									<span className='cv-account-linkaccount-link-title-link'>{item.title}</span>
								</div>
							</a>
						)
					})}
				</div>
			</div>
		</>
	)
}
