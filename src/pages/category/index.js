/** @format */

import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Layout, Menu, Dropdown } from 'antd'

import Loading from '../../components/Loading/Loading'
import ListMasonry from '../../components/ListMasonry/'
import PageError from '../../components/Errors/PageError'

import './style.css'
import { serviceGetAccountByCategory } from './services'

const { Content } = Layout

export default class Category extends React.Component {
	state = {
		list: [],
		page: 1,
		hasMore: true,
	}

	componentDidMount() {
		this.handleList()
	}

	handleList = () => {
		serviceGetAccountByCategory(this.props.match.params.name.replaceAll('-', ' '), this.state.page, 'descViews').then(
			(response) => {
				if (response.statusCode === 200) {
					this.setState({
						list: [...this.state.list, ...response.data],
						page: this.state.page + 1,
						loading: false,
					})
				} else {
					this.setState({ loading: false, error: response })
				}
			}
		)
	}

	handleMenuClick = (item) => {
		console.log('click')
		serviceGetAccountByCategory(this.props.match.params.name.replaceAll('-', ' '), 1, item.item.props.name).then(
			(response) => {
				if (response.statusCode === 200) {
					this.setState({
						list: response.data,
						loading: false,
					})
				} else {
					this.setState({ loading: false, error: response })
				}
			}
		)
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		if (this.state.error) {
			return <PageError detailError={this.state.error} />
		}
		const menu = (
			<Menu onClick={this.handleMenuClick}>
				<Menu.Item key='descFollowers' name='descFollowers'>
					Más seguidores
				</Menu.Item>
				<Menu.Item key='ascFollowers' name='ascFollowers'>
					Menos seguidores
				</Menu.Item>
				<Menu.Item key='descViews' name='descViews'>
					Más visitas
				</Menu.Item>
				<Menu.Item key='ascViews' name='ascViews'>
					Menos visitas
				</Menu.Item>
			</Menu>
		)
		return (
			<React.Fragment>
				<div>
					<Content className='cv-container-main'>
						<div className='cv-category-content-title'>
							<h1 className='cv-category-title'>
								Categoria: {this.props.match.params.name}
								<Dropdown.Button overlay={menu} style={{ float: 'right' }}></Dropdown.Button>
							</h1>
						</div>
						<br></br>
						<InfiniteScroll
							dataLength={this.state.list.length}
							next={this.handleList}
							hasMore={this.state.hasMore}
							loader={<center></center>}>
							<ListMasonry listMasonry={this.state.list} />
						</InfiniteScroll>
					</Content>
				</div>
			</React.Fragment>
		)
	}
}
