/** @format */

import React from 'react'
import { Form, Select, Button, Input, Tag } from 'antd'
import { connect } from 'react-redux'
import { } from '@ant-design/icons'
				
import './style.css'
import { serviceGetCategories, serviceSaveAccount, serviceGetInstagramAccount } from './services'

const { Option } = Select;

class CreateAccount extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			categories: null,
			plans: [],
			phone: null,
			auxDescription: null,
			auxPrice: null,
			responseCategories: []
		}
	}

	
	async componentDidMount() {

		console.log(this.props.email);
		await serviceGetCategories().then((data) => {			
			console.log(data);
			let result = data.map((item) => {
				return {
					value: item.name
				}
			})
			this.setState({ responseCategories: result})
		})
	}
	
	handleFindAccount = async (e) => {
		if (e.key === 'Enter') {
			console.log(e.target.value);
			await serviceGetInstagramAccount(e.target.value).then((data) => {			
				const jsonObject = data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1)
				const jsonParse = JSON.parse(jsonObject);
				const userInfo = jsonParse.entry_data.ProfilePage[0].graphql.user
				this.setState({
					name: userInfo.name,
					biography: userInfo.biography,
					image: userInfo.profile_pic_url_hd,
					followers: userInfo.edge_followed_by.count,
					follow: userInfo.edge_follow.count,
					emailAccount: userInfo.business_email
				})
				console.log(this.state.image);
				console.log(userInfo);
			})
		}
	}


	handleButton = async () => {
		console.log(this.state);
		let body = {
			email: this.state.email,
			name: this.state.name,
			type: this.state.type,
			biography: this.state.biography,
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
					>
						<Input 
							defaultValue={this.props.email}
							disabled
						/>
					</Form.Item>
					<Form.Item
						label="Nombre de la cuenta"
					>
						<Input onKeyDown={this.handleFindAccount} />
					</Form.Item>
					<Form.Item label="Tipo de cuenta">
						<Select 
							onChange={this.handleChangeType}
						>
							<Option value="instagram">Instagram</Option>
						</Select>
					</Form.Item>
					
					<Form.Item
						label="Biografia"
					>
						<p>{this.state.biography}</p>
					</Form.Item>

					<Form.Item
						label="Seguidores"
					>
						<p>{this.state.followers}</p>
					</Form.Item>

					<Form.Item
						label="Seguidos"
					>
						<p>{this.state.follow}</p>
					</Form.Item>

					<Form.Item
						label="Email de la cuenta"
					>
						<p>{this.state.emailAccount}</p>
					</Form.Item>

					<img src={this.state.image} alt={this.state.name}/>

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

const mapStateToProps = state => {
	return {
		email: state.email
	}
}

export default connect(
	mapStateToProps
)(CreateAccount)
