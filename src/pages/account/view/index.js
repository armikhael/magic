/** @format */

import React from 'react'
import { Layout } from 'antd'
import './style.css'
import { serviceGetAccountByEmail } from './service'
import ListMasonry from '../../../components/ListMasonry/'

const { Content } = Layout

export default class View extends React.Component {

  state = {
		list: [],
  }
  
	componentDidMount() {
    serviceGetAccountByEmail(atob(this.props.match.params.name)).then((response) => {
      console.log(response);
			this.setState({ list: response })
		})
	}

	render() {
		return (
			<>
				<Content className='cv-container-main'>
					<div className='cv-category-content-title'>
						<h1 className='cv-category-title'>
							Resultado de Busqueda: {atob(this.props.match.params.name)}
						</h1>
            <ListMasonry listMasonry={this.state.list} />
					</div>
				</Content>
			</>
		)
	}
}
