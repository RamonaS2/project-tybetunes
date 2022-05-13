import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loanding: false,
      fav: [],
    };
  }

  componentDidMount() {
    this.favorite();
  }

  favorite = async () => {
    this.setState({
      loanding: true,
    });
    const result = await getFavoriteSongs();
    this.setState({
      fav: result,
      loanding: false,
    });
  }

  render() {
    const { loanding, fav } = this.state;
    return loanding ? <Carregando />
      : (
        <div data-testid="page-favorites">
          <Header />
          {
            fav.map((musica, i) => (
              <MusicCard
                key={ i }
                trackName={ musica.trackName }
                trackId={ musica.trackId }
                previewUrl={ musica.previewUrl }
                song={ musica }
                update={ this.favorite }
                checked={ fav.some((e) => e.trackId === musica.trackId) }

              />
            ))
          }
        </div>
      );
  }
}

export default Favorites;
