import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loanding: false,
      user: {},
    };
  }

  async componentDidMount() {
    this.setState({
      loanding: true,
    });
    const valorGetUser = await getUser();
    this.setState({
      loanding: false,
      user: valorGetUser,
    });
  }

  render() {
    const { loanding, user } = this.state;
    return (
      <header data-testid="header-component">
        {
          loanding
            ? <Carregando /> : (
              <div>
                <p data-testid="header-user-name">{user.name}</p>
              </div>
            )
        }
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
