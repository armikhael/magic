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
			console.log(response)
			setMenu(response)
		})
	}, [])

	const handleSearch = (item) => {
		history.push(`/results/${item}`)
	}

	const menu = (
		<Menu>
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
				<div className='cv-header-search-dropdown'>
					<Dropdown overlay={menu} trigger={['click']}>
						<div className='ant-dropdown-link' onClick={(item) => item.preventDefault()}>
							<img
								width='25px'
								className='cv-header-search-icon-submenu'
								src='https://i.ibb.co/mzMWjY8/categorias.png'
								alt='Categorias'
							/>
						</div>
					</Dropdown>
				</div>
				<Search
					className='cv-header-search-input'
					placeholder='¿Qué cuentas deseas Buscar...?'
					onSearch={handleSearch}
				/>
			</Input.Group>
		</React.Fragment>
	)
}
