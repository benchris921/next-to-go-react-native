/* eslint no-param-reassign: 0 */
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { Race } from '@src/models/Race';

const name = 'races';

type RacesState = {
  races: Race[];
};

const initialState: RacesState = { races: [] };

export const getRaces = createAsyncThunk(
  `${name}/races`,
  async () => {
    return await fetch("https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10").then(res => res.json());
  },
);

export const removeRace = createAction<string>(`${name}/removeRace`);

const raceSortComparator = (race1: Race, race2: Race) => race1.advertised_start.seconds > race2.advertised_start.seconds ? 1 : -1;

export const racesSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRaces.fulfilled, (state, action) => {
        const raceSummaries = action.payload?.data?.race_summaries;
        const raceIds = Object.keys(raceSummaries);
        const races = raceIds.map((raceId: string) => raceSummaries[raceId]) || [];
        return {
          ...state,
          races: races.sort(raceSortComparator),
        }
      })
      .addCase(removeRace, (state, action) => ({
        ...state,
        races: state.races.filter(race => race.race_id !== action.payload)
      }))
  },
});
