/** @format */

import React from 'react'
import { Layout } from 'antd'
import './style.css'

const { Content } = Layout

export default class View extends React.Component {

	componentDidMount() {
		console.log(atob(this.props.match.params.name));
	}

	render() {
		return (
			<>
				<Content className='cv-container-main'>
					<div className='cv-category-content-title'>
						<h1 className='cv-category-title'>
							Resultado de Busqueda: {atob(this.props.match.params.name)}
						</h1>
					</div>
				</Content>
			</>
		)
	}
}
