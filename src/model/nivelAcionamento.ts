import { FaLandmark, FaCity } from 'react-icons/fa';
import { GiBrazil } from 'react-icons/gi';
import React from 'react';

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

export const nivelAcionamentoIcons: {
  [key in NivelAcionamento]: React.ComponentType;
} = {
  [NivelAcionamento.MUNICIPAL]: FaCity,
  [NivelAcionamento.ESTADUAL]: FaLandmark,
  [NivelAcionamento.FEDERAL]: GiBrazil,
};
