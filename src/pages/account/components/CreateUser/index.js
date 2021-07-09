/** @format */

import React from 'react'
import { Link } from 'react-router-dom'

import { Row, Col } from 'antd'

import './style.css'

export default class CreateUser extends React.Component {
	render() {
		return (
			<>
				{this.props.componentData.representation === false && this.props.asociation.length > 0 && (
					<div className='cv-detail-content-create-user'>
						<Row>
							<Col xs={24} sm={24} md={42}>
								<br />
								<h3 className='cv-detail-user-create-title'>Cuentas Asociadas</h3>
								<Row>
									{this.props.asociation.map(function (item, i) {
										return (
											<Col xs={24} sm={24} md={24} key={i}>
												<Link to={`/${item.name}`}>
													<img
														width='22px'
														src={item.interface.icon}
														alt={item.type}
														title={item.type}
													/>
													&nbsp;&nbsp;{item.account}
												</Link>
											</Col>
										)
									})}
								</Row>
							</Col>
						</Row>
					</div>
				)}

				{this.props.componentData.representation === true && this.props.asociation.length > 0 && (
					<div className='cv-detail-content-create-user'>
						<Row>
							<Col xs={24} sm={24} md={42}>
								<br />
								<h3 className='cv-detail-user-create-title'>Cuentas Asociadas</h3>
								<Row>
									{this.props.asociation.map(function (item, i) {
										return (
											<Col xs={24} sm={24} md={24} key={i}>
												<Link to={`/${item.name}`}>
													<img
														width='22px'
														src={item.interface.icon}
														alt={item.type}
														title={item.type}
													/>
													&nbsp;&nbsp;{item.account}
												</Link>
											</Col>
										)
									})}
								</Row>
							</Col>
						</Row>
					</div>
				)}
			</>
		)
	}
}
