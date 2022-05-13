import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './components/Header';
import { getUser, updateUser } from './services/userAPI';
import Carregando from './pages/Carregando';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      loanding: false,
      disabled: true,
      redirect: false,
    };
  }

  componentDidMount() {
    this.usuario();
  }

  onInput = ({ target }) => {
    const { name, value } = target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
    this.validandoButton();
  }

  onButton = () => {
    const { user } = this.state;
    this.setState({
      loanding: true,
    }, async () => {
      await updateUser(user);
      this.setState({ redirect: true });
    });
  }

  usuario = () => {
    this.setState({ loanding: true }, async () => {
      this.setState({ user: await getUser(), loanding: false }, () => {
        this.validandoButton();
      });
    });
  }

  validandoButton = () => {
    const { user } = this.state;
    const { name, email, description, image } = user;
    const validateEmail = (props) => {
      const verify = /\S+@\S+\.\S+/;
      return verify.test(props);
    };
    if (
      name !== ''
      && email !== ''
      && validateEmail(email)
      && description !== ''
      && image !== ''
    ) this.setState({ disabled: false });
    else this.setState({ disabled: true });
  }

  render() {
    const { loanding, user, disabled, redirect } = this.state;
    const { name, email, description, image } = user;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loanding ? <Carregando />
          : (
            <div>
              <div>
                <label htmlFor="name">
                  Nome:
                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={ name }
                    onChange={ this.onInput }
                    data-testid="edit-input-name"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="email">
                  Email:
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={ email }
                    onChange={ this.onInput }
                    data-testid="edit-input-email"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="description">
                  Descrição:
                  <input
                    id="description"
                    name="description"
                    type="text"
                    defaultValue={ description }
                    onChange={ this.onInput }
                    data-testid="edit-input-description"
                  />
                </label>
              </div>
              <div>
                <label htmlFor="image">
                  Mudar Foto:
                  <input
                    id="image"
                    name="image"
                    type="text"
                    defaultValue={ image }
                    onChange={ this.onInput }
                    data-testid="edit-input-image"
                  />
                </label>
              </div>
              <div>
                <button
                  type="button"
                  disabled={ disabled }
                  data-testid="edit-button-save"
                  onClick={ this.onButton }
                >
                  Salvar
                </button>
              </div>
            </div>
          )}
        {redirect === true && <Redirect exact to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
