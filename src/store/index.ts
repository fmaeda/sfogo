import { StateType } from 'typesafe-actions';

// import { productReducer } from 'store/product';
// import { userReducer } from 'store/user/reducers';
import { versionReducer } from 'store/version';
import { notificationReducer } from 'store/notification';
import { menuReducer } from './menu';
import { incidenteReducer } from './incidente';

const allReducers = {
  // product: productReducer,
  // user: userReducer,
  version: versionReducer,
  notification: notificationReducer,
  menu: menuReducer,
  incidente: incidenteReducer,
};

export type RootState = StateType<typeof allReducers>;

export default allReducers;
