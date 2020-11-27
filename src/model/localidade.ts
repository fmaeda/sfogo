import { UF } from 'model/uf';

import { GeoJSON } from 'geojson';

export type Localidade = {
  uf: UF;
  municipio: string;
  descricao: string;
  geojson?: GeoJSON;
};

export type LocalidadeResult = {
  display_name: string;
  address: {
    country: string;
    city?: string;
    postcode?: string;
    region?: string;
    state?: string;
  };
  boundingbox: [number, number, number, number];
  lat: number;
  lon: number;
  place_id: number;
};
