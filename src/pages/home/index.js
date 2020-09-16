/** @format */

import React from 'react'
import Masonry from 'react-masonry-css'

import { Button, DatePicker, Layout } from 'antd'

import Footer from '../../components/Footer/Footer'
import Loading from '../../components/Loading/Loading'
import Account from '../../components/Account/Account'

import './style.css'
import serviceGetAccounts from './services'

const { Content } = Layout

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: 'Hola Mundo!',
			service: null,
			accounts: {},
			loading: true,
		}
	}

	async componentDidMount() {
		let accounts = await serviceGetAccounts()
		console.log(accounts)

		this.setState({
			service: accounts.itemsPerPage,
			accounts: accounts.data,
			loading: false,
		})
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		return (
			<React.Fragment>
				<Content className='cv-container-main'>
					<Masonry
						breakpointCols={{ default: 4, 720: 2 }}
						className='my-masonry-grid'
						columnClassName='my-masonry-grid_column'>
						<div style={{ height: '100px' }}>My Element</div>
						<div style={{ height: '150px' }}>My Element</div>
						<div style={{ height: '250px' }}>My Element</div>
						<div style={{ height: '150px' }}>My Element</div>
						<div style={{ height: '100px' }}>My Element</div>
						<div style={{ height: '70px' }}>My Element</div>
						<div style={{ height: '170px' }}>My Element</div>
						<div style={{ height: '200px' }}>My Element</div>
						<div style={{ height: '100px' }}>My Element</div>
						<div style={{ height: '150px' }}>My Element</div>
						<div style={{ height: '250px' }}>My Element</div>
						<div style={{ height: '150px' }}>My Element</div>
						<div style={{ height: '100px' }}>My Element</div>
						<div style={{ height: '70px' }}>My Element</div>
						<div style={{ height: '170px' }}>My Element</div>
						<div style={{ height: '200px' }}>My Element</div>
						<div style={{ height: '100px' }}>My Element</div>
						<div style={{ height: '150px' }}>My Element</div>
						<div style={{ height: '250px' }}>My Element</div>
						<div style={{ height: '150px' }}>My Element</div>
						<div style={{ height: '100px' }}>My Element</div>
						<div style={{ height: '70px' }}>My Element</div>
						<div style={{ height: '170px' }}>My Element</div>
						<div style={{ height: '200px' }}>My Element</div>
					</Masonry>
				</Content>
				<h1>{this.state.title}</h1>
				<p>{process.env.REACT_APP_ENVIROMENT}</p>
				<>
					<Button type='primary'>PRESS ME</Button>
					<DatePicker placeholder='select date' />
				</>
				<p> Servicio nuevo: {this.state.service}</p>
				<ul>
					<Account items={this.state.accounts.data} />
				</ul>
				<Footer />
			</React.Fragment>
		)
	}
}

export default Home
