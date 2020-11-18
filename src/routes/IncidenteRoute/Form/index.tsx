import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container, Content, ButtonBar } from './styled';
import { NivelAcionamento } from 'model/nivelAcionamento';
import NivelAcionamentoPicker from './NivelAcionamentoPicker';
import Button from 'components/Button';
import NomeOperacao from './NomeOperacao';
import TipoDeteccaoPicker from './TipoDeteccaoPicker';

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
  hasNomeOperacao?: boolean;
  pages: Page[];
  currentPage: Page;
};

class Form extends React.Component<Props, State> {
  state: State = {
    pages: [Page.NIVEL_ACIONAMENTO],
    currentPage: Page.NIVEL_ACIONAMENTO,
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

  handleNomeOperacaoChange = (
    hasNomeOperacao: boolean,
    nomeOperacao?: string,
  ): void => {
    this.setState({ nomeOperacao, hasNomeOperacao });
    if (hasNomeOperacao === false) {
      this.addNextPage(Page.TIPO_DETECCAO);
    }
  };

  handlePreviousClick = (): void => {
    if (this.transitionTimerID) {
      window.clearTimeout(this.transitionTimerID);
    }
    this.sliderRef.current?.slickPrev();
  };

  handleNextClick = (): void => {
    const { nomeOperacao } = this.state;
    if (nomeOperacao) {
      this.addNextPage(Page.TIPO_DETECCAO);
    }
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
    const { nivelAcionamento, nomeOperacao, hasNomeOperacao } = this.state;
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
            hasNomeOperacao={hasNomeOperacao}
            nomeOperacao={nomeOperacao}
          />
        );
      }
      case Page.TIPO_DETECCAO: {
        return <TipoDeteccaoPicker key="tipoDeteccaoCard" />;
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

  handlePageChange = (index: number): void => {
    const { pages } = this.state;
    const currentPage = pages[index];
    this.setState({ currentPage });
  };

  isNextEnabled = (): boolean => {
    const { currentPage, pages, nomeOperacao, hasNomeOperacao } = this.state;
    const lastPage = pages[pages.length - 1];
    switch (currentPage) {
      case Page.NOME_OPERACAO: {
        if (hasNomeOperacao === false) {
          return true;
        }
        return !!hasNomeOperacao && !!nomeOperacao;
      }
      default: {
        return currentPage !== lastPage;
      }
    }
  };

  render(): JSX.Element {
    const { pages, currentPage } = this.state;
    const firstPage = pages[0];

    return (
      <Container>
        <Content>
          <Slider
            ref={this.sliderRef}
            dots
            infinite={false}
            speed={500}
            adaptiveHeight
            // swipeToSlide={false}
            // draggable={false}
            // swipe={false}
            slidesToShow={1}
            slidesToScroll={1}
            afterChange={this.handlePageChange}
            // adaptiveHeight
          >
            {pages.map(this.renderCard)}
          </Slider>
          <ButtonBar>
            <Button
              label="Anterior"
              onClick={this.handlePreviousClick}
              disabled={currentPage === firstPage}
            />
            <Button
              label="Próximo"
              onClick={this.handleNextClick}
              disabled={!this.isNextEnabled()}
            />
          </ButtonBar>
        </Content>
      </Container>
    );
  }
}

export default Form;
