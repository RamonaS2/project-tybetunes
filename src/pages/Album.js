import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musicas: [],
      artist: '',
      album: '',
    };
  }

  async componentDidMount() {
    const { location: { pathname } } = this.props;
    const id = pathname.split('/')[2];
    const mussicaApi = await getMusics(id);
    const listId = mussicaApi.filter((musica, i) => i !== 0);
    this.setState({
      musicas: listId,
      artist: listId[0].artistName,
      album: listId[0].collectionName,
    });
  }

  render() {
    const { musicas, artist, album } = this.state;
    return (
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
