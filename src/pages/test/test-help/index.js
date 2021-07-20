/** @format */
import renderHTML from 'react-render-html'
import React from 'react'
import { Layout, Row, Col } from 'antd'

const { Content } = Layout

const html = `

<div style="width:50%; margin: 0px auto; text-align: center">
    <img style="width:100%; border-radius: 10px;" style="border-radius: 10px;" src="https://i.ibb.co/9gxfHB7/d119.jpg" alt="logo">
    <p style="margin: 10px; font-weight: bold; font-size: 18px;">Cuentas Virales, la aplicación de Publicidad Creativa</p>
</div>
<p style="text-align:center"> ¿Quienes Somos? 🤔 </p>
<p> Una agencia publicitaria con más de 5 años de trayectoria realizando publicidad a distintas marcas con técnicas de "Growth Hacking" bien conocido como crecimiento exponencial dentro de las redes sociales.</p>
<ul>
    <li><a href="https://www.instagram.com/publicidadcreativa/" target="_blank" > Nuestra Agencia</a></li>
    <li><a href="https://www.instagram.com/cuentasvirales/" target="_blank" > Nuestro Portafolio</a></li>
</ul>
<p style="text-align:center"> ¿Qué dicen de Nosotros? 🧐  </p>
<p> Sabemos que las acciones hablan mucho mas que las palabras y es por eso que te dejaremos algunos enlaces para que nos conozcas un poco más.</p>
<ul>
    <li><a href="https://www.facebook.com/publicidadcreativafb/reviews/?ref=page_internal" target="_blank" > ¿Qué dicen de nosotros?</a></li>
</ul>

<p style="text-align:center">¿Con quién hemos trabajamos? 🥸</p>
<p> 
    Principalmente con Marcas Personales y Emprendimientos, ayudándolos a formar comunicades mucho más amplias para competir dentro del mercado de las redes sociales y para demoostrarte hechos los resultados de otras marcas te dejamos nuestro portafolio de
</p>
<ul>
    <li><a href="https://drive.google.com/drive/folders/1qma_VjX-goRTLxtiCtdXx5S0htV4CI9M?usp=sharing"> Clientes Atendidos </a></li>
</ul>



`

export default function App() {
	return (
		<>
			<Content className='cv-container-main'>
				<div className='cv-help-content'>
					<h1 className='cv-help-title'>¿Necesitas Ayuda?</h1>
				</div>
				<Layout>
					<Row>
						<Col xs={24} sm={24} md={8}></Col>
						<Col xs={24} sm={24} md={16}>
							<div className='cv-help-content'>{renderHTML(html)}</div>
						</Col>
					</Row>
				</Layout>
			</Content>
		</>
	)
}
