/** @format */

import React from 'react'

import { Form, Select } from 'antd'
import './style.css'



class SelectField extends React.Component {

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
				>
					<Select
						style={{ width: '100%' }}
						mode={this.props.selectMode}
						placeholder={this.props.selectPlaceholder}
						defaultValue={this.props.selectDefault}
						onChange={this.props.selectFunction}
					>
						{this.props.selectOptions}
					</Select>
				</Form.Item>
			</>
		)
	}
}

export default SelectField
