/** @format */

import React, { useEffect, useState } from 'react'
import { Layout, Row, Col } from 'antd'
import { SubnodeOutlined } from '@ant-design/icons'

import Loading from '../../../../components/Loading/Loading'
import Accounts from '../../components/Accounts'

import { serviceGetData } from './services'
import './style.css'

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
						<h1 className='cv-profile-list-account-main-title'>¡Te damos la bienvenida, Ana!</h1>
						<Row>
							<Col xs={22} sm={20} xl={16}>
								<div className='cv-profile-list-account-subtitle-main-container'>
									<SubnodeOutlined className='cv-profile-list-account-main-icon' />
									<h3 className='cv-profile-list-account-main-subtitle '>Mis Enlaces Personales</h3>
								</div>
								<Accounts componentData={isData} />
							</Col>
						</Row>
					</Layout>
				</div>
			)}
		</>
	)
}
