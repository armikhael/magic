/** @format */

import React from 'react'
import { Form, Input } from 'antd'

import { rulesValidation } from '../Rules'
import './style.css'

const { TextArea } = Input
const TextAreaField = (props) => {
	return (
		<>
			<h3 className='ph-login-main-form-label'>{props.componentLabel}</h3>
			<Form.Item name={props.componentName} rules={rulesValidation[props.componentRules]}>
				<TextArea
					style={{ width: '100%' }}
					autoSize={props.componentAutoSize}
					rows={props.componentRows}
					mode={props.componentMode}
					placeholder={props.componentPlaceholder}
					onChange={props.componentOnChange}
				/>
			</Form.Item>
		</>
	)
}

export default TextAreaField
