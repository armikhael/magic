/** @format */

import React from 'react'
import { Layout, Row, Col } from 'antd'

import './style.css'
import Sider from '../../components/Sider'

const { Content } = Layout

export default class AboutUs extends React.Component {

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
                <h2>¿Quienes Somos?</h2>
                <p>
                  <b>Cuentas Virales</b> es un proyecto impulsado por <a href="https://www.instagram.com/publicidadcreativa/">@publicidadcreativa</a>, 
                  una agencia de Publicidad y Marketing que se ha visto la necesidad de crear un espacio para influencers dispuestos a brindar 
                  sus servicios publicitarios para empresas y negocios que necesitan dar a conocer sus productos
                </p>
              </Col>
            </Row>
          </Layout>
				</Content>
			</>
		)
	}
}
