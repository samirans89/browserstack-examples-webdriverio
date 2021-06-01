import { config as defaultConfig } from './wdio.conf';
import * as _ from 'lodash';

const overrides = {
  specs: [
    './src/test/suites/e2e/e2e.spec.ts'
  ],
  services: ['docker'],
  dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    startDelay: 2000,
    options: {
      p: ['4444:4444'],
      shmSize: '2g'
    }
  },
  hostname: 'localhost',
  port: 4444,
  path: '/wd/hub'
};

export const config = _.defaultsDeep(overrides, defaultConfig);
