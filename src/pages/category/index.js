/** @format */

import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Layout } from 'antd'

import Loading from '../../components/Loading/Loading'
import ListMasonry from '../../components/ListMasonry/'
import Filters from '../../components/Filters'
import PageError from '../../components/Errors/PageError'
import serviceEventGoogleAnalytics from '../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'
import { serviceGetAccountByCategory } from './services'

const { Content } = Layout

export default class Category extends React.Component {
	state = {
		list: [],
		page: 1,
		hasMore: true,
		orderBy: 'descViews',
	}

	componentDidMount() {
		this.handleList()
	}

	handleList = () => {
		serviceGetAccountByCategory(
			this.props.match.params.name.replaceAll('-', ' '),
			this.state.page,
			this.state.orderBy
		).then((response) => {
			if (response.statusCode === 200) {
				this.setState({
					list: [...this.state.list, ...response.data],
					page: this.state.page + 1,
					loading: false,
				})
			} else {
				this.setState({ loading: false, error: response })
			}
		})
	}

	handleMenuClick = (item) => {
		console.log('click', item.item.props.name)
		serviceEventGoogleAnalytics({
			category: 'filter',
			action: 'click',
			label: item.item.props.name,
		})
		this.setState({ list: [], loading: true, orderBy: item.item.props.name })
		serviceGetAccountByCategory(this.props.match.params.name.replaceAll('-', ' '), 1, item.item.props.name).then(
			(response) => {
				if (response.statusCode === 200) {
					this.setState({ list: response.data, loading: false })
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

		return (
			<React.Fragment>
				<div>
					<Content className='cv-container-main'>
						<Filters
							section='Categoria'
							title={this.props.match.params.name.replaceAll('-', ' ')}
							handleMenuClick={this.handleMenuClick}></Filters>
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
