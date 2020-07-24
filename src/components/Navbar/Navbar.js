/** @format */

import React from 'react'

import { Menu } from 'antd'
import {
	MailOutlined,
	AppstoreOutlined,
	SettingOutlined,
} from '@ant-design/icons'

const { SubMenu } = Menu

class Navbar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			current: 'mail',
		}
	}

	handleClick = (e) => {
		this.setState({ current: e.key })
	}

	render() {
		return (
			<Menu
				onClick={this.handleClick}
				selectedKeys={[this.state.current]}
				mode='horizontal'
				theme='dark'>
				<Menu.Item key='mail' icon={<MailOutlined />}>
					Navigation One
				</Menu.Item>
				<Menu.Item key='app' disabled icon={<AppstoreOutlined />}>
					Navigation Two
				</Menu.Item>
				<SubMenu icon={<SettingOutlined />} title='Navigation Three - Submenu'>
					<Menu.ItemGroup title='Item 1'>
						<Menu.Item key='setting:1'>Option 1</Menu.Item>
						<Menu.Item key='setting:2'>Option 2</Menu.Item>
					</Menu.ItemGroup>
					<Menu.ItemGroup title='Item 2'>
						<Menu.Item key='setting:3'>Option 3</Menu.Item>
						<Menu.Item key='setting:4'>Option 4</Menu.Item>
					</Menu.ItemGroup>
				</SubMenu>
				<Menu.Item key='alipay'>Navigation Four - Link</Menu.Item>
			</Menu>
		)
	}
}

export default Navbar
