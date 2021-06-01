import { config as defaultConfig } from './wdio.conf';
import * as _ from 'lodash';

const overrides = {
  testData: [],
  specs: [
    './src/test/suites/e2e/e2e.spec.ts'
  ]
};

export const config = _.defaultsDeep(overrides, defaultConfig);
