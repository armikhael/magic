/** @format */

import React from 'react'

import { Row, Col } from 'antd'

import './style.css'

export default class InterestAccounts extends React.Component {
	render() {
		return (
			<>
				{this.props.interestAccounts.length > 0 && (
					<div className='cv-account-interes-account-content'>
						<h3 className='cv-account-interes-account-title'>Cuentas de Interes</h3>
						<div className='cv-detail-plans-hr'></div>
						{this.props.interestAccounts.map(function (item, i) {
							return (
								<Row
									key={i}
									className='cv-header-notifi-content-menu-item-row'
									onClick={() => {
										window.open(item.redirect)
									}}>
									<Col xs={2} sm={4} md={4}>
										<img className='cv-header-notifi-list-img' src={item.image} alt={item.title} />
									</Col>
									<Col xs={22} sm={20} md={20} className='cv-header-notifi-list-content'>
										<h3 className='cv-header-notifi-list-title'>{item.title}</h3>
										<h3 className='cv-header-notifi-list-moment'>{item.followers} Seguidores</h3>
									</Col>
								</Row>
							)
						})}
					</div>
				)}
			</>
		)
	}
}
