import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loanding: false,
    };

    this.valueInput = this.valueInput.bind(this);
  }

  valueInput({ target }) {
    console.log(target.value);
    const { value } = target;

    this.setState({
      user: value,
    });
  }

  render() {
    const { user, loanding } = this.state;
    const caracteres = 3;
    return (
      <div data-testid="page-login">
        <h3>Login</h3>
        {
          loanding
            ? <Carregando />
            : (
              <form>
                <label htmlFor="nome">
                  Usuário:
                  <input
                    id="nome"
                    type="text"
                    name="user"
                    value={ user }
                    data-testid="login-name-input"
                    onChange={ this.valueInput }
                  />
                </label>
                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ user.length < caracteres }
                  onClick={ async () => {
                    this.setState({
                      loanding: true,
                    });

                    await createUser({ name: user });
                    const { history } = this.props;
                    history.push('/search');
                  } }
                >
                  Entrar
                </button>
              </form>
            )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
