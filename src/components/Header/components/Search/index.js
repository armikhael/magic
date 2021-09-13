/** @format */

import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Input, Menu, Dropdown, Tag } from 'antd'

import serviceEventGoogleAnalytics from '../../../ServiceCommons/EventsGoogleAnalitycs'
import { CONSTANTS } from '../../../ServiceCommons/Constant'

import './style.css'
import { serviceGetData } from './services'

const { Search } = Input

export default function SearchNavbar() {
	let history = useHistory()
	const [isMenu, setMenu] = useState({
		countries: [],
		representation: [],
		categories: [],
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
				Destacados{' '}
				<a className='cv-headr-title-sub-search-menu' href='/search/q?representation=true'>
					{' '}
					Ver todos
				</a>
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

			<h3 className='cv-headr-title-search-menu'>Categorias</h3>
			<Menu.Item>
				<div className='cv-header-search-conetent-country'>
					{isMenu.categories.map((item, i) => {
						return (
							<Tag key={i} className='cv-header-search-tag'>
								<Link
									onClick={() => {
										serviceEventGoogleAnalytics({
											category: 'click-red-social',
											action: 'click',
											label: item.slug,
										})
									}}
									to={`/search/q?categories=${item.slug}`}
									style={{ textTransform: 'capitalize' }}>
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
