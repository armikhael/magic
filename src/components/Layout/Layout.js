/** @format */

import React from 'react'
import { withRouter, Link } from 'react-router-dom'

import { Button, Dropdown, Menu } from 'antd'
import { QuestionOutlined } from '@ant-design/icons'

import Header from '../../components/Header/'
import { config } from '../../components/ServiceCommons/Config'

import './style.css'

const menu = (
	<Menu>
		<Menu.Item>
			<a target='_blank' rel='noopener noreferrer' href={`${config.linkSoporte}`}>
				Contáctanos
			</a>
		</Menu.Item>
		<Menu.Item>
			<Link to={`/help/quienes-somos`}>Preguntas Frecuentes</Link>
		</Menu.Item>
	</Menu>
)

function Layout(props) {
	const handleLayouts = () => {
		if (
			props.location.pathname === '/auth/login' ||
			props.location.pathname === '/auth/recovery' ||
			props.location.pathname === '/auth/register'
		) {
			return <>{props.children}</>
		} else {
			return (
				<>
					<Header />
					<div className='cv-layout-br'></div>
					{props.children}
					<Dropdown overlay={menu} placement='topRight' arrow>
						<Button
							className='cv-layout-btn-help'
							shape='circle'
							icon={<QuestionOutlined />}
							size={'large'}
						/>
					</Dropdown>
				</>
			)
		}
	}
	return <React.Fragment>{handleLayouts()}</React.Fragment>
}

export default withRouter(Layout)
