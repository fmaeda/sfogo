import { FaDrawPolygon } from 'react-icons/fa';
import { GeometryType } from 'model/geometryType';
import { MdMyLocation } from 'react-icons/md';

const mappings: {
  [key in GeometryType]: React.ComponentType;
} = {
  [GeometryType.POINT]: MdMyLocation,
  [GeometryType.POLYGON]: FaDrawPolygon,
};

export default mappings;
