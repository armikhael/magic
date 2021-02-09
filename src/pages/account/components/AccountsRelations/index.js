/** @format */

import React from 'react'

import { Row, Col } from 'antd'

import Account from '../../../../components/Account'

export default class AccountsRelations extends React.Component {
	render() {
		return (
			<>
				<Row className='cv-detail-accounts-relations-conente'>
					<Col xs={24} sm={24} md={24}>
						<h3>Cuentas Relacionadas</h3>
					</Col>
					{this.props.relations.map(function (item, i) {
						return (
							<Col xs={12} sm={12} md={6} key={i}>
								<Account account={item} accountBio={false} />
							</Col>
						)
					})}
				</Row>
			</>
		)
	}
}
