/** @format */

import React from 'react'

import { Layout } from 'antd'

import Loading from '../../components/Loading/Loading'
import ListMasonry from '../../components/ListMasonry/'

import './style.css'
import serviceGetAccountByCategory from './services'

const { Content } = Layout

class Category extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			accounts: [],
		}
	}

	async componentDidMount() {
		console.log(this.props.match.params.name)
		let page = this.props.match.params.name ? this.props.match.params.page : 0
		await serviceGetAccountByCategory(this.props.match.params.name, page).then(
			(data) => {
				if (data.statusCode === 200) {
					console.log(data.data)
					this.setState({ loading: false, accounts: data.data })
				} else {
					this.setState({ loading: false, error: data })
				}
			}
		)
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		return (
			<React.Fragment>
				<div>
					<Content className='cv-container-main'>
						<div className='cv-category-content-title'>
							<h1 className='cv-category-title'>
								Category {this.props.match.params.name}
							</h1>
						</div>
						<ListMasonry listMasonry={this.state.accounts} />
					</Content>
				</div>
			</React.Fragment>
		)
	}
}
export default Category
