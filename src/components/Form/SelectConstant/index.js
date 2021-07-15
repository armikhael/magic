/** @format */

import React from 'react'

import { Form, Select } from 'antd'

import { rulesValidation } from '../Rules'
import './style.css'

const { Option } = Select
const SelectConstantField = (props) => {
	return (
		<>
			<h3 className='ph-login-main-form-label'>{props.componentLabel}</h3>
			<Form.Item name={props.componentName} rules={rulesValidation[props.componentRules]}>
				<Select
					style={{ width: '100%' }}
					mode={props.componentMode}
					placeholder={props.componentPlaceholder}
					onChange={props.componentOnChange}
					maxTagCount={props.componentMaxTagCount}>
					{props.componentOptions.map((iterator, i) => {
						return <Option key={iterator}>{iterator}</Option>
					})}
				</Select>
			</Form.Item>
		</>
	)
}

export default SelectConstantField
