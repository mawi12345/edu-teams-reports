/* --- STATE --- */

export type Row = { [index: number]: string };

export interface Todo {
  name: string;
  max: number;
}

export interface Student {
  first: string;
  last: string;
  sum: number;
  sumPercent: number;
  results: number[];
}

export interface AppState {
  todos: Todo[];
  students: Student[];
  sum: number;
  unsupportedFile: boolean;
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = AppState;
