/** @format */

import React from 'react'

import { Form, Input } from 'antd'
import './style.css'

const { TextArea } = Input
const TextAreaField = (props) => {
	return (
		<>
			<h3 className='ph-login-main-form-label'>{props.componentLabel}</h3>
			<Form.Item name={props.componentName}>
				<TextArea
					style={{ width: '100%' }}
					autoSize={props.componentAutoSize}
					size={props.componentSize}
					mode={props.componentMode}
					placeholder={props.componentPlaceholder}
					onChange={props.componentFunction}
				/>
			</Form.Item>
		</>
	)
}

export default TextAreaField
