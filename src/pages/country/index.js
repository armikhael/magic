/** @format */

import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Layout } from 'antd'

import Loading from '../../components/Loading/Loading'
import ListMasonry from '../../components/ListMasonry/'
import PageError from '../../components/Errors/PageError'

import './style.css'
import { serviceGetAccountByCountry } from './service'

const { Content } = Layout

export default class Country extends React.Component {
	state = {
		list: [],
		page: 1,
		hasMore: true,
	}

	componentDidMount() {
		this.handleList()
	}

	handleList = () => {
		serviceGetAccountByCountry(
			this.props.match.params.name.replaceAll('-', ' '),
			this.state.page
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
						<div className='cv-category-content-title'>
							<h1 className='cv-category-title'>País: {this.props.match.params.name.replaceAll('-', ' ')}</h1>
						</div>
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
