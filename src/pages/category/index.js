/** @format */

import React from 'react'

import Loading from '../../components/Loading/Loading'
import Account from '../../components/Account/Account'

import './style.css'
import serviceGetAccountByCategory from './services'

class Category extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			accounts: []
		}
	}

	async componentDidMount() {
		console.log(this.props.match.params.name);
		
		let page = (this.props.match.params.name) ? this.props.match.params.page : 0
		await serviceGetAccountByCategory(this.props.match.params.name, page).then((data) => {			
			if (data.statusCode !== 200) {
				this.setState({ loading: false, error: data })
			} else {
				this.setState({ loading: false, accounts: data.data })
			}
		})

		
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		return (
			<React.Fragment>
				<div>
					<h1>Category</h1>
					<p>Cuentas por categoria</p>
					<ul>
						<Account items={this.state.accounts} />
					</ul>
				</div>
			</React.Fragment>
		)
	}
}
export default Category
