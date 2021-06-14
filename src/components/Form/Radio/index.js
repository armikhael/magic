/** @format */

import React from 'react'

import { Form, Radio } from 'antd'

import { rulesValidation } from '../Rules'
import './style.css'

const RadioField = (props) => {
	console.log(props.componentOptions)
	return (
		<>
			<h3 className='ph-login-main-form-label'>{props.componentLabel}</h3>
			<Form.Item name={props.componentName} rules={rulesValidation[props.componentRules]}>
				<Radio.Group buttonStyle={'solid'}>
					{props.componentOptions.map((iterator, i) => {
						return (
							<Radio.Button key={i} value={iterator.value}>
								{iterator.name}
							</Radio.Button>
						)
					})}
				</Radio.Group>
			</Form.Item>
		</>
	)
}

export default RadioField
