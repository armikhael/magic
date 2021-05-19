/** @format */

import React from 'react'

import { Form, Input } from 'antd'

import { rulesValidation } from './rules'
import './style.css'

const InputField = (props) => {
	return (
		<>
			<h3 className='ph-login-main-form-label'>{props.inputNameLabel}</h3>
			<Form.Item name={props.inputName} rules={rulesValidation[props.inputNameRules]}>
				<Input
					className={props.className}
					size='large'
					name={props.inputName}
					prefix={props.inputNameIcon}
					type={props.inputNameType}
					placeholder={props.inputNameMessage}
					onChange={props.inputNameChange}
				/>
			</Form.Item>
		</>
	)
}

export default InputField
