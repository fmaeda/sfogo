import produce from 'immer';
import { Reducer } from 'redux';

import { Action } from './actions';
import { ActionTypes, State } from './types';

const DEFAULT_STATE: State = {
  login: '',
  name: '',
};

const reducer: Reducer<State, Action> = (state = DEFAULT_STATE, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.SET_LOGIN: {
        draft.login = action.payload.login;
        break;
      }
      case ActionTypes.SET_NAME: {
        draft.name = action.payload.name;
        break;
      }
    }
  });

export { reducer as userReducer };
