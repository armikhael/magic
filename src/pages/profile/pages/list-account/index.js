/** @format */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Row, Col, Button, Modal } from 'antd'
import {
	ExportOutlined,
	QuestionOutlined,
	SafetyOutlined,
	SubnodeOutlined,
	ExclamationCircleOutlined,
} from '@ant-design/icons'

import Loading from '../../../../components/Loading/Loading'
import Accounts from '../../components/Accounts'

import { serviceGetData } from './services'
import './style.css'
import { PlusOutlined } from '@ant-design/icons'

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
						<Row>
							<Col xs={24} sm={24} md={21} xl={21}>
								<h1 className='cv-profile-list-account-main-title'>
									¡Te damos la bienvenida, {JSON.parse(localStorage.getItem('user')).first_name}{' '}
									{JSON.parse(localStorage.getItem('user')).last_name}!
								</h1>
							</Col>
							<Col xs={24} sm={24} md={3} xl={3} className='cv-profile-list-account-button-add-content'>
								{isData.length > 0 && (
									<Button
										className='cv-profile-list-account-button-add'
										onClick={() => {
											window.location.href = `/profile/account-user`
										}}
										icon={<PlusOutlined />}>
										Agregar cuenta
									</Button>
								)}
							</Col>
						</Row>
						<Row>
							<Col xs={24} sm={24} md={24} xl={24}>
								<div>
									<div className='cv-profile-list-account-subtitle-main-container'>
										<SubnodeOutlined className='cv-profile-list-account-main-icon' />
										<h3 className='cv-profile-list-account-main-subtitle '>
											Mis Enlaces Personales
										</h3>
									</div>
								</div>
								<Accounts componentData={isData} />
							</Col>
						</Row>
						<Row className='mt15'>
							<Col xs={24} sm={8} md={8}>
								<Link to={`/profile/change-password`}>
									<div className='cv-profile-card-item-tre'>
										<div className='cv-profile-card-item-img'>
											<SafetyOutlined className='cv-profile-card-item-img-icon-tre' />
										</div>
										<div className='cv-profile-card-item-title'>
											<h3>Cambiar contraseña</h3>
											<p>Para proteger tu cuenta, cambia a menudo tu contraseña.</p>
										</div>
									</div>
								</Link>
							</Col>
							<Col xs={24} sm={8} md={8}>
								<Link to={`/help/quienes-somos`}>
									<div className='cv-profile-card-item-tre'>
										<div className='cv-profile-card-item-img'>
											<QuestionOutlined className='cv-profile-card-item-img-icon-tre' />
										</div>
										<div className='cv-profile-card-item-title'>
											<h3>Preguntas frecuentes</h3>
											<p>Tines alguna duda entra en ayuda y busca lo que necesites.</p>
										</div>
									</div>
								</Link>
							</Col>
							<Col xs={24} sm={8} md={8}>
								<div
									className='cv-profile-card-item-tre'
									onClick={() => {
										Modal.confirm({
											title: 'Cerrar seción',
											icon: <ExclamationCircleOutlined />,
											content: '¿Estas seguro que queires cerrar tu seción?',
											okText: 'Confirmar',
											onOk: this.handleCloseSesion,
											cancelText: 'Cancelar',
										})
									}}>
									<div className='cv-profile-card-item-img'>
										<ExportOutlined className='cv-profile-card-item-img-icon-tre' />
									</div>
									<div className='cv-profile-card-item-title'>
										<h3>Cerrar seción</h3>
										<p>¿Deseas cerrar sesión en tu cuenta? no olvides visitarnos</p>
									</div>
								</div>
							</Col>
						</Row>
						<hr className='cv-profile-hr'></hr>
						<Row>
							<Col xs={24} sm={6} md={6}>
								<Link to={`help/posicionamiento`}>
									<div className='cv-profile-card-item-link'>¿Quieres publicidad?</div>
								</Link>
							</Col>
							<Col xs={24} sm={6} md={6}>
								<Link to={`/pricing`}>
									<div className='cv-profile-card-item-link'>¿Necesitas ganar más seguidores?</div>
								</Link>
							</Col>
							<Col xs={24} sm={6} md={6}>
								<Link to={`/help/quienes-somos`}>
									<div className='cv-profile-card-item-link'>Preguntas Frecuentes.</div>
								</Link>
							</Col>
							<Col xs={24} sm={6} md={6}>
								<Link to={`/help/faq`}>
									<div className='cv-profile-card-item-link'>Políticas de Privacidad.</div>
								</Link>
							</Col>
						</Row>
						<br></br>
					</Layout>
				</div>
			)}
		</>
	)
}
