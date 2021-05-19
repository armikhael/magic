/** @format */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import generateStore from './redux/store'
import * as serviceWorker from './serviceWorker'
import 'antd/dist/antd.css'

import './app.css'
import Routers from './routers/Routers'
const store = generateStore()

ReactDOM.render(
	<Provider store={store}>
		<Routers />
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
