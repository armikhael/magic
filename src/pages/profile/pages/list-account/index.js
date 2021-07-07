/** @format */

import React, { useEffect, useState } from 'react'
import { Layout, Row, Col } from 'antd'
import { HeartOutlined } from '@ant-design/icons'

import Loading from '../../../../components/Loading/Loading'
import Accounts from '../../components/Accounts'

import { serviceGetData } from './services'

const { Header } = Layout

const ListAccount = (props) => {
	const [data, setData] = useState()
	const [loading, setLoading] = useState(true)
	const [user] = useState(JSON.parse(localStorage.getItem('user')))

	const fetchData = async (item) => {
		const response = await serviceGetData(item.email)
		setLoading(false)
		setData(response.accounts)
	}

	useEffect(() => {
		fetchData(user)
		console.log('useEffects')
	}, [user])

	if (loading === true) {
		return <Loading />
	}
	return (
		<>
			{data !== undefined && (
				<div className='cv-content-main'>
					<Layout className='cv-perfil-main-container'>
						<Row justify='center'>
							<Col xs={22} sm={20} xl={16}>
								<Header className='cv-perfil-title-main-container'>
									<HeartOutlined className='cv-perfil-title-main-icon' />
									<h3 className='cv-perfil-title-main-title'>Mis Cuentas</h3>
								</Header>

								<Accounts componentData={data} />
							</Col>
						</Row>
					</Layout>
				</div>
			)}
		</>
	)
}

export default ListAccount