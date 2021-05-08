/** @format */

import React from 'react'

import { Form, Input } from 'antd'

import { rules } from '../../ServiceCommons/Rules'
import './style.css'

const InputField = (props) => {
	return (
		<>
			<h3 className='ph-login-main-form-label'>{props.componentLabel}</h3>
			<Form.Item name={props.componentName} rules={rules[props.componentRules]}>
				<Input
					className={props.componentClass}
					size='large'
					name={props.componentName}
					prefix={props.componentIcon}
					type={props.componentType}
					placeholder={props.componentMessage}
					onChange={props.componentChange}
				/>
			</Form.Item>
		</>
	)
}

export default InputField
