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
	const [isCountries, setCountries] = useState([])

	useEffect(() => {
		serviceGetCategories().then((response) => {
			setCategories(response.categories)
			setCountries(response.countries)
		})
	}, [])

	const handleSearch = (item) => {
		history.push(`/results/${item}`)
	}

	return (
		<React.Fragment>
			<Input.Group compact className='cv-header-search-content'>
				<Select
					defaultValue={
						<img
							width='25px'
							className='cv-header-search-icon-category'
							src='https://i.ibb.co/mzMWjY8/categorias.png'
							alt='Categorias'
						/>
					}
					className='cv-header-search-select'
					dropdownClassName='cv-header-search-select-option'>
					{isCategories.map((item, i) => {
						return (
							<Option key={i}>
								<Link to={`/category/${item.name.replaceAll(' ', '-')}`}>{item.name}</Link>
							</Option>
						)
					})}
				</Select>
				<Select
					defaultValue={
						<img
							width='25px'
							className='cv-header-search-icon-category'
							src='https://i.ibb.co/mzMWjY8/categorias.png'
							alt='Categorias'
						/>
					}
					className='cv-header-search-select'
					dropdownClassName='cv-header-search-select-option'>
					{isCountries.map((item, i) => {
						return (
							<Option key={i}>
								<Link to={`/country/${item.name.replaceAll(' ', '-')}`}>{item.name}</Link>
							</Option>
						)
					})}
				</Select>
				<Search
					className='cv-header-search-input'
					placeholder='¿Qué cuentas deseas Buscar...?'
					onSearch={handleSearch}
				/>
			</Input.Group>
		</React.Fragment>
	)
}
