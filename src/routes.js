//TODO Create routes
import { Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'
import Landing from './Components/Landing'
import Dashboard from './Components/Dashboard'
import Register from './Components/Register'
import Profile from './Components/Profile'

export default (
  <Switch>
    <Route exact path='/' component={Landing} />
    <Route path='/register' component={Register} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/profile' component={Profile} />
    <Route render={() => <Redirect to='/' />} />
  </Switch>
)