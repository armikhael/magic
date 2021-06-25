/** @format */

import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Layout } from 'antd'

import Loading from '../../components/Loading/Loading'
import ListMasonry from '../../components/ListMasonry/'
import PageError from '../../components/Errors/PageError'

import Slider from './components/Slider'

import './style.css'
import serviceGetAccounts from './services'

const { Content } = Layout

export default class Home extends React.Component {
	state = {
		page: 1,
		list: [],
		loading: true,
		error: null,
		hasMore: true,
	}

	componentDidMount() {
		this.handleList()
	}

	handleList = () => {
		serviceGetAccounts(this.state.page).then((response) => {
			if (response.data.statusCode === 200) {
				this.setState({
					list: [...this.state.list, ...response.data.data],
					page: this.state.page + 1,
					loading: false,
				})
			}
		})
	}

	render() {
		if (this.state.loading) {
			return <Loading />
		}
		if (this.state.error) {
			return <PageError detailError={this.state.error} />
		}
		return (
			<>
				<Slider />
				<Content className='cv-container-main'>
					<InfiniteScroll
						dataLength={this.state.list.length}
						next={this.handleList}
						hasMore={this.state.hasMore}
						loader={<center></center>}>
						<ListMasonry listMasonry={this.state.list} />
					</InfiniteScroll>
				</Content>
			</>
		)
	}
}
