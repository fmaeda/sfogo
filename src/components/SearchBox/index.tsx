import React, { ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import qs from 'qs';

import { FaSearch, FaLocationArrow } from 'react-icons/fa';

import { InputContainer, Container, Input, ResultsContainer } from './styled';
import SearchModeSelector, { SearchMode } from './SearchModeSelector';
import { RootState } from 'store';
import { incidenteActions } from 'store/incidente';

import mockData from './mockData';

const placeHolders: { [key in SearchMode]: string } = {
  [SearchMode.INCIDENTE]: 'Buscar incidente...',
  [SearchMode.LOCALIDADE]: 'Buscar localidade...',
};

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
  setIncidenteList: typeof incidenteActions.setIncidenteList;
};

type State = {
  value: string;
  resultsVisible: boolean;
  results: Result[];
  mode: SearchMode;
};

class SearchBox extends React.Component<Props, State> {
  state: State = {
    value: '',
    results: [],
    resultsVisible: false,
    mode: SearchMode.LOCALIDADE,
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

  handleSearch = (): void => {
    const { value, mode } = this.state;
    const { setIncidenteList } = this.props;

    switch (mode) {
      case SearchMode.INCIDENTE: {
        setIncidenteList(mockData);
        break;
      }
      case SearchMode.LOCALIDADE: {
        this.searchLocalidade(value);
        setIncidenteList([]);
        break;
      }
    }
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

  handleModeSelect = (mode: SearchMode): void => {
    this.setState({ mode });
  };

  render(): JSX.Element {
    const { value, results, resultsVisible, mode } = this.state;
    return (
      <Container>
        <InputContainer>
          <SearchModeSelector mode={mode} onSelect={this.handleModeSelect} />
          <Input
            placeholder={placeHolders[mode]}
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

export default connect(null, {
  setIncidenteList: incidenteActions.setIncidenteList,
})(SearchBox);
