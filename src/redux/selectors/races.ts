import { RootState } from '../store';

export const selectRaces = (state: RootState) => state.raceReducer.races;