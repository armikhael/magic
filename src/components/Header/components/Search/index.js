/** @format */

import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Input, Menu, Dropdown, Row, Col, Tag } from 'antd'

import serviceEventGoogleAnalytics from '../../../ServiceCommons/EventsGoogleAnalitycs'
import { CONSTANTS } from '../../../ServiceCommons/Constant'

import './style.css'
import { serviceGetData } from './services'

const { Search } = Input

export default function SearchNavbar() {
	let history = useHistory()
	const [isMenu, setMenu] = useState({
		countries: [],
		categories: [],
		men_categories: [],
		man_categories: [],
		mix_categories: [],
		representation: [],
	})

	useEffect(() => {
		serviceGetData().then((response) => {
			setMenu(response)
		})
	}, [])

	const handleSearch = (item) => {
		history.push(`/results/${item}`)
	}

	const menu = (
		<Menu className='cv-header-search-menu'>
			<h3 className='cv-headr-title-search-menu'>
				{' '}
				Destacados<a href='/search/q?representation=true'> Ver Todos</a>
			</h3>
			<Menu.Item>
				<div className='cv-header-search-conetent-country'>
					{isMenu.representation.map((item, i) => {
						return (
							<Link
								onClick={() => {
									serviceEventGoogleAnalytics({
										category: 'click-representation',
										action: 'click',
										label: item.name,
									})
								}}
								to={`/${item.name}`}
								key={i}>
								<img src={item.image} alt={item.name} className='cv-header-search-img'></img>
							</Link>
						)
					})}
				</div>
			</Menu.Item>

			<h3 className='cv-headr-title-search-menu'>Países</h3>
			<Menu.Item>
				<div className='cv-header-search-conetent-country'>
					{isMenu.countries.map((item, i) => {
						return (
							<Tag key={i} className='cv-header-search-tag'>
								<Link
									onClick={() => {
										serviceEventGoogleAnalytics({
											category: 'click-country',
											action: 'click',
											label: item.slug,
										})
									}}
									to={`/search/q?country=${item.slug}`}>
									{item.name}
								</Link>
							</Tag>
						)
					})}
				</div>
			</Menu.Item>

			<h3 className='cv-headr-title-search-menu'>Redes Sociales</h3>
			<Menu.Item>
				<div className='cv-header-search-conetent-country'>
					{CONSTANTS.RED_SOCIAL.map((item, i) => {
						return (
							<Tag key={i} className='cv-header-search-tag'>
								<Link
									onClick={() => {
										serviceEventGoogleAnalytics({
											category: 'click-red-social',
											action: 'click',
											label: item.value,
										})
									}}
									to={`/search/q?type=${item.value}`}>
									{item.name}
								</Link>
							</Tag>
						)
					})}
				</div>
			</Menu.Item>

			<h3 className='cv-headr-title-search-menu'>Para ellas</h3>
			<Menu.Item>
				<Row>
					{isMenu.men_categories.map((item, i) => {
						return (
							<Col xs={12} sm={12} md={6} key={i}>
								<div className='cv-header-search-content-category-main'>
									<div
										className='cv-header-search-content-category'
										style={{ backgroundImage: 'url(' + item.image + ')' }}></div>
									<Link
										onClick={() => {
											serviceEventGoogleAnalytics({
												category: 'click-category',
												action: 'click',
												label: item.slug,
											})
										}}
										className='cv-header-search-submenu-title'
										to={`/search/q?categories=${item.slug}`}>
										{item.name}
									</Link>
								</div>
							</Col>
						)
					})}
				</Row>
			</Menu.Item>
			<h3 className='cv-headr-title-search-menu'>Para ellos</h3>
			<Menu.Item>
				<Row>
					{isMenu.man_categories.map((item, i) => {
						return (
							<Col xs={12} sm={12} md={6} key={i}>
								<div className='cv-header-search-content-category-main'>
									<div
										className='cv-header-search-content-category'
										style={{ backgroundImage: 'url(' + item.image + ')' }}></div>
									<Link
										onClick={() => {
											serviceEventGoogleAnalytics({
												category: 'click-category',
												action: 'click',
												label: item.slug,
											})
										}}
										className='cv-header-search-submenu-title'
										to={`/search/q?categories=${item.slug}`}>
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
					{isMenu.mix_categories.map((item, i) => {
						return (
							<Col xs={12} sm={12} md={6} key={i}>
								<div className='cv-header-search-content-category-main'>
									<div
										className='cv-header-search-content-category'
										style={{ backgroundImage: 'url(' + item.image + ')' }}></div>
									<Link
										onClick={() => {
											serviceEventGoogleAnalytics({
												category: 'click-category',
												action: 'click',
												label: item.slug,
											})
										}}
										className='cv-header-search-submenu-title'
										to={`/search/q?categories=${item.slug}`}>
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
