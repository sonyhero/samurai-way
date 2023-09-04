import { Redirect, Route, Switch } from 'react-router-dom'
import { withSuspense } from '../hoc/withSuspense'
import { News } from '../components/Pages/News/News'
import { Music } from '../components/Pages/Music/Music'
import { Settings } from '../components/Pages/Settings/Settings'
import React from 'react'
import { UsersPage } from '../components/Pages/Users/UsersPage'

const DialogsContainer = React.lazy(() => import('../components/Pages/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('../components/Pages/Profile/ProfileContainer'))

const LoginContainer = React.lazy(() => import('../components/Pages/Login/Login'))

export const Routing = () => {
  return (
    <Switch>
      <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
      <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
      <Route path="/users" render={()=><UsersPage/>} />
      <Route exact path="/" render={() => <Redirect to={'/profile'} />} />

      <Route path="/login" render={withSuspense(LoginContainer)} />

      <Route path="/news" render={() => <News />} />
      <Route path="/music" render={() => <Music />} />
      <Route path="/settings" render={() => <Settings />} />

      <Route path="*" render={() => <h1>404: PAGE NOT FOUND</h1>} />
    </Switch>
  )
}
