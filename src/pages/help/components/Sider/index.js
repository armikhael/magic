/** @format */

import React from 'react'
import { Divider, List, Typography } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

import './style.css'


export default class Sider extends React.Component {
  
	render() {

    const data = [
      '¿Quienes somos?',
      '¿Cómo registrarse?',
      '¿Cuáles son los beneficios?',
    ];

		return (
			<>
        <Divider orientation="left">Ayuda</Divider>
          <List
            bordered
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Typography.Text><CheckOutlined /></Typography.Text> {item}
              </List.Item>
            )}
        />
			</>
		)
	}
}
