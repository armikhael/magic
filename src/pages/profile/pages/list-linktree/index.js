/** @format */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import lodash from 'lodash'

import { Row, Result, Col } from 'antd'
import { SisternodeOutlined, PlusOutlined } from '@ant-design/icons'

import Loading from '../../../../components/Loading/Loading'
import LinkTree from '../../components/LinkTree'

import { serviceGetData, serviceDelete } from './services'

import './style.sass'

export default function ListLinkTree() {
	const [isData, setData] = useState(null)
	const [isUser] = useState(JSON.parse(localStorage.getItem('user')))
	const [isCheckAcountVerified, setCheckAcountVerified] = useState([])

	const handleDeleteLink = async (item) => {
		serviceDelete(item).then((response) => {
			if (response) {
				setData(lodash.orderBy(response, ['eneable'], ['asc']))
				setCheckAcountVerified(
					response.filter((item) => {
						return item.eneable === false
					})
				)
			}
		})
	}

	useEffect(() => {
		serviceGetData(isUser.email).then((response) => {
			if (response) {
				setData(lodash.orderBy(response.links, ['eneable'], ['asc']))
				setCheckAcountVerified(
					response.links.filter((item) => {
						return item.eneable === false
					})
				)
			}
		})
	}, [isUser])

	if (isData) {
		return (
			<div className='cv-profile-business-main-container'>
				<div className='cv-profile-business-head-container'>
					<h1 className='cv-profile-business-head-title'>{`¡Te damos la bienvenida, ${isUser.first_name} ${isUser.last_name}!`}</h1>
					<div className='cv-profile-business-spacer'></div>
					{isData.length > 0 && (
						<Link className='cv-profile-business-add-button' to='/profile/linktree-name'>
							<PlusOutlined className='cv-profile-business-add-icon' />
							Agregar Cuenta
						</Link>
					)}
				</div>
				<Row>
					<Col span={24}>
						<div className='cv-profile-business-title-container'>
							<SisternodeOutlined className='cv-profile-business-title-icon' />
							<h3 className='cv-profile-business-title'>Mis Enlaces de Negocio</h3>
						</div>
						{isData.length > 0 ? (
							<LinkTree
								componentData={isData}
								checkAcountVerified={isCheckAcountVerified}
								handleDeleteLink={(data) => handleDeleteLink(data)}
							/>
						) : (
							<Result
								className='cv-profile-business-no-results-container'
								status='error'
								title='Enlaces Registrados'
								subTitle='No tienes ningún enlace personalizado todavía.'
								extra={
									<Link
										className='cv-profile-business-main-button'
										to='/profile/linktree-name'>
										Registrar
									</Link>
								}></Result>
						)}
					</Col>
				</Row>
			</div>
		)
	} else {
		return <Loading />
	}
}
