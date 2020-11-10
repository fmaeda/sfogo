import { Menu } from 'model/menu';

import { MdAddAlert } from 'react-icons/md';
import { FaFireExtinguisher, FaCog } from 'react-icons/fa';

const mappings: {
  [key in Menu]: React.ComponentType;
} = {
  [Menu.INCIDENTE]: MdAddAlert,
  [Menu.COMBATE]: FaFireExtinguisher,
  [Menu.CONFIGURACOES]: FaCog,
};

export default mappings;
