/** @format */

import React from 'react'
import { withRouter, Link } from 'react-router-dom'

import { Button, Dropdown, Menu } from 'antd'
import { QuestionOutlined } from '@ant-design/icons'

import Header from '../../components/Header/'

import './style.css'

const menu = (
	<Menu>
		<Menu.Item>
			<a
				target='_blank'
				rel='noopener noreferrer'
				href={`${process.env.REACT_APP_WHATSAPP}?phone=${process.env.REACT_APP_CONTACT}&text=Hola,+quisiera+solicitar+una+nuevo+pa%C3%ADs:`}>
				Contáctanos
			</a>
		</Menu.Item>
		<Menu.Item>
			<Link to={`/help/cuentas-virales`}>Preguntas Frecuentes</Link>
		</Menu.Item>
	</Menu>
)

function Layout(props) {
	const handleLayouts = () => {
		if (props.location.pathname === '/auth/login' || props.location.pathname === '/auth/register') {
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
