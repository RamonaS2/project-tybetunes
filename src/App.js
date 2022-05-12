import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
        <div>
          <Switch>
            <Route exact path="/" render={ (props) => <Login { ...props } /> } />
            <Route path="/search"><Search /></Route>
            <Route path="/album"><Album /></Route>
            <Route path="/favorites"><Favorites /></Route>
            <Route exact path="/profile"><Profile /></Route>
            <Route path="/profile/edit"><ProfileEdit /></Route>
            <Route><NotFound /></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
