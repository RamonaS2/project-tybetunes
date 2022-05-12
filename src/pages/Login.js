import React from 'react';
// import { createUser } from './services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };

    this.valueInput = this.valueInput.bind(this);
  }

  valueInput({ target }) {
    const { value } = target;

    this.setState = ({
      user: value,
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div data-testid="page-login">
        <h3>Login</h3>
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
            // onClick={ this. }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
