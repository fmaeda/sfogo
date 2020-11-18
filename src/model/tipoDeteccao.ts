export enum TipoDeteccao {
  COMUNICACAO_PROPRIETARIO = 'COMUNICACAO_PROPRIETARIO',
  COMUNICACAO_INDIGENA = 'COMUNICACAO_INDIGENA',
  COMUNICACAO_MORADOR = 'COMUNICACAO_MORADOR',
  MONITORAMENTO_SATELITE = 'MONITORAMENTO_SATELITE',
  PONTOS_OBSERVACAO = 'PONTOS_OBSERVACAO',
  RONDA = 'RONDA',
  DURANTE_COMBATE = 'DURANTE_COMBATE',
  TELEFONE = 'TELEFONE',
  OUTROS = 'OUTROS',
}

export const tipoDeteccaoLabels: {
  [key in TipoDeteccao]: string;
} = {
  [TipoDeteccao.COMUNICACAO_PROPRIETARIO]: 'Proprietário',
  [TipoDeteccao.COMUNICACAO_INDIGENA]: 'Indígena',
  [TipoDeteccao.COMUNICACAO_MORADOR]: 'Morador Entorno',
  [TipoDeteccao.MONITORAMENTO_SATELITE]: 'Satélite',
  [TipoDeteccao.PONTOS_OBSERVACAO]: 'Pontos de Observação',
  [TipoDeteccao.RONDA]: 'Ronda',
  [TipoDeteccao.DURANTE_COMBATE]: 'Durante Combate',
  [TipoDeteccao.TELEFONE]: 'Telefone',
  [TipoDeteccao.OUTROS]: 'Outros',
};
