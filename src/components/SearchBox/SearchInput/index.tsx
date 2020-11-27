import React from 'react';

import { FaSearch, FaLocationArrow } from 'react-icons/fa';

import { Input, Container } from './styled';

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

class SearchInput extends React.Component<Props> {
  handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { onChange } = this.props;
    onChange(evt.target.value);
  };

  render(): JSX.Element {
    const { placeholder, onSearch, value } = this.props;

    return (
      <Container>
        <Input
          placeholder={placeholder}
          onChange={this.handleChange}
          value={value}
          onFocus={() => this.setState({ resultsVisible: true })}
        />
        <FaSearch onClick={onSearch} />
      </Container>
    );
  }
}

export default SearchInput;
