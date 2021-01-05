/** @format */

import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Input, Select } from 'antd'

import './style.css'
import { serviceGetCategories } from './services'

const { Search } = Input
const { Option } = Select

export default function SearchNavbar() {
	let history = useHistory()
	const [isCategories, setCategories] = useState([])

	useEffect(() => {
		serviceGetCategories().then((response) => {
			setCategories(response.data)
		})
	}, [])

	const handleSearch = (item) => {
		history.push(`/results/${item}`)
	}

	return (
		<React.Fragment>
			<Input.Group compact className='cv-navbar-search-content'>
				<Select defaultValue='Categorías' className='cv-navbar-search-select'>
					{isCategories.map((item, i) => {
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
					onSearch={handleSearch}
				/>
			</Input.Group>
		</React.Fragment>
	)
}
