/** @format */

import React from 'react'

import { Input, Select } from 'antd'

import './style.css'

const { Search } = Input
const { Option } = Select

class SearchNavbar extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Input.Group compact className='cv-navbar-search-content'>
					<Select defaultValue='Categorías' className='cv-navbar-search-select'>
						<Option value='Option1'>Option1</Option>
						<Option value='Option2'>Option2</Option>
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
