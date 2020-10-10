/** @format */

import React from 'react'
import { Form, Select, Button, Input, Tag } from 'antd'

import { } from '@ant-design/icons'

import './style.css'
import { serviceGetCategories, serviceSaveAccount, serviceGetInstagramAccount } from './services'

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
			phone: null,
			auxDescription: null,
			auxPrice: null,
			responseCategories: []
		}
	}

	async componentDidMount() {
		await serviceGetCategories().then((data) => {			
			console.log(data);
			let result = data.map((item) => {
				return {
					value: item.name
				}
			})
			this.setState({ responseCategories: result})
		})

		const account = 'publicidadcreativa'
		await serviceGetInstagramAccount(account).then((data) => {			
			const jsonObject = data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)
			const jsonParse = JSON.parse(jsonObject);
			const userInfo = jsonParse.entry_data.ProfilePage[0].graphql.user
			this.setState({
				name: account,
				description: userInfo.biography
			})
			console.log(userInfo);
		})
	}
	
	handleButton = async () => {
		console.log(this.state);
		let body = {
			email: this.state.email,
			name: this.state.name,
			type: this.state.type,
			description: this.state.description,
			image: this.state.image,
			categories: this.state.categories,
			plans: this.state.plans,
			phone: this.state.phone,
		}
		await serviceSaveAccount(body).then((data) => {
			console.log(data);
		})
		
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
			country: JSON.parse(e)
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
		})
		console.log(this.state.plans);


	}
	
	render() {
		
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
					>
						<Input defaultValue={this.state.name} />
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
					>
						<Input defaultValue="Biografia" />
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
							options={this.state.responseCategories}
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
