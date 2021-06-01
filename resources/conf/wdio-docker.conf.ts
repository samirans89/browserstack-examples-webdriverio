import { config as defaultConfig } from './wdio.conf';
import * as _ from 'lodash';

const overrides = {
  specs: [
    './src/test/suites/e2e/e2e.spec.ts'
  ],
  hostname: 'localhost',
  port: 4444,
  path: '/wd/hub'
};

export const config = _.defaultsDeep(overrides, defaultConfig);
