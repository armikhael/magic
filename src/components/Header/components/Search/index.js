/** @format */

import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Input, Menu, Dropdown, Row, Col, Tag } from 'antd'

import './style.css'
import { serviceGetCategories } from './services'

const { Search } = Input

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
			<h3 className='cv-headr-title-search-menu'>Países</h3>
			<Menu.Item>
				<div className='cv-header-search-conetent-country'>
					{isMenu.countries.map((item, i) => {
						return (
							<Tag key={i} className='cv-header-search-tag'>
								<Link to={`/country/${item.slug}`}>{item.name}</Link>
							</Tag>
						)
					})}
				</div>
			</Menu.Item>
			<h3 className='cv-headr-title-search-menu'>Ideales para tí</h3>
			<Menu.Item>
				<Row>
					{isMenu.categories.slice(0, 8).map((item, i) => {
						return (
							<Col xs={12} sm={12} md={6} key={i}>
								<div className='cv-header-search-content-category-main'>
									<div
										className='cv-header-search-content-category'
										style={{ backgroundImage: 'url(' + item.image + ')' }}></div>
									<Link className='cv-header-search-submenu-title' to={`/category/${item.slug}`}>
										{item.name}
									</Link>
								</div>
							</Col>
						)
					})}
				</Row>
			</Menu.Item>
			<h3 className='cv-headr-title-search-menu'>Populares en Cuenta virales</h3>
			<Menu.Item>
				<Row>
					{isMenu.categories.slice(8, 16).map((item, i) => {
						return (
							<Col xs={12} sm={12} md={6} key={i}>
								<div className='cv-header-search-content-category-main'>
									<div
										className='cv-header-search-content-category'
										style={{ backgroundImage: 'url(' + item.image + ')' }}></div>
									<Link className='cv-header-search-submenu-title' to={`/category/${item.slug}`}>
										{item.name}
									</Link>
								</div>
							</Col>
						)
					})}
				</Row>
			</Menu.Item>
			<h3 className='cv-headr-title-search-menu'>Para todos</h3>
			<Menu.Item>
				<Row>
					{isMenu.categories.slice(16, 24).map((item, i) => {
						return (
							<Col xs={12} sm={12} md={6} key={i}>
								<div className='cv-header-search-content-category-main'>
									<div
										className='cv-header-search-content-category'
										style={{ backgroundImage: 'url(' + item.image + ')' }}></div>
									<Link className='cv-header-search-submenu-title' to={`/category/${item.slug}`}>
										{item.name}
									</Link>
								</div>
							</Col>
						)
					})}
				</Row>
			</Menu.Item>
			<h3 className='cv-headr-title-search-menu'>Entretenido</h3>
			<Menu.Item>
				<Row>
					{isMenu.categories.slice(24, 32).map((item, i) => {
						return (
							<Col xs={12} sm={12} md={6} key={i}>
								<div className='cv-header-search-content-category-main'>
									<div
										className='cv-header-search-content-category'
										style={{ backgroundImage: 'url(' + item.image + ')' }}></div>
									<Link className='cv-header-search-submenu-title' to={`/category/${item.slug}`}>
										{item.name}
									</Link>
								</div>
							</Col>
						)
					})}
				</Row>
			</Menu.Item>
		</Menu>
	)

	return (
		<React.Fragment>
			<Input.Group compact className='cv-header-search-content'>
				<Dropdown
					overlayClassName='cv-header-search-content-overlay-dropdown'
					overlay={menu}
					trigger={['click']}>
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
