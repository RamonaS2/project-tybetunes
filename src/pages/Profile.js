import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loanding: false,
      description: '',
      name: '',
      email: '',
      image: '',
    };
  }

  componentDidMount() {
    this.usuario();
  }

  usuario = () => {
    this.setState({
      loanding: true,
    }, async () => {
      const user = await getUser();
      // console.log(user);
      const { name, description, email, image } = user;
      this.setState({
        name,
        description,
        email,
        image,
        loanding: false,
      });
    });
  }

  render() {
    const { name, description, email, image, loanding } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loanding ? <Carregando /> : (
          <div>
            <h3>Foto:</h3>
            <img
              src={ image }
              alt={ name }
              data-testid="profile-image"
            />
            <h3>Nome:</h3>
            <p>{name}</p>
            <h3>Email:</h3>
            <p>{email}</p>
            <h3>Descrição</h3>
            <p>{description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
