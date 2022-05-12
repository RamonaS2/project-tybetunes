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
            <Route exact path="/"><Login /></Route>
            <Route path="/Search"><Search /></Route>
            <Route path="/Album"><Album /></Route>
            <Route path="/Favorites"><Favorites /></Route>
            <Route exact path="/Profile"><Profile /></Route>
            <Route path="/Profile/edit"><ProfileEdit /></Route>
            <Route><NotFound /></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
