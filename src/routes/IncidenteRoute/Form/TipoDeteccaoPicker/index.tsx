import React from 'react';
import DrawerCard from 'components/BottomDrawer/DrawerCard';

type Props = {};

class TipoDeteccaoPicker extends React.Component<Props> {
  render(): JSX.Element {
    return <DrawerCard title="Qual foi a forma de detecção?"></DrawerCard>;
  }
}

export default TipoDeteccaoPicker;
