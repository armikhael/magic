/** @format */

import React from 'react'

import { Line } from '@ant-design/charts'
import { Row, Col, Popconfirm } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

export default function Graph(props) {
	const data = props.views
	const config = {
		data,
		height: 200,
		xField: 'date',
		yField: 'counter',
		point: {
			size: 5,
			shape: 'diamond',
		},
	}

	return (
		<>
			<div className='cv-detail-contente-user-create'>
				<h3>Total de la ultima semana: {props.total}</h3>
				<Row>
					<Col span={12}>
						<Line {...config} />
					</Col>
					<Col span={12}>
						<div className='cv-detail-inter-canj-content'>
							<Popconfirm
								title='El influencer hará una mención en su cuenta, tú en la tuya (a esto le llamamos intercambio publicitario) y de esta manera intercambian seguidores (cada influencer tiene sus propias normas) ¿Estás de acuerdo?'
								okText='Si'
								cancelText='No'
								icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
								<a href={'/'}>&nbsp;Mención x Mención</a>
							</Popconfirm>
						</div>
						<div className='cv-detail-inter-canj-content'>
							<Popconfirm
								title='El influencer te pedirá un "PRODUCTO" a cambio de la publicidad, el influencer se quedará con dicho producto que primero debe probar y hará la mención de tu negocio (cada influencer tiene sus propias normas) ¿Estás de acuerdo?'
								okText='Si'
								cancelText='No'
								icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
								<a href={'/'}>&nbsp;Producto x Mención</a>
							</Popconfirm>
						</div>
						<div className='cv-detail-inter-canj-content'>
							<Popconfirm
								title='Entregarás un producto al influencer para que haga un "SORTEO" en su cuenta (cada influencer tiene sus propias normas) ¿Estás de acuerdo?'
								okText='Si'
								cancelText='No'
								icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
								<a href={'/'}>&nbsp;Sorteo x Mención</a>
							</Popconfirm>
						</div>
					</Col>
				</Row>
			</div>
		</>
	)
}
