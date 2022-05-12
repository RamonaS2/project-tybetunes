import React from 'react';
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
      </header>
    );
  }
}

export default Header;
