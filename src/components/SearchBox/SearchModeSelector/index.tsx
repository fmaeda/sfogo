import Ripple from 'components/Ripple';
import React from 'react';

import {
  FaFireExtinguisher,
  FaLocationArrow,
  FaCaretDown,
} from 'react-icons/fa';

import { IoMdLocate } from 'react-icons/io';

import {
  Container,
  ArrowContainer,
  SelectionContainer,
  OptionsContainer,
  Option,
} from './styled';

export enum SearchMode {
  LOCALIDADE = 'LOCALIDADE',
  INCIDENTE = 'INCIDENTE',
}

type Props = {
  mode?: SearchMode;
  onSelect: (mode: SearchMode) => void;
};

type State = {
  isMenuVisible: boolean;
};

class SearchModeSelector extends React.Component<Props, State> {
  state = {
    isMenuVisible: true,
  };

  handleSelect = (mode: SearchMode) => (): void => {
    const { onSelect } = this.props;
    onSelect(mode);
    this.setState({ isMenuVisible: false });
  };

  toggleMenu = (): void => {
    this.setState(({ isMenuVisible, ...state }) => ({
      ...state,
      isMenuVisible: !isMenuVisible,
    }));
  };

  render(): JSX.Element {
    const { mode } = this.props;
    const { isMenuVisible } = this.state;

    return (
      <Container>
        <SelectionContainer onClick={this.toggleMenu}>
          {mode === SearchMode.INCIDENTE && <FaFireExtinguisher />}
          {mode === SearchMode.LOCALIDADE && <IoMdLocate />}
          <ArrowContainer>
            <FaCaretDown />
          </ArrowContainer>
          <Ripple color="gray" />
        </SelectionContainer>
        {isMenuVisible && (
          <OptionsContainer>
            <Option onClick={this.handleSelect(SearchMode.LOCALIDADE)}>
              <IoMdLocate />
              <span>Localidade</span>
            </Option>
            <Option onClick={this.handleSelect(SearchMode.INCIDENTE)}>
              <FaFireExtinguisher />
              <span>Incidente</span>
            </Option>
          </OptionsContainer>
        )}
      </Container>
    );
  }
}

export default SearchModeSelector;
