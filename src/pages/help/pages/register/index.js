/** @format */

import React from 'react'
import { Layout, Row, Col } from 'antd'

import './style.css'
import Sider from '../../components/Sider'

const { Content } = Layout

export default class Register extends React.Component {

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
                <h2>¿Cómo registrarse?</h2>
                <p>El proceso es bastante sencillo, en el vídeo te explicaremos el paso a paso de como hacerlo</p>
                <iframe 
                  width="560" 
                  height="315" 
                  src="https://www.youtube.com/embed/u0ji8h6BFos" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen title="AboutUs"></iframe>
              </Col>
            </Row>
          </Layout>
				</Content>
			</>
		)
	}
}
