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
<p> Método de Posicionamiento 💯% Orgánico </p>
<ul>
    <li>Sin tener que entregar contraseña</li>
    <li>Crecimiento Real "100% Seguidores Reales"</li>
    <li>Los países con mayor cantidad de personas son: <b>Venezuela, Chile, Colombia, Ecuador, Perú, Argentina, México, Perú<b></li>
    <li>Garantizado</li>
    <li>Distintos planes de crecimiento</li>
    <li>Garantía de crecimiento en 72 horas ó puedes solicitar la devolución de tu dinero</li>
    <li>NO trabajamos con BOTS</li>
    <li>Si no logramos la meta en 1 Semana, te dejaremos publicado hasta lograrlo</li>
</ul>

<p> Requisitos 👇 </p>
<ul>
    <li>Tener la cuenta pública de</li>
    <li>Contar con 3 publicaciones</li>
    <li>No pagar publicidad por otros medios para que puedas verificar la eficiencia del método</li>
</ul>

<p style="text-align:center">¿Cómo lo hacemos? 👇</p>

<iframe width="100%" height="480" autoplay=1 src="https://www.youtube.com/embed/4o1cEXJvy6M" title="Posicionamiento" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<p> Paquetes de crecimiento 👇
<ul>
    <li><b>15 Dólares:</b> 300 Seguidores -> <a href="https://api.whatsapp.com/send?phone=56979582051&text=Hola, vengo de cuentasvirales.com y me interesa el paquete de 300 seguidores"> Lo quiero </a></li>
    <li><b>25 Dólares:</b> 500 Seguidores -> <a href="https://api.whatsapp.com/send?phone=56979582051&text=Hola, vengo de cuentasvirales.com y me interesa el paquete de 500 seguidores"> Lo quiero </a></li>
    <li><b>35 Dólares:</b> 1000 Seguidores -> <a href="https://api.whatsapp.com/send?phone=56979582051&text=Hola, vengo de cuentasvirales.com y me interesa el paquete de 1000 seguidores"> Lo quiero </a></li>
</ul>
<ul>
    <p>❗ Aclaratoria: Todos los paquetes estan expresados en dólares pero puedes realizar el pago en tu moneda local, al solicitar el paquete correspondiente te diremos el precio en la moneda de tu país.</p>
    <li><b>¿Quiénes han confiado en nosotros? <a href="https://drive.google.com/drive/folders/1qma_VjX-goRTLxtiCtdXx5S0htV4CI9M?usp=sharing" target="_blank" > Ver más</a></li>
    <li><b>¿Qué dicen de nosotros? <a href="https://www.facebook.com/publicidadcreativafb/reviews/?ref=page_internal" target="_blank" > Ver más</a></li>
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
