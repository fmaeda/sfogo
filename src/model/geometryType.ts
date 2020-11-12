export enum GeometryType {
  POINT = 'POINT',
  POLYGON = 'POLYGON',
}

export const geometryTypeLabels: {
  [key in GeometryType]: string;
} = {
  [GeometryType.POINT]: 'Ponto',
  [GeometryType.POLYGON]: 'Polígono',
};
