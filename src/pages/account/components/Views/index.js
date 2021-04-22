/** @format */

import React from 'react'
import { Line } from '@ant-design/charts'
import { Row } from 'antd'

export default function Views(props) {
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
				<Row>Total de la ultima semana: {props.total}</Row>
				<Row>
					<Line {...config} />
				</Row>
			</div>
		</>
	)
}
