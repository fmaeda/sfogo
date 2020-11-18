import React from 'react';
import { TipoDeteccao } from 'model/tipoDeteccao';

import {
  FaUserTie,
  FaFeatherAlt,
  FaSatellite,
  FaTruckPickup,
  FaFireExtinguisher,
  FaPhone,
} from 'react-icons/fa';
import { IoIosMan } from 'react-icons/io';
import { GiWatchtower } from 'react-icons/gi';
import { MdMoreHoriz } from 'react-icons/md';

const mappings: { [key in TipoDeteccao]: React.ComponentType } = {
  [TipoDeteccao.COMUNICACAO_PROPRIETARIO]: FaUserTie,
  [TipoDeteccao.COMUNICACAO_INDIGENA]: FaFeatherAlt,
  [TipoDeteccao.COMUNICACAO_MORADOR]: IoIosMan,
  [TipoDeteccao.MONITORAMENTO_SATELITE]: FaSatellite,
  [TipoDeteccao.PONTOS_OBSERVACAO]: GiWatchtower,
  [TipoDeteccao.RONDA]: FaTruckPickup,
  [TipoDeteccao.DURANTE_COMBATE]: FaFireExtinguisher,
  [TipoDeteccao.TELEFONE]: FaPhone,
  [TipoDeteccao.OUTROS]: MdMoreHoriz,
};

export default mappings;
