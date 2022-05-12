import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      pesquisar: '',
      loanding: false,
      artistList: [],
    };

    this.valueInput = this.valueInput.bind(this);
  }

  reqApi = () => {
    this.setState(() => ({
      loanding: true,
    }), async () => {
      const { pesquisar } = this.state;
      const requisicao = await searchAlbumsAPI(pesquisar);
      this.setState({
        artistList: requisicao,
        nomeArtist: pesquisar,
        pesquisar: '',
        loanding: false,
      });
    });
  }

  valueInput({ target }) {
    console.log(target.value);
    const { value } = target;

    this.setState({
      pesquisar: value,
    });
  }

  render() {
    const caractere = 2;
    const { pesquisar, loanding, artistList, nomeArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />

        {
          loanding
            ? <Carregando />
            : (
              <label htmlFor="pesquisar">
                Pesquisar:
                <input
                  id="pesquisar"
                  name="pesquisar"
                  value={ pesquisar }
                  data-testid="search-artist-input"
                  onChange={ this.valueInput }
                />
                <button
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ pesquisar.length < caractere }
                  onClick={ this.reqApi }
                >
                  Pesquisar
                </button>
              </label>
            )
        }
        {
          artistList.length > 0
            ? (
              <div>
                <p>
                  {`Resultado de álbuns de: ${nomeArtist}`}
                </p>
                {
                  artistList.map((musicas) => (
                    <div key={ musicas.collectionId }>
                      <p>{musicas.artistName}</p>
                      <p>{musicas.collectionName}</p>
                      <img src={ musicas.artworkUrl100 } alt={ musicas.artistName } />
                      <Link
                        data-testid={ `link-to-album-${musicas.collectionId}` }
                        to={ `/album/${musicas.collectionId}` }
                      >
                        Album

                      </Link>
                    </div>
                  ))
                }
              </div>
            ) : <p>Nenhum álbum foi encontrado</p>
        }

      </div>
    );
  }
}

export default Search;
