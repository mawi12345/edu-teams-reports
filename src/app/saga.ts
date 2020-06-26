import { put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { selectAppInfo, AppInfo } from './selectors';
import { actions } from './slice';

export function* routeOnSetRows() {
  const info: AppInfo = yield select(selectAppInfo);
  if (info.unsupportedFile) {
    console.log('error');
    yield put(push('/error'));
  }
  if (info.hasData) {
    yield put(push('/report'));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* appSaga() {
  yield takeLatest(actions.setRows.type, routeOnSetRows);
}
