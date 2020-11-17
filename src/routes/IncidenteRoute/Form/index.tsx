import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container, Content, ButtonBar } from './styled';
import { NivelAcionamento } from 'model/nivelAcionamento';
import NivelAcionamentoPicker from './NivelAcionamentoPicker';
import Button from 'components/Button';
import NomeOperacao from './NomeOperacao';

enum Page {
  NIVEL_ACIONAMENTO = 'NIVEL_ACIONAMENTO',
  ORGAO = 'ORGAO',
  NOME_OPERACAO = 'NOME_OPERACAO',
  TIPO_DETECCAO = 'TIPO_DETECCAO',
}

type Props = {};
type State = {
  nivelAcionamento?: NivelAcionamento;
  nomeOperacao?: string;
  pages: Page[];
};

class Form extends React.Component<Props, State> {
  state: State = {
    pages: [Page.NIVEL_ACIONAMENTO],
  };
  sliderRef = React.createRef<Slider>();
  transitionTimerID?: number;

  addNextPage = (nextPage: Page): void => {
    this.setState(
      ({ pages, ...state }) => ({
        ...state,
        pages: pages.includes(nextPage) ? pages : [...pages, nextPage],
      }),
      this.transitionNext,
    );
  };

  handleNivelAcionamento = (nivelAcionamento: NivelAcionamento): void => {
    this.setState({ nivelAcionamento });
    this.addNextPage(Page.NOME_OPERACAO);
  };

  handleNomeOperacaoChange = (nomeOperacao?: string): void => {
    this.setState({ nomeOperacao });
    if (nomeOperacao === undefined) {
      this.addNextPage(Page.ORGAO);
    }
  };

  handlePreviousClick = (): void => {
    if (this.transitionTimerID) {
      window.clearTimeout(this.transitionTimerID);
    }
    this.sliderRef.current?.slickPrev();
  };

  handleNextClick = (): void => {
    if (this.transitionTimerID) {
      window.clearTimeout(this.transitionTimerID);
    }
    this.sliderRef.current?.slickNext();
  };

  transitionNext = (): void => {
    this.transitionTimerID = window.setTimeout(() => {
      this.handleNextClick();
    }, 300);
  };

  renderCard = (page: Page): JSX.Element | null => {
    const { nivelAcionamento, nomeOperacao } = this.state;
    switch (page) {
      case Page.NIVEL_ACIONAMENTO: {
        return (
          <NivelAcionamentoPicker
            key="nivelAcionamentoCard"
            onSelect={this.handleNivelAcionamento}
            selected={nivelAcionamento}
          />
        );
      }
      case Page.NOME_OPERACAO: {
        return (
          <NomeOperacao
            key="nomeOperacaoCard"
            onChange={this.handleNomeOperacaoChange}
            value={nomeOperacao}
          />
        );
      }
      case Page.ORGAO: {
        return <p key="orgaoCard">Qual o órgao?</p>;
      }
      // case Page.TIPO_DETECCAO: {
      //   return (

      //   )
      // }
      default:
        return null;
    }
  };

  render(): JSX.Element {
    const { pages } = this.state;

    return (
      <Container>
        <Content>
          <Slider
            ref={this.sliderRef}
            dots
            infinite={false}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            // adaptiveHeight
          >
            {pages.map(this.renderCard)}
          </Slider>
          <ButtonBar>
            <Button label="Anterior" onClick={this.handlePreviousClick} />
            <Button label="Próximo" onClick={this.handleNextClick} />
          </ButtonBar>
        </Content>
      </Container>
    );
  }
}

export default Form;
