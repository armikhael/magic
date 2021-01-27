/** @format */

import React from 'react'
import { Layout, Row, Col } from 'antd'

import './style.css'
import Sider from '../../components/Sider'

const { Content } = Layout

export default class HelpBenefits extends React.Component {

	render() {
		return (
			<>
				<Content className='cv-container-main'>
          <Layout>
            <Row>
              <Col span={8}>
                <Sider/>
              </Col>
              <Col span={16}>
                <h2>¿Cuáles son los beneficios por registrarte?</h2>
                <ul>
                  <li>
                    Las empresas que nos solicitan influencers para sus campañas publicitarias 
                    vendrán directamente aquí para cotizar tus tarifas (precios) publicitarios
                  </li>
                  <li>Los emprendedores podrán contar con tus tarifas mientras duermes</li>
                  <li>Podrán encontrarte por las categorías que mas acordes a tu perfil</li>
                  <li>Si compartes tu perfil y mas personas te visitan te irás posicionando den los primeros lugares</li>
                  <li>Tendrás un lugar para almacenar todas tus tarifas y compartirsela a tu comunidad</li>
                  <li>Te ahorrará tiempo de enviar muchas cotizaciones al día</li>
                  <li>
                    Podrás registrar varias registrar varias cuentas con tu mismo correo electrónico y 
                    administrarlas todas en un mismo lugar
                    </li>
                </ul>
                
              </Col>
            </Row>
          </Layout>
				</Content>
			</>
		)
	}
}
