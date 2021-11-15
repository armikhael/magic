/** @format */

import React from 'react'

import { Layout } from 'antd'

import ListMasonry from '../../components/ListMasonry/'

import './style.css'
import { serviceSearch } from './services'

const { Content } = Layout

export default class Result extends React.Component {
	state = {
		list: [],
	}

	componentDidMount() {
		serviceSearch(this.props.match.params.name).then((response) => {
			this.setState({ list: response.data })
		})
	}

	render() {
		return (
			<>
				<Content className='cv-global-main-container'>
					<div className='cv-category-content-title'>
						<h1 className='cv-category-title'>
							Resultado de Busqueda: {this.props.match.params.name}
						</h1>
					</div>
					<ListMasonry listMasonry={this.state.list} />
				</Content>
			</>
		)
	}
}
