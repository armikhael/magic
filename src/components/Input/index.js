/** @format */

import React from 'react'

import { Form, Input } from 'antd'

import { rulesValidation } from './rules'
import './style.css'

export default class InputField extends React.Component {
	render() {
		return (
			<>
				<h3 className='ph-login-main-form-label'>{this.props.inputNameLabel}</h3>
				<Form.Item name={this.props.inputName} rules={rulesValidation[this.props.inputNameRules]}>
					<Input
						className={this.props.className}
						size='large'
						prefix={this.props.inputNameIcon}
						type={this.props.inputNameType}
						placeholder={this.props.inputNameMessage}
						onChange={this.props.inputChange}
					/>
				</Form.Item>
			</>
		)
	}
}
