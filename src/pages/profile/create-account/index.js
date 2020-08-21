/** @format */

import React from 'react'
import { Form, Select, Button, Input } from 'antd'

import { MailOutlined, UserOutlined,  } from '@ant-design/icons'
import InputField from '../../../components/Input'
import SelectField from '../../../components/Select'

import './style.css'

function handleChange(value) {
    console.log(`selected ${value}`);
}

const { Option } = Select;

const selectParams = [];
for (let i = 0; i < 10; i++) {
	selectParams.push(<Option key={i}>{ 'Categoria ' + i }</Option>);
}


class CreateAccount extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			plans: [],
		}
	}


	handleButton(e){
		alert(e)
	}
	
	render() {
		
		return (
			<div>
				<h1>Crear Cuenta</h1>
				<Form>
					<InputField
						inputName={'email'}
						inputNameLabel={'Correo electrónico'}
						inputNameMessage={'diego.carciente@gmail.com'}
						inputNameType={'text'}
						inputNameIcon={<MailOutlined />}
						inputNameRules={'rulesEmail'}
					/>
					<InputField
						inputName={'name'}
						inputNameLabel={'Nombre de la cuenta'}
						inputNameMessage={'@publicidadcreativa'}
						inputNameType={'text'}
						inputNameIcon={<UserOutlined />}
						inputNameRules={'rulesText'}
					/>
					<InputField
						inputName={'type'}
						inputNameLabel={'Tipo de cuenta'}
						inputNameRule={true}
						inputNameMessage={'instagram'}
						inputNameType={'text'}
						inputNameRules={'rulesText'}
					/>
					<InputField
						inputName={'description'}
						inputNameLabel={'Biografía'}
						inputNameRule={true}
						inputNameMessage={'La Casa de Papel como la mejor serie del mundo'}
						inputNameType={'text'}
						inputNameRules={'rulesText'}
					/>
					<InputField
						inputName={'image'}
						inputNameLabel={'Imagen de la cuenta'}
						inputNameRule={true}
						inputNameMessage={'https://i.pinimg.com/236x/3e/7e/37/3e7e37c281b5947d7aae4e8575882309.jpg'}
						inputNameType={'text'}
						inputNameRules={'rulesText'}
					/>
					<InputField
						inputName={'code'}
						inputNameLabel={'Código de pais'}
						inputNameRule={true}
						inputNameMessage={'+56'}
						inputNameType={'text'}
						inputNameRules={'rulesText'}
					/>
					<InputField
						inputName={'phone'}
						inputNameLabel={'Número'}
						inputNameRule={true}
						inputNameMessage={'982565380'}
						inputNameType={'text'}
						inputNameRules={'rulesPhone'}
					/>
					<SelectField
						selectMode={"multiple"}
						selectPlaceholder={"¿En qué categorias influencias?"}
						selectDefault={[]}
						selectFunction={handleChange}
						selectOptions={selectParams}
					/>
					<InputField
						inputName={'plansDescription'}
						inputNameLabel={'Descripción del Plan'}
						inputNameRule={true}
						inputNameMessage={'Plan publicitario 1'}
						inputNameType={'text'}
						inputNameRules={'rulesText'}
					/>
					<Input 
						placeholder="Precio" 
						size="small"
					/>
					<Button
						type="primary" e
						shape="round"
						size='large'
						onClick={this.handleButton}
					>
						Agregar
					</Button>
					
				</Form>

			</div>
		)
	}
}
export default CreateAccount
