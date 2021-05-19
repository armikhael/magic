/** @format */

import React from 'react'
import moment from 'moment'

import { Form, DatePicker } from 'antd'
import './style.css'

const { RangePicker } = DatePicker
const DatePickerField = (props) => {
	return (
		<>
			<h3 className='ph-login-main-form-label'>{props.componentLabel}</h3>
			<Form.Item name={props.componentName}>
				<RangePicker
					style={{ width: '100%' }}
					mode={props.componentMode}
					placeholder={props.componentPlaceholder}
					onChange={props.componentFunction}
					ranges={{
						Today: [moment(), moment()],
						'Mes Siguiente': [moment().startOf('month'), moment().endOf('month')],
					}}
				/>
			</Form.Item>
		</>
	)
}

export default DatePickerField
