import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
// import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loanding: false,
      favoritas: [],
    };
  }

  componentDidMount() {
    this.favorite();
  }

  favorite = () => {
    this.setState({
      loanding: true,
    }, async () => {
      const list = await getFavoriteSongs();
      this.setState({
        loanding: false,
        favoritas: list,
      });
    });
  }

  render() {
    const { loanding, favoritas } = this.state;
    return loanding ? <Carregando />
      : (
        <div data-testid="page-favorites">
          <Header />
          <p>{`${favoritas}`}</p>
          {/* {
            favoritas.map((musica, i) => (
              <MusicCard
                key={ i }
                trackName={ musica.trackName }
                previewUrl={ musica.previewUrl }
                trackId={ musica.trackId }
                onChange={ () => ({
                  this.setState({
                    loanding: true,
                  }, async () => ({
                    const list = await getFavoriteSongs();
                    this.setState({
                      loanding: false,
                      favoritas: list,
                    })
                  }))
                }) }
                checked={ favorites.some((e) => e.trackId === musica.trackId) }
              />
            ))
          } */}
        </div>
      );
  }
}

export default Favorites;
