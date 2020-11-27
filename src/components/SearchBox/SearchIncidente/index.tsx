import React from 'react';
import { connect } from 'react-redux';
import { incidenteActions } from 'store/incidente';

import SearchInput from '../SearchInput';

import { Container, FiltersBar } from './styled';
import mockData from './mockData';
import Filter from './Filter';

type Props = {
  setIncidenteList: typeof incidenteActions.setIncidenteList;
};

type State = {
  value: string;
};

class SearchIncidente extends React.Component<Props, State> {
  state: State = {
    value: '',
  };

  handleChange = (value: string): void => {
    this.setState({ value });
  };

  handleSearch = (): void => {
    const { setIncidenteList } = this.props;
    setIncidenteList(mockData);
  };

  render(): JSX.Element {
    const { value } = this.state;

    return (
      <Container>
        <SearchInput
          value={value}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
          placeholder="Buscar incidente..."
        />
        <FiltersBar>
          <Filter label="UF" />
          <Filter label="Município" />
          <Filter label="Operação" />
          <Filter label="Nível Acionamento" />
        </FiltersBar>
      </Container>
    );
  }
}

export default connect(null, {
  setIncidenteList: incidenteActions.setIncidenteList,
})(SearchIncidente);
