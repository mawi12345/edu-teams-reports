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
import { ContainerState, Row, Todo, Student } from './types';

// The initial state of the GithubRepoForm container
export const initialState: ContainerState = {
  todos: [],
  students: [],
  sum: 0,
  unsupportedFile: false,
};

const saveNumber = (a: number) => {
  if (a && !isNaN(a)) {
    return a;
  }
  return 0;
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRows(state, action: PayloadAction<Row[]>) {
      // This *fat* action transforms the CSV since we do not want
      // to store the original csv
      const headerRow = Object.values(action.payload[0]) as string[];

      // Check if it is a MS Teams CSV export
      if (
        headerRow[0] !== 'First Name' ||
        headerRow[1] !== 'Last Name' ||
        headerRow[2] !== 'Email Address'
      ) {
        state.todos = [];
        state.students = [];
        state.sum = 0;
        state.unsupportedFile = true;
        return;
      }
      state.unsupportedFile = false;

      const count = Math.round((headerRow.length - 3) / 3);
      let sum = 0;

      const todos: Todo[] = [];
      for (let x = 0; x < count; x += 1) {
        todos.push({
          name: headerRow[3 + x * 3],
          max: 0,
        });
      }

      const students: Student[] = [];
      for (let i = 1; i < action.payload.length; i += 1) {
        const studentRow = Object.values(action.payload[i]) as string[];

        if (i === 1) {
          for (let x = 0; x < count; x += 1) {
            const max = parseInt(studentRow[4 + x * 3], 10);
            if (max && !isNaN(max)) {
              todos[x].max = max;
              sum += max;
            }
          }
        }

        const results: number[] = [];
        for (let x = 0; x < count; x += 1) {
          results.push(parseInt(studentRow[3 + x * 3], 10));
        }

        const studentSum: number = results.reduce(
          (a: number, b: number) => saveNumber(a) + saveNumber(b),
          0,
        );

        students.push({
          first: studentRow[0],
          last: studentRow[1],
          sum: studentSum,
          sumPercent: Math.round((studentSum * 100) / sum),
          results,
        });
      }

      students.sort((a, b) => {
        const nameA = a.last.toUpperCase();
        const nameB = b.last.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      state.todos = todos;
      state.students = students;
      state.sum = sum;
    },
  },
});

export const { actions, reducer, name: sliceKey } = appSlice;
