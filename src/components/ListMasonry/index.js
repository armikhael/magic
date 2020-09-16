/** @format */

import React from 'react'
import Masonry from 'react-masonry-css'

import Account from '../Account/'

import './style.css'

class ListMasonry extends React.Component {
	render() {
		return (
			<Masonry
				breakpointCols={{ default: 4, 720: 2 }}
				className='cv-masonry-grid'
				columnClassName='cv-masonry-grid_column'>
				{this.props.listMasonry.map(function (item, i) {
					return <Account account={item} key={i} />
				})}
			</Masonry>
		)
	}
}

export default ListMasonry
