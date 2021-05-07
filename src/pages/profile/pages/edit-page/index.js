/** @format */

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GET_DATA, UPDATE_DATA, UPDATE_ONE } from '../../../../redux/PageDucks'
import FormPage from '../../components/FormPage'

const EditPage = () => {
	const dispatch = useDispatch()
	const infoPage = useSelector((store) => store.page)

	const fetchData = async () => {
		dispatch(GET_DATA())
	}

	useEffect(() => {
		fetchData()
	}, [dispatch])

	return (
		<>
			{infoPage !== undefined && (
				<ul>
					{' '}
					Datos relevantes a mostrar
					<li>Estadísticas de visitas: {infoPage.views}</li>
					<li>Clicks Recibidos: {infoPage.clicks}</li>
					<li>
						<FormPage data={infoPage}></FormPage>
					</li>
					<li>
						<button
							onClick={() =>
								dispatch(
									UPDATE_DATA({
										title: 'Titulo Promocional Nuevo',
										image: 'https://i.postimg.cc/YSQXZWCP/logo.jpg',
										description:
											'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
										priceRegular: '7777',
										pricePromotional: '3333',
										phone: '8888',
										dateLimit: '01/01/9999',
										views: '4444',
										clicks: '3333',
									})
								)
							}>
							Actualizar
						</button>
					</li>
					<li>
						<button
							onClick={() => {
								dispatch(UPDATE_ONE({ attriute: 'title', value: 'NUEVO TITULO DESDE EL STATE' }))
							}}>
							Actualizar Titulo
						</button>
					</li>
					<li>
						<button
							onClick={() => {
								console.log(infoPage)
							}}>
							Enviar
						</button>
					</li>
				</ul>
			)}
		</>
	)
}

export default EditPage
