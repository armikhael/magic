/** @format */

import React from 'react'

import './style.css'

function Loading() {
	return (
		<div className='loading'>
			<div className='lds-grid'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Loading
