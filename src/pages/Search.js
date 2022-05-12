import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      pesquisar: '',
    };

    this.valueInput = this.valueInput.bind(this);
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
    const { pesquisar } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          // onclick={}
          >
            Pesquisar
          </button>
        </label>
      </div>
    );
  }
}

export default Search;
