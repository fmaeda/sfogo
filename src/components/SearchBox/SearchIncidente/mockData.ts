import { v1 as uuid } from 'uuid';
import { Incidente } from 'model/incidente';
import { TipoDeteccao } from 'model/tipoDeteccao';
import { NivelAcionamento } from 'model/nivelAcionamento';
import { UF } from 'model/uf';

const data: Incidente[] = [
  {
    id: uuid(),
    data: new Date().toISOString(),
    tipoDeteccao: TipoDeteccao.MONITORAMENTO_SATELITE,
    nivelAcionamento: NivelAcionamento.MUNICIPAL,
    nomeOperacao: 'Operação Capivara',
    localidade: {
      uf: UF.PI,
      municipio: 'Coronel José Dias',
      descricao: 'Parque Nacional da Serra da Capivara',
    },
  },
  {
    id: uuid(),
    data: new Date().toISOString(),
    tipoDeteccao: TipoDeteccao.COMUNICACAO_PROPRIETARIO,
    nivelAcionamento: NivelAcionamento.MUNICIPAL,
    nomeOperacao: '',
    localidade: {
      uf: UF.PR,
      municipio: 'Maringá',
      descricao: 'Catedral',
    },
  },
  {
    id: uuid(),
    data: new Date().toISOString(),
    tipoDeteccao: TipoDeteccao.TELEFONE,
    nivelAcionamento: NivelAcionamento.ESTADUAL,
    nomeOperacao: 'Operação Tucano',
    localidade: {
      uf: UF.DF,
      municipio: 'Brasília',
      descricao: 'UnB - Universidade de Brasília',
    },
  },
  {
    id: uuid(),
    data: new Date().toISOString(),
    tipoDeteccao: TipoDeteccao.PONTOS_OBSERVACAO,
    nivelAcionamento: NivelAcionamento.FEDERAL,
    nomeOperacao: 'Operação Tubarão',
  },
];

export default data;
