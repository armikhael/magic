/** @format */

import React from 'react'
import { Layout, Row, Col } from 'antd'

import './style.css'
import Sider from './components/Sider'

const { Content } = Layout

export default class Help extends React.Component {

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
                Contenido
              </Col>
            </Row>
          </Layout>
				</Content>
			</>
		)
	}
}
