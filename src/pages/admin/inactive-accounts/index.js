/** @format */

import React from 'react'
import { Layout, Button, Form, Row, Input } from 'antd'
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
  
  activeAccount = async(item) => {
    item.image = this.state.image
    console.log(item);
    serviceActiveAccount(item).then((response) => {
      console.log(response);
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
                  
                  <div key={i}>
                    <p> id: {item.id}</p>
                    <p> name: {item.name}</p>
                    <p> email: {item.email}</p>
                    <p> verificar: <a href={`https://${item.type}.com/${item.account}`} target="__blank">{item.account}</a></p>
                    <Form
                      onFinish={this.handleSubmitLogin}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      layout="vertical">
                      <Row>
                        <Form.Item
                          label='Imagen URL'
                          onChange={this.handleChangeInput}>
                          <Input name='image'/>
                        </Form.Item>
                        <Button
                          shape='round'
                          onClick={() => {
                            this.activeAccount(item)
                          }}>
                          activar cuenta
                        </Button>
                        
                        <hr></hr>
                      </Row>
                    </Form>
                  </div>
                )
              })}
            </ul>
          }
				</Content>
			</>
		)
	}
}
