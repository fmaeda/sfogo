import React from 'react';
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

import { Container, ResultsContainer } from './styled';
import SearchInput from '../SearchInput';

export type Result = {
  display_name: string;
  address: {
    country: string;
    city?: string;
    postcode?: string;
    region?: string;
    state?: string;
  };
  boundingbox: [number, number, number, number];
  lat: number;
  lon: number;
  place_id: number;
};

type Props = {
  onSelect: (result: Result) => void;
};

type State = {
  value: string;
  resultsVisible: boolean;
  results: Result[];
};

class SearchLocalidade extends React.Component<Props, State> {
  state: State = {
    value: '',
    results: [],
    resultsVisible: false,
  };

  searchLocalidade = (value: string): void => {
    const query = qs.stringify({
      q: value,
      polygon_geojson: 0,
      'accept-language': 'pt-BR',
      countrycodes: 'br',
      limit: 5,
      format: 'jsonv2',
      addressdetails: 1,
    });
    axios
      .get(`https://nominatim.openstreetmap.org/search?${query}`)
      .then(({ data: results }: AxiosResponse<Result[]>) => {
        this.setState({ results, resultsVisible: true });
      });
  };

  handleChange = (value: string): void => {
    this.setState({
      value,
    });
  };

  handleSearch = (): void => {
    const { value } = this.state;
    this.searchLocalidade(value);
  };

  handleResultSelect = (result: Result) => (): void => {
    const { onSelect } = this.props;
    onSelect(result);
    this.setState({ resultsVisible: false });
  };

  render(): JSX.Element {
    const { value, resultsVisible, results } = this.state;

    return (
      <Container>
        <SearchInput
          value={value}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
          placeholder="Buscar localidade..."
        />

        {resultsVisible && results.length > 0 && (
          <ResultsContainer>
            {results.map((r) => (
              <span key={r.display_name} onClick={this.handleResultSelect(r)}>
                {r.display_name}
              </span>
            ))}
          </ResultsContainer>
        )}
      </Container>
    );
  }
}

export default SearchLocalidade;
