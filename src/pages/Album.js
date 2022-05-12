import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicas: [],
      artist: '',
      album: '',
      pegaFavoritas: [],
      loanding: false,
    };
  }

  async componentDidMount() {
    const { location: { pathname } } = this.props;
    const id = pathname.split('/')[2];
    const mussicaApi = await getMusics(id);
    const listId = mussicaApi.filter((musica, i) => i !== 0);
    this.setState(() => ({
      loanding: true,
      musicas: listId,
      artist: listId[0].artistName,
      album: listId[0].collectionName,
    }), async () => {
      const pegaFavoritas = await getFavoriteSongs();
      this.setState({
        pegaFavoritas,
        loanding: false,
      });
    });
  }

  render() {
    const { musicas, artist, album, pegaFavoritas, loanding } = this.state;
    console.log(pegaFavoritas);
    return loanding ? <Carregando /> : (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">
          { `Artist Name ${artist}` }
        </p>
        <p data-testid="album-name">
          {`Collection Name ${album}`}
        </p>
        {
          musicas.map((musica) => (
            <MusicCard
              key={ musica.trackName }
              trackName={ musica.trackName }
              previewUrl={ musica.previewUrl }
              trackId={ musica.trackId }
              checked={ pegaFavoritas.some((favorita) => (
                favorita.trackName === musica.trackName
              )) }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Album;
