/** @format */

import React from 'react'

import { Form, Select } from 'antd'
import './style.css'

const { Option } = Select
const SelectField = (props) => {
	return (
		<>
			<h3 className='ph-login-main-form-label'>{props.componentLabel}</h3>
			<Form.Item name={props.componentName}>
				<Select
					style={{ width: '100%' }}
					mode={props.componentMode}
					placeholder={props.componentPlaceholder}
					onChange={props.componentFunction}>
					{props.componentOptions.map((iterator) => {
						return (
							<Option value={iterator.value} key={iterator.name}>
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
