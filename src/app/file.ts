import csv from 'csv-parser';
import { Row, FileContent } from './types';

export function csvBlobToTable(file: Blob): Promise<Row[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onabort = () => reject(new Error('file reading was aborted'));
    reader.onerror = () => reject(new Error('file reading has failed'));
    reader.onload = () => {
      const parser = csv({ separator: ',', headers: false });
      const results: object[] = [];
      parser.on('data', data => results.push(data));
      parser.on('end', () => {
        resolve(results as Row[]);
      });
      parser.write(reader.result);
      parser.end();
    };
    reader.readAsText(file);
  });
}

export function isFileSupported(rows: Row[]): boolean {
  const headerRow = rows[0];
  return (
    headerRow[0] === 'First Name' &&
    headerRow[1] === 'Last Name' &&
    headerRow[2] === 'Email Address'
  );
}

const saveNumber = (a: number) => {
  if (a && !isNaN(a)) {
    return a;
  }
  return 0;
};

export function parseFile(rows: Row[]): FileContent {
  const content: FileContent = {
    students: [],
    todos: [],
    sum: 0,
  };
  const headerRow = Object.values(rows[0]) as string[];
  const count = Math.round((headerRow.length - 3) / 3);

  for (let x = 0; x < count; x += 1) {
    content.todos.push({
      name: headerRow[3 + x * 3],
      max: 0,
    });
  }

  for (let i = 1; i < rows.length; i += 1) {
    const studentRow = Object.values(rows[i]) as string[];

    if (i === 1) {
      for (let x = 0; x < count; x += 1) {
        const max = parseInt(studentRow[4 + x * 3], 10);
        if (max && !isNaN(max)) {
          content.todos[x].max = max;
          content.sum += max;
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

    content.students.push({
      first: studentRow[0],
      last: studentRow[1],
      sum: studentSum,
      sumPercent: Math.round((studentSum * 100) / content.sum),
      results,
    });
  }

  content.students.sort((a, b) => {
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

  return content;
}
