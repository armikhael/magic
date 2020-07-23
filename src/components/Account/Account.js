/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

class Account extends React.Component {
	render() {
		if (this.props.items.length >= 0) {
			return (
				<div>
					{this.props.items.map(function (item, i) {
						return (
							<Link key={i} to={`/account/${item._id}`}>
								<li>
									{item.name} - {item.email}
								</li>
							</Link>
						)
					})}
				</div>
			)
		} else {
			return 'Cargando...'
		}
	}
}

export default Account
