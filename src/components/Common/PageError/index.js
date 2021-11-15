/** @format */

import React from 'react'

import { CloseCircleOutlined } from '@ant-design/icons'

import './style.sass'

export default function PageError({ errorTitle }) {
	return (
		<div className='cv-global-main-container'>
			<div className='cv-page-error-main-container'>
				<div className='cv-page-error-container'>
					<CloseCircleOutlined className='cv-page-error-icon' />
					<h3 className='cv-page-error-title'>Lo sentimos, se ha presentado un error</h3>
					<h3 className='cv-page-error-subtitle'>Pagina:</h3>
					<h3 className='cv-page-error-description'>{errorTitle}</h3>
				</div>
			</div>
		</div>
	)
}
