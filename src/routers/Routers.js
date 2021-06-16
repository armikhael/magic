/** @format */

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import PrivateRoute from './components/PrivateRoute/'
import AdminRoute from './components/AdminRoute'

import Test from '../pages/test'

import Home from '../pages/home'
import Profile from '../pages/profile'
import AccountUser from '../pages/profile/pages/account-wizzard/account-user'
import AccountBiography from '../pages/profile/pages/account-wizzard/account-biography'
import AccountPlans from '../pages/profile/pages/account-wizzard/account-plans'
import AccountDetails from '../pages/profile/pages/account-wizzard/account-details'
import AccountActivation from '../pages/profile/pages/account-wizzard/account-activation'
import LinkTreeName from '../pages/profile/pages/linktree-wizzard/linktree-name'
import LinkTreeInfo from '../pages/profile/pages/linktree-wizzard/linktree-info'
import LinkTreeUrl from '../pages/profile/pages/linktree-wizzard/linktree-urls'
import Post from '../pages/profile/pages/post-wizzard/post-create'
import PostView from '../pages/profile/pages/post-wizzard/post-view'
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
				<PrivateRoute exact path='/profile/account-user' component={AccountUser} />
				<PrivateRoute exact path='/profile/account-biography/:name/:modify?' component={AccountBiography} />
				<PrivateRoute exact path='/profile/account-plans/:name/:modify?' component={AccountPlans} />
				<PrivateRoute exact path='/profile/account-details/:name/:modify?' component={AccountDetails} />
				<PrivateRoute exact path='/profile/account-activation/:name/:modify?' component={AccountActivation} />
				<PrivateRoute exact path='/profile/linktree-name/' component={LinkTreeName} />
				<PrivateRoute exact path='/profile/linktree-info/:name/:modify?' component={LinkTreeInfo} />
				<PrivateRoute exact path='/profile/linktree-urls/:name/:modify?' component={LinkTreeUrl} />
				<PrivateRoute exact path='/profile/post-create' component={Post} />
				<PrivateRoute exact path='/profile/post-view/:id' component={PostView} />

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
