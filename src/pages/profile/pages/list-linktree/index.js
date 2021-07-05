/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Row, Card, Button, Result } from 'antd'
import { LinkOutlined } from '@ant-design/icons'

import Loading from '../../../../components/Loading/Loading'
import LinkTree from '../../components/LinkTree'

import { serviceGetData } from './services'

const { Header, Content } = Layout

const ListLinkTree = (props) => {
	const history = useHistory()
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [user] = useState(JSON.parse(localStorage.getItem('user')))

	const fetchData = async (item) => {
		const response = await serviceGetData(item.email)
		console.log(response)
		setLoading(false)
		setData(response.links)
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
			<div>
				<Layout className='cv-perfil-main-container'>
					<Row>
						<Content>
							<Header className='cv-perfil-title-main-container'>
								<LinkOutlined className='cv-perfil-title-main-icon' />
								<h3 className='cv-perfil-title-main-title'>Mis Enlaces</h3>
							</Header>
						</Content>
					</Row>
					<Row>
						<Card className='cv-profile-main-container'>
							{data.length > 0 && <LinkTree componentData={data} />}

							{data.length <= 0 && (
								<Result
									status='error'
									title='Enlaces Registrados'
									subTitle='No tienes ningún enlace personalizado todavía.'
									extra={[
										<Button
											key='button'
											onClick={() => {
												history.push(`/profile/linktree-name`)
											}}
											className={'cv-account-wizzard-button-submit'}>
											Registrar
										</Button>,
									]}></Result>
							)}
						</Card>
					</Row>

					{data.length > 0 && (
						<Row>
							<Button
								onClick={() => {
									history.push(`/profile/linktree-name`)
								}}
								className={'cv-account-wizzard-button-submit'}>
								Agregar
							</Button>
						</Row>
					)}
				</Layout>
			</div>
		</>
	)
}

export default ListLinkTree
