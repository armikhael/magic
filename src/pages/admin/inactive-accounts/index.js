/** @format */

import React from 'react'
import { Layout, Button, Form, Input } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'
import { serviceGetAccountsInactives, serviceActiveAccount } from './services'
import './style.css'

const { Content } = Layout

export default class InactiveAccounts extends React.Component {
	state = {
		list: [],
	}

	componentDidMount() {
		serviceGetAccountsInactives().then((response) => {
      console.log(response.data);
			this.setState({ list: response.data })
		})
  }
  
  handleActiveAccount = async(item) => {
    item.image = this.state.image
    console.log(item);
    serviceActiveAccount(item).then((response) => {
      this.setState({ list: response.data })
		})
  }

  handleChangeInput = (e) => {
    console.log('write', e.target.name, e.target.value);
		this.setState({
			[e.target.name]: e.target.value,
		})
  }
  
	render() {
		return (
			<>
				<Content className='cv-container-main'>
					<div className='cv-category-content-title'>
						<h1 className='cv-category-title'>
							Cuentas inactivas
						</h1>
					</div>
          {this.state.list.length > 0 &&
            <ul >
              {this.state.list.map((item, i) => {
                return (
                  
                  <ul key={i}>
                    <li> id: {item._id}</li>
                    <li> 
                      phone: {item.code}{item.phone} -- 
                      <CopyToClipboard
                        text={`${process.env.REACT_APP_WHATSAPP}?phone=${item.code}${item.phone}&text=Hola+${item.account},+como+estas?`}>
                        <Button shape='round'>Copiar <CopyOutlined /></Button>
                      </CopyToClipboard>
                    </li>
                    <li> token: {btoa(item.account)}</li>
                    <li> 
                      verificar: 
                      <a href={`https://${item.type}.com/${item.account}`} target="__blank">{item.account}</a> --  
                      <CopyToClipboard
                        text={item.account}>
                        <Button shape='round'>Copiar <CopyOutlined /></Button>
                      </CopyToClipboard>
                    </li>
                    <li>
                      <Form.Item
                        label='Imagen URL'
                        onChange={this.handleChangeInput}>
                        <Input name='image'/>
                      </Form.Item>
                      <Button
                        shape='round'
                        onClick={() => {
                          this.handleActiveAccount(item)
                        }}>
                        activar cuenta
                      </Button>
                      <hr></hr>
                    </li>
                  </ul>
                )
              })}
            </ul>
          }
				</Content>
			</>
		)
	}
}
