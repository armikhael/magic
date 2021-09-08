/** @format */

import React, { useEffect, useState } from 'react'
import { Layout, Row, Col } from 'antd'
import { SubnodeOutlined } from '@ant-design/icons'

import Loading from '../../../../components/Loading/Loading'
import Accounts from '../../components/Accounts'

import { serviceGetData } from './services'

const { Header } = Layout

export default function ListAccount() {
	const [isData, setData] = useState()
	const [isloading, setLoading] = useState(true)

	useEffect(() => {
		serviceGetData(JSON.parse(localStorage.getItem('user')).email).then((response) => {
			if (response) {
				setData(response.accounts)
				setLoading(false)
			}
		})
	}, [])

	if (isloading === true) {
		return <Loading />
	}
	return (
		<>
			{isData && (
				<div className='cv-content-main'>
					<Layout className='cv-perfil-main-container'>
						<Row justify='center'>
							<Col xs={22} sm={20} xl={16}>
								<Header className='cv-perfil-title-main-container'>
									<SubnodeOutlined className='cv-perfil-title-main-icon' />
									<h3 className='cv-perfil-title-main-title'>Mis Enlaces Personales</h3>
								</Header>
								<Accounts componentData={isData} />
							</Col>
						</Row>
					</Layout>
				</div>
			)}
		</>
	)
}
