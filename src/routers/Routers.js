/** @format */

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import PrivateRoute from './components/PrivateRoute/'
import AdminRoute from './components/AdminRoute'

import Test from '../pages/test'

import Home from '../pages/home'
import Profile from '../pages/profile'
import Activation from '../pages/profile/pages/activation'
import CreateAccount from '../pages/profile/pages/create-account'
import EditAccount from '../pages/profile/pages/edit-account'
import Category from '../pages/category'
import Account from '../pages/account'
import userAccounts from '../pages/user-accounts/'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Recovery from '../pages/auth/recovery'
import NotFound from '../pages/not-found'
import Results from '../pages/results'
import InactiveAccounts from '../pages/admin/inactive-accounts'

const Routers = () => (
	<BrowserRouter forceRefresh={true}>
		<Layout>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/test' component={Test} />
				<Route exact path='/auth/login' component={Login} />
				<Route exact path='/category/:name' component={Category} />
				<Route exact path='/results/:name' component={Results} />

				<PrivateRoute exact path='/auth/register' component={Register} />
				<PrivateRoute exact path='/auth/recovery' component={Recovery} />
				<PrivateRoute exact path='/profile' component={Profile} />
				<PrivateRoute exact path='/profile/create-account' component={CreateAccount} />
				<PrivateRoute exact path='/profile/activation/:name' component={Activation} />
				<PrivateRoute exact path='/profile/edit-account/:name' component={EditAccount} />

				<AdminRoute exact path='/admin/inactive-accounts' component={InactiveAccounts} />
				
				<Route exact path='/token/:email' component={userAccounts} />
				<Route exact path='/:name' component={Account} />

				<Route component={NotFound} />
			</Switch>
		</Layout>
	</BrowserRouter>
)

export default Routers
