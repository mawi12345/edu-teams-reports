import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';
import { AppState } from './types';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.app || initialState;

export const selectFileContent = createSelector(
  [selectDomain],
  (appState: AppState): AppState => appState,
);
