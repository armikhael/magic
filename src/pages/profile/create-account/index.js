/** @format */

import React from 'react'
import { Form, Select, Button, Input, Tag } from 'antd'

import { } from '@ant-design/icons'

import './style.css'


const { Option } = Select;

class CreateAccount extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: null,
			name: null,
			type: null,
			description: null,
			image: null,
			categories: null,
			plans: [],
			auxDescription: null,
			auxPrice: null
		}
	}

	handleButton = async () => {
		console.log(this.state);
	} 

	handleChangeInput = (e) => {
		console.log(e.target.value);
		this.setState({
			[e.target.id]: e.target.value
		})
	}
	handleChangePlans = (e) => {
		console.log(e.target.value);
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleChangeType = (e) => {
		console.log(e);
		this.setState({
			type: e
		})
	}

	handleChangeCountry = (e) => {
		console.log(JSON.parse(e));
		this.setState({
			country: e
		})
	}

	handlerTagRender(props) {
		const { label, value, closable, onClose } = props;
	  
		return (
		  <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
			{label}
		  </Tag>
		);
	}

	handleCategory = (e) => {
		console.log(e);
		this.setState({
			categories: e
		})
	}

	handleButtonPlans = () => {	
		let arrayPlans = this.state.plans
		arrayPlans.push({
			description: this.state.auxDescription,
			proce: this.state.auxPrice,
		})
		this.setState({
			plans: arrayPlans,
			auxDescription: '',
			auxPrice: ''
		})
		console.log(this.state.plans);


	}
	
	render() {
		const options = [{ value: 'Deporte' }, { value: 'Comida' }, { value: 'Dietas' }, { value: 'Rutinas' }];
		return (
			<div>
				<h1>Crear Cuenta</h1>
				<Form
					onFinish={this.handleSubmitLogin}
				>	
					<Form.Item
						label="Correo Electrónico:"
						name="email"
						onChange={this.handleChangeInput}
						defaultValue="diego.carciente@gmail.com"
					>
						<Input/>
					</Form.Item>
					<Form.Item
						label="Nombre de la cuenta"
						name="name"
						onChange={this.handleChangeInput}
						defaultValue="@publicidadcreativa"
					>
						<Input/>
					</Form.Item>
					<Form.Item label="Tipo de cuenta">
						<Select 
							onChange={this.handleChangeType}
						>
							<Option value="instagram">Instagram</Option>
							<Option value="facebook">Facebook</Option>
							<Option value="youtube">Youtube</Option>
						</Select>
					</Form.Item>
					
					<Form.Item
						label="Biografia"
						name="description"
						onChange={this.handleChangeInput}
						defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
					>
						<Input/>
					</Form.Item>

					<Form.Item
						label="Imagen"
						name="image"
						onChange={this.handleChangeInput}
						defaultValue="https://i.pinimg.com/236x/3e/7e/37/3e7e37c281b5947d7aae4e8575882309.jpg"
					>
						<Input/>
					</Form.Item>

					<Form.Item label="País">
						<Select 
							onChange={this.handleChangeCountry}
						>
							<Option value={JSON.stringify({ code: "56", name: "chile" })}>Chile</Option>
							<Option value={JSON.stringify({ code: "57", name: "colombia" })}>Colombia</Option>
							<Option value={JSON.stringify({ code: "58", name: "venezuela" })}>Venezuela</Option>
						</Select>
					</Form.Item>
					
					
					<Form.Item
						label="Número"
						name="phone"
						onChange={this.handleChangeInput}
						defaultValue="982565380"
					>
						<Input/>
					</Form.Item>
					<Form.Item
						label="Categorias"
						name="categories"
					>
						<Select
							mode="multiple"
							showArrow
							tagRender={this.tagRender}
							style={{ width: '100%' }}
							options={options}
							onChange={this.handleCategory}
						/>
					</Form.Item>
					
					<hr></hr>

					<Form.Item label="Planes">
						<Input.Group compact>
							<Form.Item
								name="auxDescription"
								placeholder="Descripción del paquete" 
								onChange={this.handleChangePlans}
							>
								<Input/>
							</Form.Item>
							<Form.Item
								name="auxPrice"
								placeholder="price"
								onChange={this.handleChangePlans}
							>
								<Input/>
							</Form.Item>
						</Input.Group>
						<Form.Item>
							<Button
								type="primary" 
								shape="round"
								onClick={this.handleButtonPlans}
							>
								Agregar otro Plan
							</Button>
						</Form.Item>
      				</Form.Item>

					<Form.Item>
						<Button
							type="primary" 
							shape="round"
							onClick={this.handleButton}
						>
							Registrar
						</Button>
					</Form.Item>
				</Form>

			</div>
		)
	}
}
export default CreateAccount
