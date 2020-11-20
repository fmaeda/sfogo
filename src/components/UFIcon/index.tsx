import React from 'react';

import { Svg } from './styled';
import { UF, ufLabels } from 'model/uf';

const getImage = (uf: UF) => require(`resources/svg/bandeiras/${uf}.svg`);

type Props = {
  uf: UF;
  type?: 'square' | 'circle';
};

export default ({ uf, type = 'circle', ...rest }: Props): JSX.Element => {
  const img = getImage(uf);
  return <Svg {...rest} src={img} alt={ufLabels[uf]} type={type} />;
};
