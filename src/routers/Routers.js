/** @format */

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from '../components/Layout/Layout'

import Home from '../pages/home'
import Profile from '../pages/profile'
import Category from '../pages/category'
import Account from '../pages/account'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Recovery from '../pages/auth/recovery'

const Routers = () => (
	<BrowserRouter>
		<Layout>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/profile' component={Profile} />
				<Route exact path='/category' component={Category} />
				<Route exact path='/account' component={Account} />
				<Route exact path='/auth/login' component={Login} />
				<Route exact path='/auth/register' component={Register} />
				<Route exact path='/auth/recovery' component={Recovery} />
			</Switch>
		</Layout>
	</BrowserRouter>
)

export default Routers
