import { NivelAcionamento } from 'model/nivelAcionamento';
import { TipoDeteccao } from 'model/tipoDeteccao';
import { Localidade } from './localidade';

export type Incidente = {
  id: string;
  data: string;
  nivelAcionamento: NivelAcionamento;
  nomeOperacao: string;
  tipoDeteccao: TipoDeteccao;
  localidade?: Localidade;
};
