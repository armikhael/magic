/** @format */

import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'

class Test extends React.Component {
	state = {
		list: [],
		pageNumber: 1,
		items: 15,
		hasMore: true,
	}

	componentDidMount() {
		//initial request is sent
		this.handleList()
	}

	handleList = () => {
		axios
			.get(
				`https://jsonplaceholder.typicode.com/photos?_page=${this.state.pageNumber}&_limit=15`
			)
			.then((res) =>
				this.setState({
					//updating data
					list: [...this.state.list, ...res.data],
					//updating page numbers
					pageNumber: this.state.pageNumber + 1,
				})
			)
	}

	render() {
		return (
			<div className='App'>
				<InfiniteScroll
					dataLength={this.state.list.length} //This is important field to render the next data
					next={this.handleList}
					hasMore={this.state.hasMore}
					loader={<h4>Loading...</h4>}>
					{this.state.list.map((item) => (
						<ul className='user' key={item.title}>
							<li>Name: {item.title}</li>
							<img alt='hola' title='holaa' src={item.thumbnailUrl} />
						</ul>
					))}
				</InfiniteScroll>
			</div>
		)
	}
}

export default Test
