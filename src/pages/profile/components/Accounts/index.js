/** @format */

import React from 'react'
import { notification, Row, Button, Col, Tag } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CloseOutlined, CopyOutlined } from '@ant-design/icons'

import ModalEdit from '../../components/ModalEdit'
import ModalConfiguration from '../../components/ModalConfiguration'

const Accounts = (props) => {
	return (
		<>
			{props.componentData.map((item, i) => {
				return (
					<Row className='cv-profile-card-account-content' key={i}>
						<Col sm={24} md={6} className='cv-profile-upload-image'>
							<img
								className='cv-profile-main-info-inner-container-img'
								src={item.image || process.env.REACT_APP_LOGO}
								alt={item.name}
								title={item.name}
							/>
						</Col>
						<Col sm={24} md={18} className='cv-profile-account-detail-acount'>
							<Row>
								<Col span={24}>
									<h3 className='cv-profile-account-detail-title'>{item.account}</h3>
								</Col>
								<Col span={24} className='mt15'>
									{item.emailAccount}
									<p>{item.biography}</p>
								</Col>
							</Row>
							<Row>
								<Col className='mb15' xs={24} sm={24} md={24} lg={5} xl={5}>
									<Tag color='#EC428D' style={{ textTransform: 'capitalize' }}>
										{item.type}
									</Tag>
								</Col>
								<Col className='mb15' xs={24} sm={24} md={24} lg={24} xl={24}>
									{item.eneable !== true && (
										<Button
											style={{ margin: '0px 5px' }}
											shape='round'
											href={`/profile/account-activation/${item.name}/modify`}>
											Activar Cuenta
										</Button>
									)}

									{item.eneable === true && (
										<>
											<ModalEdit componentData={item} componentHeader={'Modificar Información'} />
											<ModalConfiguration
												componentData={item}
												componentHeader={'Condiguración'}
											/>
											<CopyToClipboard text={`${process.env.REACT_APP_LINKTREE}/${item.name}`}>
												<Button
													style={{ margin: '0px 5px' }}
													shape='circle'
													onClick={() => {
														notification['success']({
															message: '¡Excelente!',
															description: `Enlace Copiado.`,
															key: i,
														})
													}}>
													<CopyOutlined />
												</Button>
											</CopyToClipboard>
										</>
									)}

									<Button
										style={{ margin: '0px 5px' }}
										type='danger'
										shape='circle'
										onClick={() => {
											props.componentDelete(item)
										}}>
										<CloseOutlined />
									</Button>
								</Col>
							</Row>
						</Col>
					</Row>
				)
			})}
		</>
	)
}

export default Accounts
