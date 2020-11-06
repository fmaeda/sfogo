export enum NivelAcionamento {
  MUNICIPAL = 'MUNICIPAL',
  ESTADUAL = 'ESTADUAL',
  FEDERAL = 'FEDERAL',
}

export const nivelAcionamentoLabels: {
  [key in NivelAcionamento]: string;
} = {
  [NivelAcionamento.MUNICIPAL]: 'Municipal',
  [NivelAcionamento.ESTADUAL]: 'Estadual',
  [NivelAcionamento.FEDERAL]: 'Federal',
};
