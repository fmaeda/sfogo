import { Imagem } from 'model/imagem';
import { v1 as uuid } from 'uuid';

import queimada1 from 'resources/img/queimadas/queimada_1.jpg';
import queimada2 from 'resources/img/queimadas/queimada_2.jpg';

const data: Imagem[] = [
  {
    id: uuid(),
    image: queimada1,
    description: 'Imagem teste 1',
    latitude: 0,
    longitude: 0,
    data: new Date().toISOString(),
  },
  {
    id: uuid(),
    image: queimada2,
    description: 'Imagem teste 2',
    latitude: 0,
    longitude: 0,
    data: new Date().toISOString(),
  },
];

export default data;
