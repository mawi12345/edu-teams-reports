/**
 *
 * Asynchronously loads the component for ReportPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ReportPage = lazyLoad(
  () => import('./index'),
  module => module.ReportPage,
);
