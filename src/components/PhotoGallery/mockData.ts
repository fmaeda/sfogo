import { Imagem } from 'model/imagem';
import { v1 as uuid } from 'uuid';

import queimada1 from 'resources/img/queimadas/queimada_1.jpg';
import queimada2 from 'resources/img/queimadas/queimada_2.jpg';
import queimada3 from 'resources/img/queimadas/queimada_3.jpg';
import queimada4 from 'resources/img/queimadas/queimada_4.jpg';

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
  {
    id: uuid(),
    image: queimada3,
    description: 'Imagem teste 3',
    latitude: 0,
    longitude: 0,
    data: new Date().toISOString(),
  },
  {
    id: uuid(),
    image: queimada4,
    description: 'Imagem teste 4',
    latitude: 0,
    longitude: 0,
    data: new Date().toISOString(),
  },
];

export default data;
