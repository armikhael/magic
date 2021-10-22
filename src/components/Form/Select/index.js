/** @format */

import React from 'react'

import { Form, Select } from 'antd'
import { rulesValidation } from '../Rules'
import './style.css'

const { Option } = Select
const SelectField = (props) => {
	return (
		<>
			<h3 className='ph-login-main-form-label'>{props.componentLabel}</h3>
			<Form.Item name={props.componentName} rules={rulesValidation[props.componentRules]}>
				<Select
					className={props.componentClass}
					style={{ width: '100%' }}
					mode={props.componentMode}
					placeholder={props.componentPlaceholder}
					onChange={props.componentOnChange}
					maxTagCount={props.componentMaxTagCount}
					disabled={props.componentDisabled}>
					{props.componentOptions.map((iterator, i) => {
						return (
							<Option
								style={{
									textTransform: 'capitalize',
								}}
								key={iterator.value}>
								{iterator.name}
							</Option>
						)
					})}
				</Select>
			</Form.Item>
		</>
	)
}

export default SelectField
