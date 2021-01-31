/** @format */

import React from 'react'
import { withRouter } from 'react-router-dom'

import { Button } from 'antd'
import { QuestionOutlined } from '@ant-design/icons'

import Header from '../../components/Header/'

import './style.css'

function Layout(props) {
	const handleLayouts = () => {
		if (props.location.pathname === '/auth/login') {
			return <>{props.children}</>
		} else {
			return (
				<>
					<Header />
					{props.children}
					<Button
						href={'/help'}
						className='cv-layout-btn-help'
						shape='circle'
						icon={<QuestionOutlined />}
						size={'large'}
					/>
				</>
			)
		}
	}
	return <React.Fragment>{handleLayouts()}</React.Fragment>
}

export default withRouter(Layout)
