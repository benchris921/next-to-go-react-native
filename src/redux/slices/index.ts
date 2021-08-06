import { racesSlice, getRaces, removeRace } from './races';

export const reducers = {
  raceReducer: racesSlice.reducer,
};

export const actions = {
  getRaces,
  removeRace
};
