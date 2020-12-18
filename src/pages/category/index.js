/** @format */

import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Layout, Spin } from 'antd'

import Loading from '../../components/Loading/Loading'
import ListMasonry from '../../components/ListMasonry/'
import PageError from '../../components/Errors/PageError'

import './style.css'
import serviceGetAccountByCategory from './services'

const { Content } = Layout

class Category extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			page: 1,
			hasMore: true,
		}
	}

	async componentDidMount() {
		console.log('categoria', this.props.match.params.name);
		await serviceGetAccountByCategory(
			this.props.match.params.name,
			this.state.page
		).then((data) => {
			if (data.statusCode === 200) {
				this.setState({
					list: [...this.state.list, ...data.data],
					page: this.state.page + 1,
					loading: false,
				})
			} else {
				this.setState({ loading: false, error: data })
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
							<h1 className='cv-category-title'>
								Category {this.props.match.params.name}
							</h1>
						</div>
						<InfiniteScroll
							dataLength={this.state.list.length}
							next={this.handleList}
							hasMore={this.state.hasMore}
							loader={
								<center>
									<Spin />
								</center>
							}>
							<ListMasonry listMasonry={this.state.list} />
						</InfiniteScroll>
					</Content>
				</div>
			</React.Fragment>
		)
	}
}
export default Category
