/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, List, Typography } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

import './style.css'


export default class Sider extends React.Component {
  
	render() {

    const data = [
      {
        label: '¿Quienes somos?',
        path: '/help/about-us/'
      },
      {
        label: '¿Cómo registrarse?',
        path: '/help/register/'
      },
      {
        label: '¿Cuáles son los beneficios?',
        path: '/help/benefits/'
      }
    ];

		return (
			<>
        <Divider orientation="left">Ayuda</Divider>
          <List
            bordered
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Link to={item.path}>
                  <Typography.Text><CheckOutlined /></Typography.Text> {item.label}
                </Link>
              </List.Item>
            )}
        />
			</>
		)
	}
}
