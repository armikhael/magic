/** @format */

import React from 'react'

import './style.css'

class Account extends React.Component {

	render() {
        console.log(this.props.items);
        
		if (this.props.items.length >= 0) {
			return (
				<div>
					{
						this.props.items.map(function(item, i){
						    return <li key={i}>{item.email}</li>
						})
					}
				</div>
			)
		} else {
            return 'Cargando...'
        }
	}
}

export default Account
