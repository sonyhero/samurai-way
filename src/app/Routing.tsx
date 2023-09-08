import { Redirect, Route, Switch } from 'react-router-dom'
import { withSuspense } from '../hoc/withSuspense'
import { News } from '../components/Pages/News/News'
import { Music } from '../components/Pages/Music/Music'
import { Settings } from '../components/Pages/Settings/Settings'
import React from 'react'
import { LoginPage } from '../components/Pages/Login/LoginPage'
import ProfileContainer from '../components/Pages/Profile/ProfileContainer'

// const ProfileContainer = React.lazy(() => import('../components/Pages/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('../components/Pages/Chat/ChatPage'))
const UsersPage = React.lazy(() => import('../components/Pages/Users/Users'))
const DialogsPage = React.lazy(() => import('../components/Pages/Dialogs/DialogsPage'))

export const Routing = () => {
  return (
    <Switch>
      <Route path="/dialogs" render={withSuspense(DialogsPage)} />
      <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
      <Route path="/users" render={withSuspense(UsersPage)} />
      <Route path="/chat" render={withSuspense(ChatPage)} />
      <Route exact path="/" render={() => <Redirect to={'/profile'} />} />

      <Route path="/login" render={() => <LoginPage />} />
      <Route path="/news" render={() => <News />} />
      <Route path="/music" render={() => <Music />} />
      <Route path="/settings" render={() => <Settings />} />
      <Route path="*" render={() => <h1>404: PAGE NOT FOUND</h1>} />
    </Switch>
  )
}
