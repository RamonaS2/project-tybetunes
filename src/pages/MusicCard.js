import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
// import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loanding: false,
      checked: false,
    };
  }

  componentDidMount() {
    const { checked } = this.props;
    this.setState({
      checked,
    });
  }

  inputChecked = (e, checked) => {
    const { target } = e;
    this.setState({
      checked: target.checked,
      loanding: true,
    }, async () => {
      const { previewUrl, trackName, trackId } = this.props;
      if (!checked) {
        await addSong({ previewUrl, trackName, trackId });
        await getFavoriteSongs();
        this.setState({
          loanding: false,
        });
      }
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loanding, checked } = this.state;
    return loanding ? <Carregando /> : (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favoritas">
          Favorita
          <input
            id="favoritas"
            name="favoritas"
            type="checkbox"
            checked={ checked }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ (e) => {
              this.inputChecked(e, checked);
            } }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
