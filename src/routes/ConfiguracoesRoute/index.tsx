import React from 'react';

import { Container } from './styled';
import AppBar from 'components/AppBar';

type Props = {};

class ConfiguracoesRoute extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Container>
        <AppBar title="Configurações" />
        <ul>
          <li>Notificações</li>
          <ul>
            <li>
              <input type="checkbox" />
              Novos Incidentes
            </li>
            <li>
              <input type="checkbox" />
              Incendio Controlado
            </li>
          </ul>
          <li>Cache</li>
          <ul>Tamanho para Mapas: 10Mb</ul>
          <ul>
            <button>Limpar</button>
          </ul>
        </ul>
      </Container>
    );
  }
}

export default ConfiguracoesRoute;
