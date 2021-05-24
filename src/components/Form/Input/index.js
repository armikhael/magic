/** @format */

import React from 'react'

import { Form, Input } from 'antd'

import { rulesValidation } from '../Rules'
import './style.css'

const InputField = (props) => {
	return (
		<>
			<h3 className='ph-login-main-form-label'>{props.componentLabel}</h3>
			<Form.Item name={props.componentName} rules={rulesValidation[props.componentRules]}>
				<Input
					className={props.componentClass}
					size='large'
					name={props.componentName}
					prefix={props.componentPrefix}
					type={props.componentType}
					placeholder={props.componentPlaceholder}
					onChange={props.componentOnChange}
					disabled={props.componentDisabled}
				/>
			</Form.Item>
		</>
	)
}

export default InputField
