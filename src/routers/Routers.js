/** @format */

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import PrivateRoute from './components/PrivateRoute/'
import AdminRoute from './components/AdminRoute'

import Test from '../pages/test'
import TestClass from '../pages/test/test-class'

import Home from '../pages/home'
import Profile from '../pages/profile'
import ListAccount from '../pages/profile/pages/list-account'
import ListLinkTree from '../pages/profile/pages/list-linktree'
import ChangePassword from '../pages/profile/pages/change-password'
import AccountUser from '../pages/profile/pages/account-wizzard/step1-account-user'
import AccountBiography from '../pages/profile/pages/account-wizzard/step2-account-biography'
import AccountPlans from '../pages/profile/pages/account-wizzard/step3-account-plans'
import AccountLinks from '../pages/profile/pages/account-wizzard/step4-account-links'
import AccountActivation from '../pages/profile/pages/account-wizzard/step5-account-activation'
import AccountFinish from '../pages/profile/pages/account-wizzard/step6-account-finish'
import LinkTreeName from '../pages/profile/pages/linktree-wizzard/step1-linktree-name'
import LinkTreeInfo from '../pages/profile/pages/linktree-wizzard/step2-linktree-info'
import LinkTreeUrl from '../pages/profile/pages/linktree-wizzard/step3-linktree-urls'
import LinkTreeColor from '../pages/profile/pages/linktree-wizzard/step4-linktree-color'
import LinkTreeFinish from '../pages/profile/pages/linktree-wizzard/step5-linktree-finish'
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
import Search from '../pages/search'
import Help from '../pages/help'
import InactiveAccounts from '../pages/admin/inactive-accounts'
import Notifications from '../pages/notifications'
import Pricing from '../pages//lading-page/pricing'
import Modeles from '../pages/lading-page/models'
import Company from '../pages/lading-page/company'

const Routers = (props) => (
	<BrowserRouter forceRefresh={true}>
		<Layout>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/test' component={Test} />
				<Route exact path='/test-class' component={TestClass} />
				<Route exact path='/auth/login' component={Login} />
				<Route exact path='/auth/register' component={Register} />
				<Route exact path='/auth/recovery' component={Recovery} />
				<Route exact path='/category/:name' component={Category} />
				<Route exact path='/country/:name' component={Country} />
				<Route exact path='/results/:name' component={Results} />
				<Route exact path='/search/:any' component={Search} />
				<Route exact path='/help/:name/:account?' component={Help} />
				<Route exact path='/notifications' component={Notifications} />
				<Route exact path='/pricing/:account?' component={Pricing} />
				<Route exact path='/models' component={Modeles} />
				<Route exact path='/company' component={Company} />

				<PrivateRoute exact path='/profile' component={Profile} />
				<PrivateRoute exact path='/profile/accounts' component={ListAccount} />
				<PrivateRoute exact path='/profile/linktree' component={ListLinkTree} />
				<PrivateRoute exact path='/profile/change-password' component={ChangePassword} />
				<PrivateRoute exact path='/profile/account-user' component={AccountUser} />
				<PrivateRoute exact path='/profile/account-biography/:name/:modify?' component={AccountBiography} />
				<PrivateRoute exact path='/profile/account-plans/:name/:modify?' component={AccountPlans} />
				<PrivateRoute exact path='/profile/account-links/:name/:modify?' component={AccountLinks} />
				<PrivateRoute exact path='/profile/account-activation/:name/:modify?' component={AccountActivation} />
				<PrivateRoute exact path='/profile/account-finish/:name/' component={AccountFinish} />
				<PrivateRoute exact path='/profile/linktree-name/' component={LinkTreeName} />
				<PrivateRoute exact path='/profile/linktree-info/:name/:modify?' component={LinkTreeInfo} />
				<PrivateRoute exact path='/profile/linktree-urls/:name/:modify?' component={LinkTreeUrl} />
				<PrivateRoute exact path='/profile/linktree-color/:name/:modify?' component={LinkTreeColor} />
				<PrivateRoute exact path='/profile/linktree-finish/:name/' component={LinkTreeFinish} />
				<PrivateRoute exact path='/profile/post-create' component={Post} />
				<PrivateRoute exact path='/profile/post-view/:id' component={PostView} />

				<AdminRoute exact path='/admin/inactive-accounts' component={InactiveAccounts} />

				<Route exact path='/token/:email' component={userAccounts} />
				<Route exact path='/:name' component={AccountDetail} staticContext={false} />
				<Route component={NotFound} />
			</Switch>
		</Layout>
	</BrowserRouter>
)

export default Routers
