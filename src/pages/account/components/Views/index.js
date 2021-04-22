/** @format */

import React from 'react'

import { Row } from 'antd'

export default class Views extends React.Component {
	render() {
		return (
			<>
				<div className='cv-detail-contente-user-create'>
					<Row>
						Ultimos 7 dias:
						<ul>
							{this.props.views.map(function (item, i) {
								return (
									<li key={i}>
										Visitas: {item.counter}, Fecha: {item.date}
									</li>
								)
							})}
						</ul>
						total: {this.props.total}
					</Row>
				</div>
			</>
		)
	}
}
