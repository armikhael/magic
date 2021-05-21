/** @format */

import React from 'react'

import { Form, Select } from 'antd'
import './style.css'

const { Option } = Select
const SelectConstantField = (props) => {
	return (
		<>
			<h3 className='ph-login-main-form-label'>{props.componentLabel}</h3>
			<Form.Item name={props.componentName}>
				<Select
					style={{ width: '100%' }}
					mode={props.componentMode}
					placeholder={props.componentPlaceholder}
					onChange={props.componentFunction}
					maxTagCount={props.componentMaxTagCount}>
					{props.componentOptions.map((iterator, i) => {
						return (
							<Option
								style={{
									textTransform: 'capitalize',
								}}
								key={iterator}>
								{iterator}
							</Option>
						)
					})}
				</Select>
			</Form.Item>
		</>
	)
}

export default SelectConstantField
