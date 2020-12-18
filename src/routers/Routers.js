/** @format */

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import PrivateRoute from '../components/Routers/'

import Test from '../pages/test'

import Home from '../pages/home'
import Profile from '../pages/profile'
import CreateAccount from '../pages/profile/create-account'
import Category from '../pages/category'
import Account from '../pages/account'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Recovery from '../pages/auth/recovery'
import NotFound from '../pages/notfound'

const Routers = () => (
	<BrowserRouter>
		<Layout>
			<Switch>
				<Route exact path='/auth/login' component={Login} />
				<Route exact path='/' component={Home} />
				<Route exact path='/test' component={Test} />
				<Route exact path='/category/:name' component={Category} />
				<Route exact path='/account/:name' component={Account} />
				
				<PrivateRoute exact path='/auth/register' component={Register} />
				<PrivateRoute exact path='/auth/recovery' component={Recovery} />
				<PrivateRoute exact path='/profile' component={Profile}/>
				<PrivateRoute exact path='/profile' component={Profile} />
				<PrivateRoute exact path='/profile/create-account' component={CreateAccount} />
				<Route component={NotFound} />
				
			</Switch>
		</Layout>
	</BrowserRouter>
)

export default Routers
