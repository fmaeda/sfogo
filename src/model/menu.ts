export enum Menu {
  INCIDENTE = 'INCIDENTE',
  COMBATE = 'COMBATE',
  CONFIGURACOES = 'CONFIGURACOES',
}

export const menuLabels: { [key in Menu]: string } = {
  [Menu.INCIDENTE]: 'Registro de Incidentes',
  [Menu.COMBATE]: 'Registro de Combate',
  [Menu.CONFIGURACOES]: 'Configurações',
};

export const menuRoutes: { [key in Menu]: string } = {
  [Menu.INCIDENTE]: '/incidentes',
  [Menu.COMBATE]: '/combate',
  [Menu.CONFIGURACOES]: '/configuracoes',
};
