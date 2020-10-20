/** @format */

import React, { } from 'react'
import { connect } from 'react-redux'
import { saveUser } from '../../redux'
import { Button } from 'antd'

class Test extends React.Component {


	componentDidMount() {
		console.log();
	}

	testInit = async () => {
		
	}

	render(props) {
		return (
			<div className='App'>
				<p>email: {this.props.email}</p>
				<Button type="primary" onClick={this.props.saveUser('diego.carciente@nuevo.com')}>Cambiar Correo</Button>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		email: state.email
	}
}

const mapDispatchToProps = dispatch => {
	return {
		saveUser: (item) => {
			dispatch(saveUser(item))
		}
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Test)
