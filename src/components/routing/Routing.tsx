import { Redirect, Route, Switch } from 'react-router-dom'
import { withSuspense } from '../../hoc/withSuspense'
import { News } from '../Pages/News/News'
import { Music } from '../Pages/Music/Music'
import { Settings } from '../Pages/Settings/Settings'
import React from 'react'
import ProfileContainer from '../Pages/Profile/ui/ProfilePage'

// const ProfileContainer = React.lazy(() => import('../components/Pages/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('../Pages/Chat/ui/ChatPage'))
const UsersPage = React.lazy(() => import('../Pages/Users/ui/Users'))
const DialogsPage = React.lazy(() => import('../Pages/Dialogs/ui/DialogsPage'))
const LoginPage = React.lazy(() => import('../Pages/Login/ui/LoginPage'))

export const Routing = () => {
  return (
    <Switch>
      <Route path="/dialogs" render={withSuspense(DialogsPage)} />
      <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
      <Route path="/users" render={withSuspense(UsersPage)} />
      <Route path="/chat" render={withSuspense(ChatPage)} />
      <Route exact path="/" render={() => <Redirect to={'/profile'} />} />

      <Route path="/login" render={withSuspense(LoginPage)} />
      <Route path="/news" render={() => <News />} />
      <Route path="/music" render={() => <Music />} />
      <Route path="/settings" render={() => <Settings />} />
      <Route path="*" render={() => <h1>404: PAGE NOT FOUND</h1>} />
    </Switch>
  )
}
