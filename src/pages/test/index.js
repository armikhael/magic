/** @format */
import React, { useState } from 'react'
import { Button } from 'antd'
import 'react-color-palette/lib/css/styles.css'
import { ColorPicker, useColor } from 'react-color-palette'

export default function App() {
	const [background, setBackground] = useColor('hex', '#121212')
	const [text, setText] = useColor('hex', '#FFFFFF')
	const [icon, setIcon] = useColor('hex', '#FFFFFF')
	const [current, setCurrent] = useState({
		color: background,
		method: setBackground,
	})

	return (
		<>
			<div style={{ width: '300px', height: '50px', background: background.hex, marginTop: '20px' }}>
				<div
					style={{
						width: '20px',
						height: '30px',
						background: icon.hex,
						margin: '10px',
						float: 'left',
					}}></div>
				<span style={{ color: text.hex, margin: '10px', float: 'left' }}>Letra </span>
			</div>

			<Button
				className={'cv-linktree-button-submit'}
				onClick={() => {
					setCurrent({
						color: background,
						method: setBackground,
					})
				}}>
				Fondo
			</Button>

			<Button
				className={'cv-linktree-button-submit'}
				onClick={() => {
					setCurrent({
						color: text,
						method: setText,
					})
				}}>
				Texto
			</Button>

			<Button
				className={'cv-linktree-button-submit'}
				onClick={() => {
					setCurrent({
						color: icon,
						method: setIcon,
					})
				}}>
				Iconos
			</Button>

			<ColorPicker width={250} height={150} color={current.color} onChange={current.method} hideHSV hideRGB />
		</>
	)
}
