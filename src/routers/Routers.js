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
import AccountBiography from '../pages/profile/pages/account-biography'
import AccountPlans from '../pages/profile/pages/account-plans'
import AccountDetails from '../pages/profile/pages/account-details'
import CreateLink from '../pages/profile/pages/create-link'
import Category from '../pages/category'
import Country from '../pages/country'
import AccountDetail from '../pages/account'
import userAccounts from '../pages/user-accounts/'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Recovery from '../pages/auth/recovery'
import NotFound from '../pages/not-found'
import Results from '../pages/results'
import Help from '../pages/help'
import InactiveAccounts from '../pages/admin/inactive-accounts'
import UploadImgAccounts from '../pages/admin/upload-img-accounts'

const Routers = () => (
	<BrowserRouter forceRefresh={true}>
		<Layout>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/test' component={Test} />
				<Route exact path='/auth/login' component={Login} />
				<Route exact path='/auth/register' component={Register} />
				<Route exact path='/auth/recovery' component={Recovery} />
				<Route exact path='/category/:name' component={Category} />
				<Route exact path='/country/:name' component={Country} />
				<Route exact path='/results/:name' component={Results} />
				<Route exact path='/help/:name' component={Help} />

				<PrivateRoute exact path='/profile' component={Profile} />
				<PrivateRoute exact path='/profile/account-biography' component={AccountBiography} />
				<PrivateRoute exact path='/profile/account-biography/:name' component={AccountBiography} />
				<PrivateRoute exact path='/profile/account-plans/:name' component={AccountPlans} />
				<PrivateRoute exact path='/profile/account-details/:name' component={AccountDetails} />
				<PrivateRoute exact path='/profile/activation/:type' component={Activation} />
				<PrivateRoute exact path='/profile/create-link/' component={CreateLink} />
				<PrivateRoute exact path='/profile/edit-link/:name' component={CreateLink} />

				<AdminRoute exact path='/admin/inactive-accounts' component={InactiveAccounts} />
				<AdminRoute exact path='/admin/upload-img-accounts' component={UploadImgAccounts} />

				<Route exact path='/token/:email' component={userAccounts} />
				<Route exact path='/:name' component={AccountDetail} />

				<Route component={NotFound} />
			</Switch>
		</Layout>
	</BrowserRouter>
)

export default Routers
