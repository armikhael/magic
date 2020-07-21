/** @format */

import React from 'react'

import './style.css'

class Account extends React.Component {

	render() {
        console.log(this.props.items);
        
		if (this.props.items.length >= 0) {
			return (
				<ul>
					{
						this.props.items.map(function(item, i){
						    return <li key={i}>{item.email}</li>
						})
					}
				</ul>
			)
		} else {
            return 'Cargando...'
        }
	}
}

export default Account
