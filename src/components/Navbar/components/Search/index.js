/** @format */

import React from 'react'

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
		}
	}
	async componentDidMount() {
		let response = await serviceGetCategories()
		this.setState({
			categories: response.data,
		})
	}

	render() {
		return (
			<React.Fragment>
				<Input.Group compact className='cv-navbar-search-content'>
					<Select defaultValue='Categorías' className='cv-navbar-search-select'>
						{
							this.state.categories.map(function (item, i) {
								return (
									<Option value={i} key={i}>{item.name}</Option>
								)
							})
						}
					</Select>
					<Search
						className='cv-navbar-search-input'
						placeholder='¿Qué cuentas deseas Buscar...?'
						onSearch={(value) => console.log(value)}
					/>
				</Input.Group>
			</React.Fragment>
		)
	}
}

export default SearchNavbar
