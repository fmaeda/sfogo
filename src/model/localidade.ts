import { UF } from 'model/uf';

import { GeoJSON } from 'geojson';

export type Localidade = {
  uf: UF;
  municipio: string;
  descricao: string;
  geojson?: GeoJSON;
};
