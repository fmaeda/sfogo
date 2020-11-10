import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from 'immer-reducer';

type State = {
  mainMenuOpen: boolean;
};

const DEFAULT_STATE: State = {
  mainMenuOpen: false,
};

class MenuReducer extends ImmerReducer<State> {
  setMenuOpen(open: boolean) {
    this.draftState.mainMenuOpen = open;
  }

  toggleMenu() {
    this.draftState.mainMenuOpen = !this.draftState.mainMenuOpen;
  }
}

export const menuActions = createActionCreators(MenuReducer);
export const menuReducer = createReducerFunction(MenuReducer, DEFAULT_STATE);
