/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { Row, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default class CreateUser extends React.Component {
	render() {
		return (
			<>
				{this.props.asociation.length > 0 && (
					<div className='cv-detail-contente-user-create'>
						<Row>
							<Col xs={24} sm={24} md={12}>
								{' '}
								<h3 className='cv-detail-user-create-title'>Creado por</h3>
								<UserOutlined />
								&nbsp; {this.props.email}
							</Col>
							<Col xs={24} sm={24} md={12}>
								<h3 className='cv-detail-user-create-title'>Cuentas Asociadas</h3>
								{this.props.asociation.map(function (item, i) {
									return (
										<Link key={i} to={`/${item.name}`}>
											<img
												width='22px'
												src={item.interface.icon}
												alt={item.type}
												title={item.type}
											/>
										</Link>
									)
								})}
							</Col>
						</Row>
					</div>
				)}
			</>
		)
	}
}
