/** @format */

import React from 'react'
import { Layout, Row, Button } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import './style.css'
const { Content } = Layout

export default class Activation extends React.Component {
	render() {
		return (
			<>
				<Content className='cv-container-main'>
					<Row>
						<div className='cv-category-content-title'>
							<p>Su cuenta ha sido registrada exitosamente, una vez verificada su cuenta aparecerá en los resultados de búsqueda.</p>
							<p>Para verificar su identidad debe enviarnos el siguiente código a nuestra cuenta de instagram desde la cuenta que acaba de registrar</p>
							<div style={{ textAlign: 'center'}}>
								<img src={process.env.REACT_APP_LOGO} style={{ width: 200 }} alt="Cuentas Virales"/>
								<h2>@cuentasvirales</h2>
								<h1>Código: {this.props.match.params.name}</h1>
								<CopyToClipboard
									text={this.props.match.params.name}>
									<Button shape='round'>Copiar código <CopyOutlined /></Button>
								</CopyToClipboard>
							</div>
						</div>
					</Row>
				</Content>
			</>
		)
	}
}
