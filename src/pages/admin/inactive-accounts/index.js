/** @format */

import React from 'react'
import { Layout, Button } from 'antd'
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
    console.log(item);
    serviceActiveAccount(item).then((response) => {
      console.log(response);
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
                    <Button
                      shape='round'
                      onClick={() => {
                        this.activeAccount(item)
                      }}>
                      activar cuenta
                    </Button>
                    
                    <hr></hr>
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
