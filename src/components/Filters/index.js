/** @format */

import React from 'react'
import { Menu, Dropdown } from 'antd'
import { FilterOutlined } from '@ant-design/icons'

import './style.css'

export default class Filters extends React.Component {
	render() {
		const menu = (
			<Menu onClick={this.props.handleMenuClick}>
				<Menu.Item key='moreFollowers' name='moreFollowers'>
					Más seguidores
				</Menu.Item>
				<Menu.Item key='lessFollowers' name='lessFollowers'>
					Menos seguidores
				</Menu.Item>
				<Menu.Item key='moreViews' name='moreViews'>
					Más visitas
				</Menu.Item>
				<Menu.Item key='lessViews' name='lessViews'>
					Menos visitas
				</Menu.Item>
			</Menu>
		)
		return (
			<>
				<div className='cv-category-content-title'>
					<h1 className='cv-category-title'>
						{this.props.section}
						<Dropdown.Button overlay={menu} style={{ float: 'right' }} icon={<FilterOutlined />}>
							Filtrar
						</Dropdown.Button>
					</h1>
				</div>
				<br></br>
			</>
		)
	}
}
