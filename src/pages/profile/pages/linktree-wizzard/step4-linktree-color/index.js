/** @format */

import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, notification, Radio, Row } from 'antd'
import { LinkOutlined } from '@ant-design/icons'
import { ColorPicker, useColor } from 'react-color-palette'
import 'react-color-palette/lib/css/styles.css'

import Loading from '../../../../../components/Loading/Loading'
import PageError from '../../../../../components/Errors/PageError'

import { serviceGetData, serviceUpdateData } from './services'
import './style.css'

const LinkTreeColor = (props) => {
	const history = useHistory()
	const [data, setData] = useState()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [link, setLink] = useColor('hex', '#210358')
	const [text, setText] = useColor('hex', '#FFFFFF')
	const [icon, setIcon] = useColor('hex', '#FFFFFF')
	const [current, setCurrent] = useState('link')

	const fetchData = async (param) => {
		try {
			const response = await serviceGetData(param)
			console.log('response', response.data[0])
			setData(response.data[0])
			link.hex = response.data[0].color.link
			setLink(link)
			text.text = response.data[0].color.text
			setText(text)
			icon.icon = response.data[0].color.icon
			setIcon(icon)
			setLoading(false)
		} catch (error) {
			setError({
				statusCode: 500,
				message: 'Acción no permitida',
			})
		}
	}

	useEffect(() => {
		console.log(props.match.params.name)
		fetchData(props.match.params.name)
		console.log('useEffects') // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props])

	const handleUpdate = () => {
		const item = {
			background: data.color.background,
			text: text.hex,
			icon: icon.hex,
			link: link.hex,
		}
		data.color = item
		console.log(data)
		serviceUpdateData(data).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				console.log(response.data.name)
				notification['success']({
					message: `Felicidades!`,
					description: `Tus enlaces han sido actualizados`,
				})
				setTimeout(() => {
					history.push(`/profile/linktree`)
				}, 2000)
			} else {
				notification['error']({
					message: `Ups!`,
					description: `${response.message}`,
				})
			}
		})
	}
	const [radio, setRadio] = useState('link')

	const handleChangeColor = () => {
		switch (current) {
			case 'link':
				return <ColorPicker width={250} height={150} color={link} onChange={setLink} hideHSV hideRGB />
			case 'icon':
				return <ColorPicker width={250} height={150} color={icon} onChange={setIcon} hideHSV hideRGB />
			case 'text':
				return <ColorPicker width={250} height={150} color={text} onChange={setText} hideHSV hideRGB />

			default:
				break
		}
	}

	if (loading) {
		return <Loading />
	}
	if (error) {
		return <PageError detailError={error} />
	}

	return (
		<>
			<div className='cv-linktree-content'>
				<img className='cv-linktree-img' src={data.image} alt={data.account} title={data.account} />
				<h1 className='cv-linktree-title'>{data.account}</h1>
				<p className='cv-linktree-description'>{data.description}</p>
				<br></br>
				<div>
					{data.links.map((item, key) => {
						return (
							<a href={item.url} target='_blank' key={key} rel='noopener noreferrer'>
								<div className='cv-linktree-link' style={{ background: link.hex }}>
									<LinkOutlined className='cv-linktree-link-icon' style={{ color: icon.hex }} />
									<span style={{ color: text.hex }}>{item.title}</span>
								</div>
							</a>
						)
					})}
				</div>
			</div>

			<Row justify='center' style={{ margin: '20px 0px' }}>
				<Radio.Group value={radio} onChange={(e) => setRadio(e.target.value)}>
					<Radio.Button
						value='link'
						onClick={() => {
							setCurrent('link')
						}}>
						Enlaces
					</Radio.Button>
					<Radio.Button
						value='text'
						onClick={() => {
							setCurrent('text')
						}}>
						Texto
					</Radio.Button>
					<Radio.Button
						value='icon'
						onClick={() => {
							setCurrent('icon')
						}}>
						Iconos
					</Radio.Button>
				</Radio.Group>
			</Row>

			<Row justify='center' style={{ margin: '20px 0px' }}>
				{handleChangeColor(current)}
			</Row>

			<Row justify='center'>
				<Button
					className={'cv-linktree-button-submit'}
					style={{ margin: '20px 0px 50px' }}
					onClick={() => {
						handleUpdate()
					}}>
					Actualizar
				</Button>
			</Row>
		</>
	)
}

export default LinkTreeColor
