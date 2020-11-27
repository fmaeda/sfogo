import React from 'react';

import { FilterContainer } from './styled';

type Props = {
  label: string;
  onClick?: () => void;
};

class Filter extends React.Component<Props> {
  render(): JSX.Element {
    const { onClick, label } = this.props;

    return <FilterContainer onClick={onClick}>{label}</FilterContainer>;
  }
}

export default Filter;
