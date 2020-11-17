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
  [TipoDeteccao.COMUNICACAO_PROPRIETARIO]:
    'Comunicação por Assentado/Proprietário',
  [TipoDeteccao.COMUNICACAO_INDIGENA]: 'Comunicação por Indígena',
  [TipoDeteccao.COMUNICACAO_MORADOR]: 'Comunicação por Morador do Entorno',
  [TipoDeteccao.MONITORAMENTO_SATELITE]: 'Monitoramento por Satélite',
  [TipoDeteccao.PONTOS_OBSERVACAO]: 'Pontos de Observação',
  [TipoDeteccao.RONDA]: 'Ronda',
  [TipoDeteccao.DURANTE_COMBATE]: 'Verificado Durante Combate',
  [TipoDeteccao.TELEFONE]: 'Via Telefone',
  [TipoDeteccao.OUTROS]: 'Outros',
};
