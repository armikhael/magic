/** @format */

import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Layout, Select } from 'antd'

import Loading from '../../components/Loading/Loading'
import ListMasonry from '../../components/ListMasonry/'
import PageError from '../../components/Errors/PageError'

import './style.css'
import { serviceGetAccountByCountry } from './service'

const { Content } = Layout
const { Option } = Select
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
		serviceGetAccountByCountry(this.props.match.params.name.replaceAll('-', ' '), this.state.page, 'descViews').then(
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

	handleChange = (value) => {
		console.log(value)
		serviceGetAccountByCountry(this.props.match.params.name.replaceAll('-', ' '), 1, value).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				this.setState({
					list: response.data,
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
							<h1 className='cv-category-title'>
								País: {this.props.match.params.name.replaceAll('-', ' ')}
								<Select
									style={{ width: 200, float: 'right' }}
									onChange={this.handleChange}
									placeholder='Ordernar por'>
									<Option value={'descFollowers'}>Más seguidores</Option>
									<Option value={'ascFollowers'}>Menos seguidores</Option>
									<Option value={'descViews'}>Mayor visitas</Option>
									<Option value={'ascViews'}>Menor visitas</Option>
								</Select>
							</h1>
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
