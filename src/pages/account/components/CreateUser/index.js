/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { Row, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default class CreateUser extends React.Component {
	render() {
		console.log(this.props.asociation)
		return (
			<>
				<div className='cv-detail-contente-user-create'>
					<Row>
						<Col xs={24} sm={24} md={12}>
							<h3 className='cv-detail-user-create-title'>Creado por</h3>
							<UserOutlined />
							&nbsp; {this.props.email}
						</Col>
						{this.props.asociation.length > 0 && (
							<Col xs={24} sm={24} md={12}>
								<h3 className='cv-detail-user-create-title'>Cuentas Asociadas</h3>
								<Row>
									{this.props.asociation.map(function (item, i) {
										return (
											<Col xs={24} sm={24} md={12} key={i}>
												<Link to={`/${item.name}`}>
													<img
														width='22px'
														src={item.interface.icon}
														alt={item.type}
														title={item.type}
													/>
													&nbsp;{item.account}
												</Link>
											</Col>
										)
									})}
								</Row>
							</Col>
						)}
					</Row>
				</div>
			</>
		)
	}
}
