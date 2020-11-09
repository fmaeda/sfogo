import { StateType } from 'typesafe-actions';

// import { productReducer } from 'store/product';
// import { userReducer } from 'store/user/reducers';
import { versionReducer } from 'store/version';

const allReducers = {
  // product: productReducer,
  // user: userReducer,
  version: versionReducer,
};

export type RootState = StateType<typeof allReducers>;

export default allReducers;
