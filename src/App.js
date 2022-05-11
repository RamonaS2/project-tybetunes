import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Search from './pages/Search';
import Profile from './pages/Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Login />
        <Search />
        <Album />
        <Favorites />
        <Profile />
        <ProfileEdit />
        <NotFound />
      </BrowserRouter>
    );
  }
}

export default App;
