import { Redirect, Route, Switch } from 'react-router-dom'
import { withSuspense } from '../hoc/withSuspense'
import { News } from '../components/Pages/News/News'
import { Music } from '../components/Pages/Music/Music'
import { Settings } from '../components/Pages/Settings/Settings'
import React from 'react'
import { UsersPage } from '../components/Pages/Users/UsersPage'
import { LoginPage } from '../components/Pages/Login/LoginPage'
import { DialogsPage } from '../components/Pages/Dialogs/DialogsPage'

const ProfileContainer = React.lazy(() => import('../components/Pages/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('../components/Pages/Chat/ChatPage'))

export const Routing = () => {
  return (
    <Switch>
      <Route path="/dialogs" render={() => <DialogsPage />} />
      <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
      <Route path="/users" render={() => <UsersPage />} />
      <Route exact path="/" render={() => <Redirect to={'/profile'} />} />

      <Route path="/login" render={() => <LoginPage />} />

      <Route path="/news" render={() => <News />} />
      <Route path="/music" render={() => <Music />} />
      <Route path="/settings" render={() => <Settings />} />
      <Route path="/chat" render={withSuspense(ChatPage)} />

      <Route path="*" render={() => <h1>404: PAGE NOT FOUND</h1>} />
    </Switch>
  )
}
