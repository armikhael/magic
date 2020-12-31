/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Select } from 'antd'

import './style.css'
import serviceGetCategories from './services'

const { Search } = Input
const { Option } = Select

class SearchNavbar extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			categories: [],
			path: null,
		}
	}
	async componentDidMount() {
		serviceGetCategories().then((response) => {
			this.setState({
				categories: response.data,
			})
		})
	}

	redirect = (props) => {
		console.log(this.props);
	}

	render() {
		return (
			<React.Fragment>
				<Input.Group compact className='cv-navbar-search-content'>
					<Select defaultValue='Categorías' className='cv-navbar-search-select'>
						{this.state.categories.map((item, i) => {
							return (
								<Option key={i}>
									<Link to={`/category/${item.name}`}>{item.name}</Link>
								</Option>
							)
						})}
					</Select>
					<Search
						className='cv-navbar-search-input'
						placeholder='¿Qué cuentas deseas Buscar...?'
						onSearch={this.redirect}
					/>
				</Input.Group>
			</React.Fragment>
		)
	}
}

export default SearchNavbar
