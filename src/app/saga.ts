import { call, select, takeLatest } from 'redux-saga/effects';
import { history } from 'utils/history';
import { selectAppInfo, AppInfo } from './selectors';
import { actions } from './slice';

export function* routeOnSetRows() {
  const info: AppInfo = yield select(selectAppInfo);
  if (info.unsupportedFile) {
    console.log('error');
    yield call(history.push as any, '/error');
  }
  if (info.hasData) {
    yield call(history.push as any, '/report');
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* appSaga() {
  yield takeLatest(actions.setRows.type, routeOnSetRows);
}
