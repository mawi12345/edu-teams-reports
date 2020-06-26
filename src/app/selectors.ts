import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.app || initialState;

export interface AppInfo {
  unsupportedFile: boolean;
  hasData: boolean;
}

export const selectAppInfo = createSelector([selectDomain], appState => ({
  unsupportedFile: appState.unsupportedFile,
  hasData: appState.students.length > 0 && appState.todos.length > 0,
}));
