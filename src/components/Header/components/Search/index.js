/** @format */

import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Input, Menu, Dropdown } from 'antd'

import './style.css'
import { serviceGetCategories } from './services'

const { Search } = Input
const { SubMenu } = Menu

export default function SearchNavbar() {
	let history = useHistory()
	const [isMenu, setMenu] = useState({ countries: [], categories: [] })

	useEffect(() => {
		serviceGetCategories().then((response) => {
			setMenu(response)
		})
	}, [])

	const handleSearch = (item) => {
		history.push(`/results/${item}`)
	}

	const menu = (
		<Menu className='cv-header-search-menu'>
			<SubMenu title='Paises'>
				<div className='cv-header-search-submenu-content'>
					{isMenu.countries.map((item, i) => {
						return (
							<h4 key={i}>
								<Link
									className='cv-header-search-submenu-title'
									to={`/country/${item.name.replaceAll(' ', '-')}`}>
									{item.name}
								</Link>
							</h4>
						)
					})}
				</div>
			</SubMenu>
			<SubMenu title='Categorías'>
				<div className='cv-header-search-submenu-content'>
					{isMenu.categories.map((item, i) => {
						return (
							<h4 key={i}>
								<Link
									className='cv-header-search-submenu-title'
									to={`/category/${item.name.replaceAll(' ', '-')}`}>
									{item.name}
								</Link>
							</h4>
						)
					})}
				</div>
			</SubMenu>
		</Menu>
	)

	return (
		<React.Fragment>
			<Input.Group compact className='cv-header-search-content'>
				<Dropdown overlay={menu} trigger={['click']}>
					<Search
						className='cv-header-search-input'
						placeholder='¿Qué cuentas deseas Buscar...?'
						onSearch={handleSearch}
					/>
				</Dropdown>
			</Input.Group>
		</React.Fragment>
	)
}
