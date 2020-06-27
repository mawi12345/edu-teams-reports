/*
 * App Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, FileContent } from './types';

// The initial state of the GithubRepoForm container
export const initialState: ContainerState = {
  todos: [],
  students: [],
  sum: 0,
  loading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    readBlob(state, action: PayloadAction<Blob>) {
      state.loading = true;
    },
    fileParsedSuccess(state, action: PayloadAction<FileContent>) {
      state.loading = false;
      state.students = action.payload.students;
      state.todos = action.payload.todos;
      state.sum = action.payload.sum;
    },
    fileParsedError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.students = [];
      state.todos = [];
      state.sum = 0;
    },
  },
});

export const { actions, reducer, name: sliceKey } = appSlice;
