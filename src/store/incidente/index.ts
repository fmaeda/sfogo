import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from 'immer-reducer';
import { v1 as uuid } from 'uuid';
import { Incidente } from 'model/incidente';

type State = {
  selectedIncidente: Partial<Incidente>;
  incidentesList: Incidente[];
};

const BLANK_INCIDENTE: Partial<Incidente> = {
  id: uuid(),
};

const DEFAULT_STATE: State = {
  selectedIncidente: BLANK_INCIDENTE,
  incidentesList: [],
};

class IncidenteReducer extends ImmerReducer<State> {
  setIncidenteList(incidentes: Incidente[]) {
    this.draftState.incidentesList = incidentes;
  }

  setSelectedIncidente(incidente: Incidente) {
    this.draftState.selectedIncidente = incidente;
  }

  newIncidente() {
    this.draftState.selectedIncidente = {
      ...BLANK_INCIDENTE,
      id: uuid(),
    };
  }
}

export const incidenteActions = createActionCreators(IncidenteReducer);
export const incidenteReducer = createReducerFunction(
  IncidenteReducer,
  DEFAULT_STATE,
);
