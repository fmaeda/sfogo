import React, { ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

import { FaSearch } from 'react-icons/fa';

import { InputContainer, Container, Input, ResultsContainer } from './styled';

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

class SearchBox extends React.Component<Props, State> {
  state: State = {
    value: '',
    results: [],
    resultsVisible: false,
  };

  handleSearch = (): void => {
    const { value } = this.state;

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

  handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      value: evt.target.value,
    });
  };

  handleResultSelect = (result: Result) => (): void => {
    const { onSelect } = this.props;
    onSelect(result);
    this.setState({ resultsVisible: false });
  };

  render(): JSX.Element {
    const { value, results, resultsVisible } = this.state;
    return (
      <Container>
        <InputContainer>
          <Input
            onChange={this.handleChange}
            value={value}
            onFocus={() => this.setState({ resultsVisible: true })}
          />
          <FaSearch onClick={this.handleSearch} />
        </InputContainer>
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

export default SearchBox;
