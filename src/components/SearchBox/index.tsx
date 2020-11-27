import React from 'react';
import { MdSearch } from 'react-icons/md';

import SearchModeSelector, { SearchMode } from './SearchModeSelector';
import SearchLocalidade from './SearchLocalidade';

import { Container, Content } from './styled';
import { LocalidadeResult } from 'model/localidade';
import SearchIncidente from './SearchIncidente';

type Props = {
  onLocalidadeSelect: (result: LocalidadeResult) => void;
  onExpandClick: () => void;
  collapsed?: boolean;
};

type State = {
  mode?: SearchMode;
};

class SearchBox extends React.Component<Props, State> {
  state: State = {};

  handleModeSelect = (mode: SearchMode): void => {
    this.setState({ mode });
  };

  handleExpandClick = (): void => {
    const { onExpandClick } = this.props;

    this.setState({ mode: undefined }, onExpandClick);
  };

  render(): JSX.Element {
    const { mode } = this.state;
    const { onLocalidadeSelect, collapsed } = this.props;

    return !!collapsed ? (
      <MdSearch
        style={{ paddingRight: 12 }}
        size={24}
        color="white"
        onClick={this.handleExpandClick}
      />
    ) : (
      <Container>
        {mode === undefined ? (
          <span>Buscar por </span>
        ) : (
          <Content>
            {mode === SearchMode.LOCALIDADE && (
              <SearchLocalidade onSelect={onLocalidadeSelect} />
            )}
            {mode === SearchMode.INCIDENTE && <SearchIncidente />}
          </Content>
        )}
        <SearchModeSelector mode={mode} onSelect={this.handleModeSelect} />
      </Container>
    );
  }
}

export default SearchBox;
