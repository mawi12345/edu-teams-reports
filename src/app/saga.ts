import { all, put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions } from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  csvBlobToTable,
  isFileSupported,
  parseFile,
  sortContent,
} from './file';

export function* readBlob(action: PayloadAction<Blob>) {
  const file = action.payload;
  const rows = yield call(csvBlobToTable, file);
  if (!isFileSupported(rows)) {
    yield put(actions.fileParsedError('File is not supported'));
  } else {
    try {
      const res = sortContent(parseFile(rows));
      yield put(actions.fileParsedSuccess(res));
    } catch (e) {
      yield put(actions.fileParsedError(e.message));
    }
  }
}

export function* readBlobSaga() {
  yield takeLatest(actions.readBlob.type, readBlob);
}

export function* routeSuccess() {
  yield put(push('/report'));
}

export function* routeSuccessSaga() {
  yield takeLatest(actions.fileParsedSuccess.type, routeSuccess);
}

export function* routeError() {
  yield put(push('/error'));
}

export function* routeErrorSaga() {
  yield takeLatest(actions.fileParsedError.type, routeError);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* appSaga() {
  yield all([readBlobSaga(), routeSuccessSaga(), routeErrorSaga()]);
}
