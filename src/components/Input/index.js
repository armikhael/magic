/** @format */

import React from 'react'

import { Form, Input } from 'antd'
import { rulesValidation } from './rules'
import './style.css'

class InputField extends React.Component {

    constructor(props) {
		super(props)
		this.state = {
            
        }
    }
    
	render() {
		return (
			<>
				<h3 className='ph-login-main-form-label'>
					{this.props.inputNameLabel}
				</h3>
				<Form.Item
					name={this.props.inputName}
					rules={rulesValidation[this.props.inputNameRules]}>
					<Input
						className='ph-login-main-form-field'
						size='large'
						prefix={this.props.inputNameIcon}
						type={this.props.inputNameType}
						placeholder={this.props.inputNameLabel}
					/>
				</Form.Item>
			</>
		)
	}
}

export default InputField
